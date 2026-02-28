import pandas as pd
import asyncio
from typing import TypedDict, Literal
from langchain_ollama import ChatOllama
from langgraph.graph import StateGraph, START, END
from fpdf import FPDF
from datetime import datetime

# --- 1. DATA ---
excel_file = "backend/data/eng-products-export.xlsx" 
df = pd.read_excel(excel_file)
# Mocking data for the 53 rows
df['stock_level'] = [0 if i == 0 else 10 for i in range(len(df))]
df['prescription_required'] = [True if i % 5 == 0 else False for i in range(len(df))]

# --- 2. STATE ---
class ComplianceState(TypedDict):
    query_name: str
    product_info: dict
    stock_status: str
    risk_level: str
    admin_decision: str
    final_message: str
    audit_summary: str # New field for PDF content

llm = ChatOllama(model="llama3.2", temperature=0)

# --- 3. NODES ---

async def check_inventory(state: ComplianceState):
    name = state["query_name"]
    match = df[df['product name'].str.contains(name, case=False, na=False)]
    if match.empty:
        return {"stock_status": "out_of_stock", "audit_summary": "Product not found in Excel."}
    
    prod = match.iloc[0].to_dict()
    status = "available" if prod['stock_level'] > 0 else "out_of_stock"
    return {"product_info": prod, "stock_status": status}

async def risk_assessment(state: ComplianceState):
    requires_rx = state["product_info"]["prescription_required"]
    risk = "high" if requires_rx else "low"
    return {"risk_level": risk}

async def admin_review(state: ComplianceState):
    # Simulated Admin Logic
    requires_rx = state["product_info"]["prescription_required"]
    decision = "approved" if requires_rx else "rejected" 
    summary = f"Admin reviewed {state['product_info']['product name']}. Decision: {decision}."
    return {"admin_decision": decision, "audit_summary": summary}

async def generate_audit_pdf(state: ComplianceState):
    """Generates a PDF summary of the transaction."""
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(200, 10, txt="Pharmacy Order Audit Log", ln=True, align='C')
    
    pdf.set_font("Arial", size=12)
    pdf.ln(10)
    pdf.cell(200, 10, txt=f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", ln=True)
    pdf.cell(200, 10, txt=f"Product: {state['product_info'].get('product name', 'Unknown')}", ln=True)
    pdf.cell(200, 10, txt=f"Stock Status: {state['stock_status']}", ln=True)
    pdf.cell(200, 10, txt=f"Risk Level: {state['risk_level']}", ln=True)
    pdf.cell(200, 10, txt=f"Compliance Summary: {state.get('audit_summary', 'Standard OTC Order')}", ln=True)
    
    file_name = f"audit_log_{state['query_name']}.pdf"
    pdf.output(file_name)
    print(f"\n[System] Audit Log Generated: {file_name}")
    return {"final_message": f"Order processed and audit log saved as {file_name}"}

# --- 4. GRAPH CONSTRUCTION ---
builder = StateGraph(ComplianceState)

builder.add_node("inventory", check_inventory)
builder.add_node("risk", risk_assessment)
builder.add_node("admin", admin_review)
builder.add_node("pdf_gen", generate_audit_pdf)

builder.set_entry_point("inventory")

# Routing Logic
builder.add_conditional_edges("inventory", 
    lambda x: "risk" if x["stock_status"] == "available" else "pdf_gen",
    {"risk": "risk", "pdf_gen": "pdf_gen"})

builder.add_conditional_edges("risk", 
    lambda x: "admin" if x["risk_level"] == "high" else "pdf_gen",
    {"admin": "admin", "pdf_gen": "pdf_gen"})

builder.add_edge("admin", "pdf_gen")
builder.add_edge("pdf_gen", END)

app = builder.compile()

# --- 5. EXECUTION ---
async def run_with_pdf(name: str):
    await app.ainvoke({"query_name": name})
    await asyncio.sleep(2) # Prevent LangSmith shutdown error

if __name__ == "__main__":
    asyncio.run(run_with_pdf("Panthenol")) # Out of Stock -> PDF
    asyncio.run(run_with_pdf("Vitasprint")) # OTC -> PDF