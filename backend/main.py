from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine, MetaData, Table, select

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
    
@app.get("/inventory/low-stock")
def check_stock():
    """Returns products where stock is below 50"""
    with engine.connect() as conn:
        stmt = select(inventory_table).where(inventory_table.c.stock < 50)
        result = conn.execute(stmt)
        return [dict(row._mapping) for row in result]
# # --- Input Schema ---
# class UserQuery(BaseModel):
#     query: str

# def query_db(search_term: str): 
#     conn = sqlite3.connect(DATABASE_URL) 
#     cursor = conn.cursor()
#     cursor.execute("SELECT * FROM inventory WHERE product_name LIKE ?", ('%' + search_term + '%',))
#     results = cursor.fetchall()

@app.get("/inventory/{product_id}")
def get_product_by_id(product_id: int):
    """
    Fetch a single product's details and stock level by its ID.
    """
    with engine.connect() as conn:
        # Construct the query: SELECT * FROM inventory WHERE product_id = :product_id
        stmt = select(inventory_table).where(inventory_table.c.product_id == product_id)
        result = conn.execute(stmt).mappings().first()
    
    # If no product is found with that ID, return a 404 error
    if not result:
        raise HTTPException(
            status_code=404, 
            detail=f"Product with ID {product_id} not found"
        )
    
    return dict(result)

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

