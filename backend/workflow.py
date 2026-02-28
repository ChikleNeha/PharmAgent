from langgraph.graph import StateGraph, END
from models import WorkflowState
from pharmacist_agent import pharmacist_agent

def compliance_check(state: WorkflowState) -> WorkflowState:
    """Simple compliance logic."""
    drug = state["prescription_details"].get("drug_name", "").lower()
    return {
        **state,
        "compliance_pass": "available" in drug,  # Mock check
        "drug_available": True
    }

def build_workflow():
    graph = StateGraph(WorkflowState)
    
    graph.add_node("pharmacist", pharmacist_agent)
    graph.add_node("compliance", compliance_check)
    
    graph.set_entry_point("pharmacist")
    graph.add_edge("pharmacist", "compliance")
    graph.add_edge("compliance", END)
    
    return graph.compile()
