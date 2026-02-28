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
        print(f"\n[ALERT] {prod['product name']} requires Prescription.")
        choice = input("Admin, approve order? (yes/no): ").lower()
        if choice == "yes":
            return {"product_data": prod, "compliance_status": "approved", "audit_reason": "Manual Rx Approved."}
        return {"product_data": prod, "compliance_status": "rejected", "audit_reason": "Rx Denied."}
    
    return {"product_data": prod, "compliance_status": "approved", "audit_reason": "OTC Approved."}