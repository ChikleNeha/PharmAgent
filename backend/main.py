from fastapi import FastAPI, HTTPException, UploadFile, File
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
from pharmacist_agent import pharmacist_agent
from pydantic import BaseModel
from typing import List, Optional

# Import your agents/logic from your modular files
from pharmacist_rag import pharmacist_agent  # Your Discovery RAG
from pharmacy_master import app as pharmacy_graph # Your Master Workflow

app = FastAPI(title="AI Pharmacy API", version="1.0.0")

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

@app.post("/process-order")
async def process_order(order: OrderRequest):
    """
    Step 2: User clicks a PZN. This triggers Compliance, Warehouse, and Refill.
    """
    try:
        initial_state = {
            "pzn": order.pzn,
            "patient_id": order.patient_id,
            "product_data": {},
            "compliance_status": "pending",
            "audit_reason": "",
            "prediction_msg": ""
        }
        
        # Execute the Master Graph
        final_state = await pharmacy_graph.ainvoke(initial_state)
        
        return {
            "status": final_state["compliance_status"],
            "reason": final_state["audit_reason"],
            "refill_prediction": final_state.get("prediction_msg", "No refill scheduled."),
            "audit_pdf": f"audit_{order.pzn}.pdf"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


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
