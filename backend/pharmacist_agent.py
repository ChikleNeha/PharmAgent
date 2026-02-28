from langchain_ollama import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
from models import WorkflowState

llm = ChatOllama(model="llama3.2")

def pharmacist_agent(state: WorkflowState) -> WorkflowState:
    """Standalone pharmacist agent - processes input to structured prescription."""
    input_text = state.get("input_data", "")
    
    prompt = ChatPromptTemplate.from_template("""
    Process pharmacy input: {input}
    Extract: patient_name, drug_name, dosage, quantity, instructions.
    Return JSON only.
    """)
    
    chain = prompt | llm
    response = chain.invoke({"input": input_text})
    
    # Simple JSON parse (add error handling)
    import json
    try:
        details = json.loads(response)
    except:
        details = {"patient_name": "Unknown", "drug_name": input_text, "dosage": "Unknown"}
    
    return {
        **state,
        "prescription_details": details
    }
