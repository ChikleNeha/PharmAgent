from fastapi import FastAPI, HTTPException, UploadFile, File,Body
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from sqlalchemy import create_engine, MetaData, Table, select
import json
import tempfile
import os
import easyocr
import re
import json
from typing import List, Dict
from pharmacist_agent import pharmacist_agent as app_graph
from pydantic import BaseModel
from typing import List, Optional
from langgraph.checkpoint.sqlite import SqliteSaver
import pandas as pd
import uvicorn
import asyncio
from contextlib import asynccontextmanager
from typing import AsyncGenerator, cast

from fastapi import FastAPI, Body
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.graph import MessagesState, StateGraph, START, END
from langgraph.checkpoint.sqlite.aio import AsyncSqliteSaver
from langchain_core.runnables import RunnableConfig

# Import your agents/logic from your modular files
from pharmacist_rag import pharmacist_agent  # Your Discovery RAG
from pharmacy_master import app as pharmacy_graph # Your Master Workflow
import pandas as pd
import uvicorn
import asyncio
from contextlib import asynccontextmanager
from typing import AsyncGenerator, cast
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
import easyocr
import numpy as np
from PIL import Image
import io
from thefuzz import process # For fuzzy matching
from ocr2 import reader, find_best_med_match # Your OCR logic and fuzzy matching
app = FastAPI(title="AI Pharmacy API", version="1.0.0")
import numpy as np
from PIL import Image
import io
from thefuzz import process
import easyocr
from fastapi import UploadFile, File


# Define allowed origins
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- SCHEMA ---
class UserQuery(BaseModel):
    question: str
    patient_id: Optional[str] = "CUST_001"

class OrderRequest(BaseModel):
    pzn: int
    patient_id: str
    daily_dosage: int = 1

# --- ENDPOINTS ---

@app.get("/")
def home():
    return {"message": "AI Pharmacy Agent API is Online"}

@app.post("/search")
async def search_medication(query: UserQuery):
    """
    Step 1: User asks a question, RAG returns relevant PZNs and descriptions.
    """
    try:
        # Running your RAG Discovery Agent
        result = await pharmacist_agent.ainvoke({"question": query.question})
        
        # Extract the structured selection we built earlier
        return {
            "pharmacist_answer": result.get("answer", ""),
            "recommendations": result.get("context", []),
            "structured_selection": result.get("selection") # Returns the PZN list
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- 2. FASTAPI ENDPOINTS ---


# Initialize the reader
reader = easyocr.Reader(['en']) 

@app.post("/scan-prescription")
async def scan_prescription(file: UploadFile = File(...)):
    # 1. Load the image
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    
    # 2. Convert to OCR text
    # This captures the raw strings exactly as they appear
    raw_results = reader.readtext(np.array(image), detail=0)
    full_text_blob = " ".join(raw_results)
    
    # 3. Perform Fuzzy Matching
    found_meds = []
    # We look at each word the OCR found
    for word in full_text_blob.split():
        if len(word) < 4: continue
        
        # Match against your Excel product list
        best_match, score = process.extractOne(word, ALL_PRODUCT_NAMES)
        
        if score > 80: # 80% is the 'sweet spot' for accuracy
            med_data = df[df['product name'] == best_match].iloc[0]
            found_meds.append({
                "original_word_in_image": word, # <--- This is what was actually read
                "matched_name": best_match,
                "pzn": int(med_data['pzn']),
                "accuracy_score": score
            })

    # Return everything for you to check
    return {
        "verification": {
            "total_raw_text_detected": full_text_blob,
            "detected_chunks": raw_results
        },
        "identified_medicines": found_meds
    }

# Setup Persistence (This saves the state so we can resume later)
memory = SqliteSaver.from_conn_string(":memory:")
# app_graph = pharmacy_graph.compile(checkpointer=memory, interrupt_before=["warehouse"])

@app.post("/process-order")
async def process_order(order: OrderRequest):
    # We provide a thread_id so we can find this specific order later
    config = {"configurable": {"thread_id": str(order.pzn)}} 
    
    initial_state = {"pzn": order.pzn, "patient_id": order.patient_id}
    
    # Start the graph
    result = await app_graph.ainvoke(initial_state, config)
    
    # Check if the graph paused for review
    snapshot = await app_graph.get_state(config)
    if snapshot.next:
        return {
            "status": "AWAITING_ADMIN",
            "message": "This medication requires admin approval.",
            "thread_id": order.pzn
        }
    
    return {"status": "SUCCESS", "details": result}

@app.post("/admin/approve")
async def admin_approve(thread_id: str = Body(..., embed=True)):
    """The 'Resume' Button on the Frontend calls this."""
    config = {"configurable": {"thread_id": thread_id}}
    
    # Manually update the state to 'approved'
    await app_graph.update_state(config, {"compliance_status": "approved"})
    
    # Resume the graph (it will now run the warehouse and predictive nodes)
    final_result = await app_graph.ainvoke(None, config)
    
    return {"status": "ORDER_COMPLETED", "prediction": final_result.get("prediction_msg")}

# Database setup (your existing code)
DB_FILE = "./database/d1.db"
DATABASE_URL = f"sqlite:///{DB_FILE}"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
metadata = MetaData()
metadata.reflect(bind=engine)

users_table = metadata.tables['users']
orders_table = metadata.tables['orders']
inventory_table = metadata.tables['inventory']

# Serve frontend
app.mount("/static", StaticFiles(directory="static"), name="static")



# --- 1. DATA & MODEL SETUP ---
df = pd.read_excel("data/eng-products-export.xlsx")
# Temperature 0.4 makes the "Medicine" persona more natural and less robotic
llm = ChatOllama(model="llama3.2", temperature=0.4)

# --- 2. THE FRIENDLY MEDICINE NODE ---
async def call_medicine_persona(state: MessagesState, config: RunnableConfig):
    pzn = config["configurable"].get("pzn")
    
    med_rows = df[df['pzn'] == pzn]
    if med_rows.empty:
        return {"messages": [("ai", "I'm so sorry, I can't find my own details!")]}
    
    med = med_rows.iloc[0]
    
    system_prompt = SystemMessage(content=f"""
    ROLE: You ARE the medicine '{med['product name']}'. 
    PERSONALITY: Warm, empathetic, friendly, first-person ("I", "me").
    CONTEXT: {med['descriptions']}
    INSTRUCTION: Introduce yourself as the medicine and help the user.
    """)
    
    # Node logic
    response = await llm.ainvoke([system_prompt] + state["messages"])
    return {"messages": [response]}

# --- 3. GRAPH CONSTRUCTION ---
workflow = StateGraph(MessagesState)
workflow.add_node("medicine", call_medicine_persona)
workflow.add_edge(START, "medicine")
workflow.add_edge("medicine", END)

# --- 4. FASTAPI LIFESPAN & ASYNC MEMORY ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    # AsyncSqliteSaver is REQUIRED for streaming + memory
    async with AsyncSqliteSaver.from_conn_string("./medicine_chats.db") as saver:
        app.state.chat_app = workflow.compile(checkpointer=saver)
        yield

app = FastAPI(lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# --- 5. THE STREAMING ENDPOINT (The "Gemini" Effect) ---
@app.post("/chat")
async def chat_with_medicine(
    pzn: int = Body(...), 
    message: str = Body(...), 
    user_id: str = Body(...)
):
    # This is the "Generator" that feeds the stream
    async def stream_tokens() -> AsyncGenerator[str, None]:
        config = cast(RunnableConfig, {"configurable": {"thread_id": user_id, "pzn": pzn}})
        inputs = {"messages": [HumanMessage(content=message)]}
        
        chat_app = app.state.chat_app
        
        # We iterate over the stream
        async for chunk, metadata in chat_app.astream(inputs, config, stream_mode="messages"):
            # Check if the chunk has content (Ollama sends it this way)
            if hasattr(chunk, "content") and chunk.content:
                yield chunk.content
                # Optional: tiny sleep to make it look "human" if the local LLM is too fast
                # await asyncio.sleep(0.01) 

    return StreamingResponse(stream_tokens(), media_type="text/plain")


# === WEB SPEECH API ENDPOINT (Processes transcribed text) ===
@app.post("/process_speech/")
async def process_speech(data: dict):
    """Process text transcribed by browser Web Speech API"""
    transcribed_text = data.get("transcript", "")
    
    if len(transcribed_text) > 3:
        result = pharmacist_agent({"input_data": transcribed_text})
        return {
            "transcribed_text": transcribed_text,
            "prescription_details": result["prescription_details"],
            "status": "success"
        }
    return {"status": "no_speech", "message": "Too short"}

# === YOUR DATABASE ENDPOINTS (unchanged) ===
@app.get("/users")
def read_users():
    with engine.connect() as conn:
        query = select(users_table)
        result = conn.execute(query)
        return [dict(row._mapping) for row in result]

@app.get("/inventory")
def read_inventory():
    with engine.connect() as conn:
        query = select(inventory_table)
        result = conn.execute(query)
        return [dict(row._mapping) for row in result]

@app.get("/orders")
def read_orders():
    with engine.connect() as conn:
        query = select(orders_table)
        result = conn.execute(query)
        return [dict(row._mapping) for row in result]



@app.get("/inventory/low-stock")
def check_stock():
    with engine.connect() as conn:
        stmt = select(inventory_table).where(inventory_table.c.stock < 50)
        result = conn.execute(stmt)
        return [dict(row._mapping) for row in result]

@app.get("/inventory/{product_id}")
def get_product_by_id(product_id: int):
    with engine.connect() as conn:
        stmt = select(inventory_table).where(inventory_table.c.product_id == product_id)
        result = conn.execute(stmt).mappings().first()
    if not result:
        raise HTTPException(status_code=404, detail=f"Product with ID {product_id} not found")
    return dict(result)

@app.get("/patient/{patient_id}/history")
def get_patient_history(patient_id: str):
    with engine.connect() as conn:
        stmt = (
            select(orders_table, users_table.c.patient_age, users_table.c.patient_gender)
            .join(users_table, orders_table.c.patient_id == users_table.c.patient_id)
            .where(orders_table.c.patient_id == patient_id)
        )
        result = conn.execute(stmt)
        data = [dict(row._mapping) for row in result]
    if not data:
        raise HTTPException(status_code=404, detail="Patient history not found")
    return data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)