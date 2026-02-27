import pandas as pd
import sqlite3
import os
import random
import uuid

# --- Hardcoded Relative Paths ---
PRODUCT_FILE = "../data/eng-products-export.xlsx" 
ORDER_FILE = "../data/consumer_order_history.xlsx"
DB_NAME = "d1.db"

def to_snake_case(text):
    parts = str(text).replace('-', ' ').replace('_', ' ').split()
    return '_'.join(parts).lower() if parts else text

def seed_database():
    if os.path.exists(DB_NAME):
        print(f"Database exists. Skipping.")
        return

    try:
        # 1. Load Inventory
        print(f"Reading Excel: {PRODUCT_FILE}")
        inv_df = pd.read_excel(PRODUCT_FILE)
        inv_df.columns = [to_snake_case(col) for col in inv_df.columns]
        inv_df['stock'] = [random.randint(10, 500) for _ in range(len(inv_df))]

        # 2. Load History
        print(f"Reading Excel: {ORDER_FILE}")
        order_source_df = pd.read_excel(ORDER_FILE)
        order_source_df.columns = [to_snake_case(col) for col in order_source_df.columns]

        # --- FIX: Update these to match your actual file headers ---
        # 3. Create Users Table
        # Using 'patient_age' and 'patient_gender' as per your error message
        user_cols = ['patient_id', 'patient_age', 'patient_gender']
        # Double check if these columns exist, then drop duplicates
        users_df = order_source_df[[c for c in user_cols if c in order_source_df.columns]].drop_duplicates(subset=['patient_id'])
        
        # 4. Create Orders Table
        order_cols = ['patient_id', 'purchase_date', 'product_name', 
                      'quantity', 'price', 'dosage_frequency', 
                      'prescription_required']
        
        existing_order_cols = [c for c in order_cols if c in order_source_df.columns]
        orders_df = order_source_df[existing_order_cols].copy()
        orders_df['order_id'] = [str(uuid.uuid4()) for _ in range(len(orders_df))]

        # 5. Save to Database
        conn = sqlite3.connect(DB_NAME)
        inv_df.to_sql("inventory", conn, index=False, if_exists="replace")
        users_df.to_sql("users", conn, index=False, if_exists="replace")
        orders_df.to_sql("orders", conn, index=False, if_exists="replace")
        conn.close()
        
        print("✅ Success! Created tables: inventory, users, orders")
        print(f"User columns saved: {list(users_df.columns)}")

    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    seed_database()