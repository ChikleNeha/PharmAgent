import sqlite3
from langchain_core.tools import tool

@tool
def check_medicine_inventory(medicine_name: str):
    """
    Autonomously queries the Medicine Master Data for stock and prescription rules.
    Search this whenever a user mentions a medicine name.
    """
    conn = sqlite3.connect('../database/d1.db')
    cursor = conn.cursor()
    
    # Matches the 'Source of Truth' requirement [cite: 69]
    query = "SELECT stock_level, prescription_required, unit_type FROM medicine_master WHERE name LIKE ?"
    cursor.execute(query, (f"%{medicine_name}%",))
    row = cursor.fetchone()
    conn.close()

    if row:
        return {
            "name": medicine_name,
            "stock": row[0],
            "needs_prescription": bool(row[1]),
            "unit": row[2]
        }
    return {"error": f"Medicine '{medicine_name}' not found in master data."}