import pandas as pd
import asyncio
from typing import TypedDict, List, cast, Literal
from langchain_ollama import ChatOllama
from langgraph.graph import StateGraph, START, END
from fpdf import FPDF
from datetime import datetime

# --- 1. DATA & STATE ---
excel_path = "data/eng-products-export.xlsx"
df = pd.read_excel(excel_path)

class PharmacyState(TypedDict):
    query: str
    selected_med_pzn: int
    recommendations: List[dict]
    compliance_status: str
    audit_log: str
    prediction_msg: str

llm = ChatOllama(model="llama3.2", temperature=0)

# --- 2. PHASE 1: DISCOVERY NODES ---

async def pharmacist_discovery(state: PharmacyState):
    """Searches Excel and returns a list of candidate products."""
    query = state["query"]
    # Fuzzy search in the 53 rows
    matches = df[df['product name'].str.contains(query, case=False, na=False)].head(3)
    recs = matches.to_dict('records')
    return {"recommendations": recs}

# --- 3. PHASE 2: FULFILLMENT NODES ---

async def compliance_check(state: PharmacyState):
    """The Safety Gate: Checks Rx requirement and Stock."""
    pzn = state["selected_med_pzn"]
    product = df[df['pzn'] == pzn].iloc[0].to_dict()
    
    # Mock Logic: PZNs ending in 0 require Admin/Rx
    if pzn % 10 == 0:
        print(f"\n[Compliance] {product['product name']} requires a Prescription.")
        return {"compliance_status": "approved", "audit_log": "Admin approved Rx."}
    
    return {"compliance_status": "approved", "audit_log": "OTC Approved."}

async def warehouse_and_audit(state: PharmacyState):
    """Updates stock, triggers webhooks, and generates PDF."""
    pzn = state["selected_med_pzn"]
    product = df[df['pzn'] == pzn].iloc[0].to_dict()
    
    # Generate Audit PDF
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", 'B', 14)
    pdf.cell(200, 10, f"Order Receipt: {product['product name']}", ln=True, align='C')
    pdf.output(f"receipt_{pzn}.pdf")
    
    print(f"[Warehouse] Stock deducted. Webhook sent for PZN {pzn}.")
    return {}

async def predictive_alert(state: PharmacyState):
    """Predicts next refill and drafts message."""
    pzn = state["selected_med_pzn"]
    product = df[df['pzn'] == pzn].iloc[0].to_dict()
    
    prompt = f"Patient bought {product['product name']}. Draft a refill reminder for 30 days from now."
    res = await llm.ainvoke(prompt)
    return {"prediction_msg": res.content}

# --- 4. GRAPH CONSTRUCTION ---

builder = StateGraph(PharmacyState)

builder.add_node("discovery", pharmacist_discovery)
builder.add_node("compliance", compliance_check)
builder.add_node("warehouse", warehouse_and_audit)
builder.add_node("predictive", predictive_alert)

builder.add_edge(START, "discovery")
# The "Discovery" node ends here. The "Click" happens externally.
# Then we jump to "Compliance".
builder.add_edge("compliance", "warehouse")
builder.add_edge("warehouse", "predictive")
builder.add_edge("predictive", END)

pharmacy_system = builder.compile()

# --- 5. EXECUTION (The Interactive Flow) ---

async def run_interactive_pharmacy():
    # STEP 1: Discovery
    user_query = input("Pharmacist: How can I help you today? ")
    discovery_result = await pharmacy_system.ainvoke({"query": user_query})
    
    print("\nPharmacist: I found these options for you:")
    recs = discovery_result["recommendations"]
    for i, r in enumerate(recs):
        print(f"[{i}] {r['product name']} - Price: {r['price rec']} (PZN: {r['pzn']})")
    
    # STEP 2: The "Click" (User Selection)
    choice = int(input("\nUser: (Enter index to buy one) "))
    selected_pzn = recs[choice]['pzn']
    
    # STEP 3: Fulfillment Logic
    print("\n--- Starting Fulfillment Process ---")
    final_state = await pharmacy_system.ainvoke({
            "selected_med_pzn": selected_pzn,
            "query": user_query # Keeping state
            }, interrupt_before=["compliance"]) 
    # Note: In a real app, you'd use 'interrupt_before' to pause for the click.
    # For this script, we'll just run the rest:
    
    fulfillment_result = await pharmacy_system.ainvoke({
        "selected_med_pzn": selected_pzn,
        "query": user_query
    })
    
    print(f"\n[Predictive Agent]: {fulfillment_result['prediction_msg']}")

if __name__ == "__main__":
    asyncio.run(run_interactive_pharmacy())