import pandas as pd
import asyncio
import os
from typing import TypedDict, cast
from langchain_ollama import ChatOllama
from langgraph.graph import StateGraph, START, END
from fpdf import FPDF
from datetime import datetime
from dotenv import load_dotenv
import langchain 

load_dotenv()

# --- 1. DATA INGESTION ---
excel_path = "data/eng-products-export.xlsx"
df = pd.read_excel(excel_path)

# Ensure stock and prescription flags exist for your 53 products
df['stock_level'] = [0 if i == 0 else 20 for i in range(len(df))]
df['prescription_required'] = [True if i % 5 == 0 else False for i in range(len(df))]

# --- 2. STATE DEFINITION ---
class ComplianceState(TypedDict):
    pzn: int  # Changed from med_name to pzn
    product_data: dict
    stock_status: str
    risk_level: str
    admin_approval: str
    audit_reason: str

llm = ChatOllama(model="llama3.2", temperature=0)

# --- 3. NODES ---

async def check_stock(state: ComplianceState):
    target_pzn = state["pzn"]
    
    # Precise lookup using PZN
    match = df[df['pzn'] == target_pzn]
    
    if match.empty:
        return {
            "stock_status": "none", 
            "audit_reason": f"PZN {target_pzn} not found in inventory.",
            "product_data": {"product name": "Unknown", "pzn": target_pzn}
        }
    
    prod = match.iloc[0].to_dict()
    if prod['stock_level'] > 0:
        return {"product_data": prod, "stock_status": "available"}
    else:
        return {
            "product_data": prod, 
            "stock_status": "out_of_stock", 
            "audit_reason": f"Item {prod['product name']} is currently out of stock."
        }

async def assess_risk(state: ComplianceState):
    is_rx = state["product_data"].get("prescription_required", False)
    return {"risk_level": "high" if is_rx else "low"}

async def admin_review(state: ComplianceState):
    print(f"\n[ALERT] {state['product_data']['product name']} requires Prescription.")
    choice = input("Admin, please review. Approve order? (yes/no): ").lower()
    
    if choice == "yes":
        return {"admin_approval": "approved", "audit_reason": "Admin manually approved the prescription."}
    else:
        return {"admin_approval": "rejected", "audit_reason": "Admin rejected due to prescription issues."}

async def generate_audit_log(state: ComplianceState):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(200, 10, "Pharmacy Compliance Audit Log", ln=True, align='C')
    
    pdf.set_font("Arial", size=12)
    pdf.ln(10)
    pdf.cell(200, 10, f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", ln=True)
    
    p_data = state.get('product_data', {})
    p_name = p_data.get('product name', 'N/A')
    p_pzn = state.get('pzn', 'N/A')
    
    pdf.cell(200, 10, f"Medication: {p_name} (PZN: {p_pzn})", ln=True)
    pdf.cell(200, 10, f"Risk Category: {state.get('risk_level', 'N/A').upper()}", ln=True)
    pdf.cell(200, 10, f"Status: {state.get('admin_approval', 'PROCESSED').upper()}", ln=True)
    pdf.ln(5)
    pdf.multi_cell(0, 10, f"Audit Justification: {state.get('audit_reason', 'Standard transaction.')}")
    
    filename = f"audit_pzn_{p_pzn}.pdf"
    pdf.output(filename)
    print(f"\n[System] Audit Log saved: {filename}")
    return {}

# --- 4. CONDITIONAL ROUTING ---
def route_stock(state: ComplianceState):
    return "risk" if state["stock_status"] == "available" else "audit"

def route_risk(state: ComplianceState):
    return "admin" if state["risk_level"] == "high" else "audit"

# --- 5. BUILD THE GRAPH ---
builder = StateGraph(ComplianceState)

builder.add_node("check_stock", check_stock)
builder.add_node("assess_risk", assess_risk)
builder.add_node("admin_review", admin_review)
builder.add_node("audit", generate_audit_log)

builder.set_entry_point("check_stock")

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
    try:
        raw_pzn = input("\nEnter PZN to process: ")
        pzn_val = int(raw_pzn)
        
        initial_state = cast(ComplianceState, {
            "pzn": pzn_val,
            "product_data": {},
            "admin_approval": "pending",
            "audit_reason": "N/A"
        })
        
        await compliance_graph.ainvoke(initial_state)
        
        # ADD THIS LINE: It gives LangSmith time to finish tracing
        await asyncio.sleep(2) 
        
    except ValueError:
        print("Invalid PZN.")

if __name__ == "__main__":
    asyncio.run(run_agent())