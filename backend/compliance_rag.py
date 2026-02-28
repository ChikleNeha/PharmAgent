import asyncio
import pandas as pd
from typing import List, TypedDict, Literal
from langchain_ollama import ChatOllama, OllamaEmbeddings
from langchain_chroma import Chroma
from langchain_community.document_loaders import DataFrameLoader
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langgraph.graph import START, END, StateGraph
from dotenv import load_dotenv

load_dotenv()

# --- 1. RAG SETUP (Using your Excel) ---
# We use the Excel data to provide context for both the Pharmacist and the Compliance check
df = pd.read_excel("data/eng-products-export.xlsx")
df['search_text'] = df.apply(lambda x: f"Product: {x['product name']} | Price: {x['price rec']} | PZN: {x['pzn']} | Description: {x['descriptions']}", axis=1)
loader = DataFrameLoader(df, page_content_column="search_text")
embeddings = OllamaEmbeddings(model="mxbai-embed-large")
vectorstore = Chroma.from_documents(documents=loader.load(), embedding=embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

# --- 2. STATE DEFINITION ---
class ComplianceState(TypedDict):
    question: str
    context: List[str]
    answer: str
    is_compliant: bool
    feedback: str
    iteration_count: int

llm = ChatOllama(model="llama3.2", temperature=0)

# --- 3. NODES ---

async def retrieve_node(state: ComplianceState):
    """Retrieve products from Excel."""
    hits = await retriever.ainvoke(state["question"])
    return {"context": [h.page_content for h in hits], "iteration_count": state.get("iteration_count", 0) + 1}

async def pharmacist_node(state: ComplianceState):
    """Generates a response. If feedback exists, it tries to fix it."""
    prompt = ChatPromptTemplate.from_template("""
    You are a Pharmacist. Answer based ONLY on this data: {context}
    User Query: {question}
    
    PREVIOUS COMPLIANCE FEEDBACK: {feedback}
    (If feedback exists, you MUST correct your previous mistakes).
    """)
    chain = prompt | llm | StrOutputParser()
    answer = await chain.ainvoke({
        "context": state["context"], 
        "question": state["question"],
        "feedback": state.get("feedback", "No feedback yet.")
    })
    return {"answer": answer}

async def compliance_node(state: ComplianceState):
    """Acts as the safety gate."""
    check_prompt = ChatPromptTemplate.from_template("""
    You are a Compliance Officer. Review this pharmacist's response:
    "{answer}"
    
    CRITERIA:
    1. Must include the exact Price and PZN from the context.
    2. Must include the disclaimer: "Please consult a physician before use."
    
    If it passes, say 'COMPLIANT'. 
    If it fails, explain exactly why so the pharmacist can fix it.
    """)
    check_chain = check_prompt | llm | StrOutputParser()
    result = await check_chain.ainvoke({"answer": state["answer"]})
    
    is_compliant = "COMPLIANT" in result.upper()
    return {"is_compliant": is_compliant, "feedback": result}

# --- 4. CONDITIONAL ROUTING ---

def decide_next_step(state: ComplianceState) -> Literal["rewrite", "finish"]:
    # Loop back if not compliant, but stop after 3 tries to prevent infinite loops
    if not state["is_compliant"] and state["iteration_count"] < 3:
        print(f"\n[Compliance] REJECTED. Feedback: {state['feedback']}")
        return "rewrite"
    return "finish"

# --- 5. GRAPH CONSTRUCTION ---
workflow = StateGraph(ComplianceState)

workflow.add_node("retrieve", retrieve_node)
workflow.add_node("pharmacist", pharmacist_node)
workflow.add_node("compliance", compliance_node)

workflow.set_entry_point("retrieve")
workflow.add_edge("retrieve", "pharmacist")
workflow.add_edge("pharmacist", "compliance")

workflow.add_conditional_edges(
    "compliance",
    decide_next_step,
    {
        "rewrite": "pharmacist", # Loops back to the generator
        "finish": END
    }
)

app = workflow.compile()

# --- 6. EXECUTION WITH TOKEN STREAMING ---
async def run_agent():
    query = "I need details on Panthenol Spray."
    async for event in app.astream_events({"question": query}, version="v1"):
        if event["event"] == "on_chat_model_stream":
            # This will show tokens from BOTH the pharmacist and the compliance officer
            # In a real app, you would filter to only show the pharmacist tokens
            content = event["data"]["chunk"].content
            if content:
                print(content, end="", flush=True)

if __name__ == "__main__":
    asyncio.run(run_agent())