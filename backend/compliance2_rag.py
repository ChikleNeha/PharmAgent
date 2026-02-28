import pandas as pd
import asyncio
import os
from typing import TypedDict, Literal
from langchain_ollama import ChatOllama
from langgraph.graph import StateGraph, START, END
from fpdf import FPDF
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# --- 1. DATA INGESTION (EXCEL) ---
# Direct access to your 53-row product list
excel_path = "data/eng-products-export.xlsx"
df = pd.read_excel(excel_path)

# Simulate stock and prescription flags for your 53 products
# Let's say Row 0 (Panthenol) is Out of Stock for testing
df['stock_level'] = [0 if i == 0 else 20 for i in range(len(df))]
# Let's say items like Aqualibra or others are 'High Risk' (Requires Prescription)
df['prescription_required'] = [True if i % 5 == 0 else False for i in range(len(df))]

# --- 2. STATE DEFINITION ---
class ComplianceState(TypedDict):
    med_name: str
    product_data: dict
    stock_status: str
    risk_level: str
    admin_approval: str
    audit_reason: str

llm = ChatOllama(model="llama3.2", temperature=0)

# --- 3. NODES ---

async def check_stock(state: ComplianceState):
    name = state["med_name"]
    # Search the 53 rows
    match = df[df['product name'].str.contains(name, case=False, na=False)]
    
    if match.empty:
        return {"stock_status": "none", "audit_reason": "Product not found in inventory."}
    
    prod = match.iloc[0].to_dict()
    if prod['stock_level'] > 0:
        return {"product_data": prod, "stock_status": "available"}
    else:
        return {"product_data": prod, "stock_status": "out_of_stock", "audit_reason": "Item is currently out of stock."}

async def assess_risk(state: ComplianceState):
    is_rx = state["product_data"]["prescription_required"]
    return {"risk_level": "high" if is_rx else "low"}

async def admin_review(state: ComplianceState):
    print(f"\n[ALERT] {state['product_data']['product name']} requires Prescription.")
    # Manual Input Simulation
    choice = input("Admin, please review. Approve order? (yes/no): ").lower()
    
    if choice == "yes":
        return {"admin_approval": "approved", "audit_reason": "Admin manually approved the prescription."}
    else:
        return {"admin_approval": "rejected", "audit_reason": "Admin rejected due to prescription issues."}

async def generate_audit_log(state: ComplianceState):
    """Generates the Audit PDF based on the path taken in the graph."""
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(200, 10, "Pharmacy Compliance Audit Log", ln=True, align='C')
    
    pdf.set_font("Arial", size=12)
    pdf.ln(10)
    pdf.cell(200, 10, f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", ln=True)
    
    p_name = state['product_data'].get('product name', 'N/A')
    p_pzn = state['product_data'].get('pzn', 'N/A')
    
    pdf.cell(200, 10, f"Medication: {p_name} (PZN: {p_pzn})", ln=True)
    pdf.cell(200, 10, f"Risk Category: {state.get('risk_level', 'N/A').upper()}", ln=True)
    pdf.cell(200, 10, f"Status: {state.get('admin_approval', 'PROCESSED').upper()}", ln=True)
    pdf.ln(5)
    pdf.multi_cell(0, 10, f"Audit Justification: {state.get('audit_reason', 'Standard OTC transaction.')}")
    
    filename = f"audit_{p_pzn}.pdf"
    pdf.output(filename)
    print(f"\n[System] Audit Log saved: {filename}")
    return {}

# --- 4. CONDITIONAL ROUTING ---

def route_stock(state: ComplianceState):
    return "risk" if state["stock_status"] == "available" else "audit"

def route_risk(state: ComplianceState):
    return "admin" if state["risk_level"] == "high" else "audit"

def route_admin(state: ComplianceState):
    return "audit" # Both approval and rejection lead to audit log

# --- 5. BUILD THE GRAPH ---
builder = StateGraph(ComplianceState)

builder.add_node("check_stock", check_stock)
builder.add_node("assess_risk", assess_risk)
builder.add_node("admin_review", admin_review)
builder.add_node("audit", generate_audit_log)

builder.add_edge(START, "check_stock")

builder.add_conditional_edges("check_stock", route_stock, {
    "risk": "assess_risk",
    "audit": "audit"
})

builder.add_conditional_edges("assess_risk", route_risk, {
    "admin": "admin_review",
    "audit": "audit"
})

builder.add_edge("admin_review", "audit")
builder.add_edge("audit", END)

compliance_graph = builder.compile()

# --- 6. RUNNER ---
async def run_agent():
    from typing import cast

# Inside your run_agent function:

    med = input("\nEnter medication name: ")
    initial_state = cast(ComplianceState, {"med_name": med})
    await compliance_graph.ainvoke(initial_state)
    await asyncio.sleep(1) # Cleanup for LangSmith

if __name__ == "__main__":
    asyncio.run(run_agent())