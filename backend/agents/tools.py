import sqlite3
from langchain_core.tools import tool
# --- 2. TOOLS DEFINITION ---
@tool
def search_pharmacy_inventory(query: str):
    """
    Search the pharmacy database for medication information.
    Query can be a product name (e.g., 'Panthenol') or a category/symptom.
    """
    conn = sqlite3.connect("pharmacy5.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    sql_query = f"%{query}%"
    cursor.execute(
        "SELECT product_name, price, stock_level, description FROM inventory WHERE product_name LIKE ? OR description LIKE ?",
        (sql_query, sql_query)
    )
    results = [dict(row) for row in cursor.fetchall()]
    conn.close()
    
    if not results:
        return f"No products found for '{query}'."
    return results