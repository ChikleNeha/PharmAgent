from fastapi import FastAPI
from contextlib import asynccontextmanager
from db_setup import seed_database
import sqlite3

@asynccontextmanager
async def lifespan(app: FastAPI):
    # This runs when the server starts
    seed_database()
    yield
    # This runs when the server shuts down (if needed)

app = FastAPI(lifespan=lifespan)

@app.get("/data")
def get_data():
    conn = sqlite3.connect("database.db")
    # Helper to return rows as dictionaries
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    rows = cursor.execute("SELECT * FROM inventory LIMIT 10").fetchall()
    conn.close()
    
    return [dict(row) for row in rows]