import pandas as pd

df = pd.read_excel("data/eng-products-export.xlsx")

async def compliance_node(state):
    pzn = state["pzn"]
    match = df[df['pzn'] == pzn]
    
    if match.empty:
        return {"compliance_status": "rejected", "audit_reason": "PZN not found."}
    
    prod = match.iloc[0].to_dict()
    
    # Prescription Check (Example: PZN divisible by 5)
    if pzn % 5 == 0:
        # Instead of input(), we just set a flag and the graph will pause
        return {
            "product_data": prod, 
            "compliance_status": "pending_admin", 
            "audit_reason": "Waiting for prescription verification."
        }
    
    return {"product_data": prod, "compliance_status": "approved", "audit_reason": "OTC Approved."}