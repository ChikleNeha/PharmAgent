import asyncio
import pandas as pd
from typing import List, TypedDict, Annotated,NotRequired
from pydantic import BaseModel, Field
from langchain_ollama import ChatOllama, OllamaEmbeddings
from langchain_community.document_loaders import DataFrameLoader
from langchain_chroma import Chroma 
from langchain_core.prompts import ChatPromptTemplate
from langgraph.graph import START, END, StateGraph
from dotenv import load_dotenv

load_dotenv()

# --- 1. STRUCTURED SCHEMA ---
class ProductSelection(BaseModel):
    pzn_list: List[int] = Field(description="The unique PZN numbers of the medications found.")
    reasoning: str = Field(description="Brief explanation of why these were chosen.")

# --- 2. DATA INGESTION (Global setup) ---
excel_file = "data/eng-products-export.xlsx" 
df = pd.read_excel(excel_file)
df['search_text'] = df.apply(
    lambda x: f"Product: {x['product name']} | PZN: {x['pzn']} | Description: {x['descriptions']}", 
    axis=1
)

loader = DataFrameLoader(df, page_content_column="search_text")
embeddings = OllamaEmbeddings(model="mxbai-embed-large")
# Initialize vectorstore once
vectorstore = Chroma.from_documents(documents=loader.load(), embedding=embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# --- 3. AGENT STATE ---
class AgentState(TypedDict):
    question: str
    context: NotRequired[List[str]]
    selection: NotRequired[List[ProductSelection]]

# --- 4. WORKFLOW NODES ---
llm = ChatOllama(model="llama3.2", temperature=0)
structured_llm = llm.with_structured_output(ProductSelection)

async def retrieve_inventory(state: AgentState):
    # Safe access to question
    query = state.get("question", "")
    hits = await retriever.ainvoke(query)
    return {"context": [h.page_content for h in hits]}

async def generate_structured_response(state: AgentState):
    prompt = ChatPromptTemplate.from_template("""
    You are a professional Pharmacist.
    Based on the inventory context, extract the PZN numbers for the most relevant products.
    
    Inventory:
    {context}
    
    User Query: {question}
    """)
    
    chain = prompt | structured_llm
    result = await chain.ainvoke({
        "context": "\n".join(state.get("context", [])), 
        "question": state.get("question", "")
    })
    return {"selection": result}

# --- 5. GRAPH COMPILATION ---
builder = StateGraph(AgentState)
builder.add_node("retrieve", retrieve_inventory)
builder.add_node("generate", generate_structured_response)
builder.add_edge(START, "retrieve")
builder.add_edge("retrieve", "generate")
builder.add_edge("generate", END)
pharmacist_agent = builder.compile()

# --- 6. EXPORTABLE FUNCTION ---
async def run_pharmacist_search(query: str):
    """
    This is the function you call from main.py.
    It takes a dynamic query and returns the AI's selection.
    """
    print(f"Agent Processing Query: {query}")
    result = await pharmacist_agent.ainvoke({"question": query})
    return result

# For local testing
if __name__ == "__main__":
    test_query = "i want skin care items"
    res = asyncio.run(run_pharmacist_search(test_query))
    print(f"Reasoning: {res['selection'].reasoning}")
    print(f"PZNs: {res['selection'].pzn_list}")