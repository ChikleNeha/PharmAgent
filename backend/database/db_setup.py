import pandas as pd
import sqlite3
import os
import random

DB_NAME = "test.db"
EXCEL_FILE = "../data/eng-products-export.xlsx"  

def to_snake_case(text):
    """Transforms strings to snake_case"""
    parts = str(text).replace('-', ' ').replace('_', ' ').split()
    return '_'.join(parts).lower() if parts else text

def seed_database():
    # 1. Check if database already exists to avoid re-seeding
    if os.path.exists(DB_NAME):
        print(f"Database '{DB_NAME}' already exists. Skipping seeding.")
        return

    print("Database not found. Initializing and seeding data...")
    
    try:
        # 2. Read the Excel file
        df = pd.read_excel(EXCEL_FILE)

        # 1. Transform all columns to snake_case
        df.columns = [to_snake_case(col) for col in df.columns]

        # 3. Add the 'stock' column with random values (e.g., between 0 and 100)
        df['stock'] = [random.randint(0, 100) for _ in range(len(df))]

        # 4. Connect to SQLite and save the entire dataframe
        # if_exists='replace' creates the table based on the Excel columns
        conn = sqlite3.connect(DB_NAME)
        df.to_sql("inventory", conn, index=False, if_exists="replace")
        conn.close()
        
        print(f"Successfully seeded {len(df)} rows into table 'inventory'.")
        
    except FileNotFoundError:
        print(f"Error: {EXCEL_FILE} not found. Please provide an Excel file to seed.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    seed_database()


# import pandas as pd
# import sqlite3
# import os
# import random

# # Configuration
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# # Adjust this to your specific path
# EXCEL_FILE = os.path.join(BASE_DIR, "data", "eng-products-export.xlsx")
# DB_NAME = "database.db"

# def to_snake_case(text):
#     """Transforms strings to snake_case"""
#     parts = str(text).replace('-', ' ').replace('_', ' ').split()
#     return '_'.join(parts).lower() if parts else text

# def seed_database():
#     # If the DB exists, we skip to avoid duplicates
#     if os.path.exists(DB_NAME):
#         print(f"Database '{DB_NAME}' already exists. Skipping seed.")
#         return

#     try:
#         print(f"Reading {EXCEL_FILE}...")
#         df = pd.read_excel(EXCEL_FILE)

#         # 1. Transform all columns to snake_case
#         df.columns = [to_snake_case(col) for col in df.columns]

#         # 2. Add 'stock' column (already snake_case)
#         df['stock'] = [random.randint(10, 500) for _ in range(len(df))]

#         # 3. Save to SQLite
#         conn = sqlite3.connect(DB_NAME)
#         # Table name is also snake_case now
#         df.to_sql("products", conn, index=False, if_exists="replace")
#         conn.close()
        
#         print("✅ Database seeded with snake_case columns!")
#         print(f"Columns in DB: {list(df.columns)}")

#     except Exception as e:
#         print(f"❌ Error: {e}")

# if __name__ == "__main__":
#     seed_database()