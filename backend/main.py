from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine, MetaData, Table, select
import os
from pydantic import BaseModel
# from agents.pharmacist_agent import extract_keywords, pharmacist_agent
import sqlite3

# from agents.pharmacist_agent import extract_keywords

app = FastAPI()

# Path to your database file
DB_FILE = "./database/d1.db"
DATABASE_URL = f"sqlite:///{DB_FILE}"

# SQLAlchemy Setup
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
metadata = MetaData()

# This "Reflects" the tables created by your seed script automatically
metadata.reflect(bind=engine)
users_table = metadata.tables['users']
orders_table = metadata.tables['orders']
inventory_table = metadata.tables['inventory']

# --- Endpoints ---

@app.get("/users")
def read_users():
    with engine.connect() as conn:
        query = select(users_table)
        result = conn.execute(query)
        # Convert rows to a list of dictionaries
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
    
class ChatRequest(BaseModel):
    message: str

# --- Input Schema ---
class UserQuery(BaseModel):
    query: str

def query_db(search_term: str): 
    conn = sqlite3.connect(DATABASE_URL) 
    cursor = conn.cursor()

# --- Pharmacist Agent Endpoint ---
# @app.post("/pharmacist")
# def pharmacist_agent(user_query: UserQuery):
#     # Step 1: Extract keywords from messy input
#     keywords = extract_keywords(user_query.query)

#     # Step 2: Query DB for each keyword
#     all_results = []
#     for kw in keywords:
#         matches = query_db(kw)
#         all_results.extend(matches)

#     # Step 3: Return results
#     if not all_results:
#         return {"message": "No matching medicines found."}
#     return {"matches": all_results}


@app.get("/patient/{patient_id}/history")
def get_patient_history(patient_id: str):
    """Returns patient details and all their orders joined together"""
    with engine.connect() as conn:
        # Perform a SQL JOIN using SQLAlchemy
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

@app.get("/inventory/low-stock")
def check_stock():
    """Returns products where stock is below 50"""
    with engine.connect() as conn:
        stmt = select(inventory_table).where(inventory_table.c.stock < 50)
        result = conn.execute(stmt)
        return [dict(row._mapping) for row in result]