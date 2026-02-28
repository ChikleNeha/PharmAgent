import asyncio
import pandas as pd
from typing import List, TypedDict, Annotated
from pydantic import BaseModel, Field
from langchain_ollama import ChatOllama, OllamaEmbeddings
from langchain_community.document_loaders import DataFrameLoader
from langchain_chroma import Chroma 
from langchain_core.prompts import ChatPromptTemplate
from langgraph.graph import START, StateGraph
from dotenv import load_dotenv

load_dotenv()

# --- 1. STRUCTURED SCHEMA ---
class ProductSelection(BaseModel):
    """List of product PZNs recommended to the user."""
    pzn_list: List[int] = Field(description="The unique PZN numbers of the medications found in the context.")
    reasoning: str = Field(description="Brief explanation of why these were chosen.")

# --- 2. DATA INGESTION ---
excel_file = "data/eng-products-export.xlsx" 
df = pd.read_excel(excel_file)
df['search_text'] = df.apply(
    lambda x: f"Product: {x['product name']} | PZN: {x['pzn']} | Description: {x['descriptions']}", 
    axis=1
)

loader = DataFrameLoader(df, page_content_column="search_text")
embeddings = OllamaEmbeddings(model="mxbai-embed-large")
vectorstore = Chroma.from_documents(documents=loader.load(), embedding=embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# --- 3. AGENT STATE ---
class AgentState(TypedDict):
    question: str
    context: List[str]
    # This will hold our structured Pydantic object
    selection: ProductSelection 

# --- 4. WORKFLOW NODES ---
# Note: Ensure your local Ollama has llama3.2 or similar that supports tools/structured output
llm = ChatOllama(model="llama3.2", temperature=0)
structured_llm = llm.with_structured_output(ProductSelection)

async def retrieve_inventory(state: AgentState):
    hits = await retriever.ainvoke(state["question"])
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
    result = await chain.ainvoke({"context": "\n".join(state["context"]), "question": state["question"]})
    return {"selection": result}

# --- 5. GRAPH ---
builder = StateGraph(AgentState)
builder.add_node("retrieve", retrieve_inventory)
builder.add_node("generate", generate_structured_response)
builder.add_edge(START, "retrieve")
builder.add_edge("retrieve", "generate")
pharmacist_agent = builder.compile()

# --- 6. EXECUTION ---
async def start_chat():
    query = "i want skin care items"
    print(f"User: {query}")
    
    # We use invoke instead of astream_events because structured output 
    # usually needs the full buffer to parse JSON correctly.
    result = await pharmacist_agent.ainvoke({"question": query})
    
    selection = result["selection"]
    print(selection)
    print(f"\nPharmacist Reasoning: {selection.reasoning}")
    print(f"Found PZNs: {selection.pzn_list}")
    
    # NEXT STEP LOGIC:
    if selection.pzn_list:
        chosen_pzn = selection.pzn_list[0] 
        print(f"\nProceeding to compliance check for PZN: {chosen_pzn}...")
        # Here you would call your compliance2_rag.py logic using chosen_pzn

if __name__ == "__main__":
    asyncio.run(start_chat())