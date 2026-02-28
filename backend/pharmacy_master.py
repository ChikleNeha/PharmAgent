import asyncio
from typing import TypedDict, cast
from langgraph.graph import StateGraph, START, END

# IMPORT your custom nodes from the other files
from compliance_agent import compliance_node
from refill_agent import warehouse_node, predictive_node

class PharmacyState(TypedDict):
    pzn: int
    patient_id: str
    product_data: dict
    compliance_status: str
    audit_reason: str
    prediction_msg: str

# Build Graph
builder = StateGraph(PharmacyState)

builder.add_node("compliance", compliance_node)
builder.add_node("warehouse", warehouse_node)
builder.add_node("predictive", predictive_node)

builder.add_edge(START, "compliance")

builder.add_conditional_edges(
    "compliance",
    lambda x: "process" if x["compliance_status"] == "approved" else "end",
    {"process": "warehouse", "end": END}
)

builder.add_edge("warehouse", "predictive")
builder.add_edge("predictive", END)

app = builder.compile()

async def main():
    pzn_in = int(input("\nEnter PZN: "))
    inputs = {"pzn": pzn_in, "patient_id": "CUST_001", "product_data": {}}
    
    final = await app.ainvoke(inputs)
    
    if "prediction_msg" in final:
        print(f"\n[AI]: {final['prediction_msg']}")
    await asyncio.sleep(2) # Cleanup

if __name__ == "__main__":
    asyncio.run(main())