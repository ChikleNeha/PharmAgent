import easyocr
import json
import re
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate

reader = easyocr.Reader(['en'])
llm = OllamaLLM(model="llama3.2")

def extract_structured_prescription(image_path: str):
    try:
        results = reader.readtext(image_path, detail=1)
        raw_texts = [text for bbox, text, conf in results if isinstance(conf, (int, float)) and conf > 0.5]
        raw_text = ' '.join(raw_texts)
        
        # LLM structuring with fallback
        prompt = ChatPromptTemplate.from_template("""
        Extract from OCR text: patient_name, drug_name, dosage, quantity, instructions, doctor_name, date.
        Text: {ocr_text}
        
        If unclear, use "Unknown". Return ONLY valid JSON:
        {{"patient_name": "", "drug_name": "", "dosage": "", "quantity": "", "instructions": "", "doctor_name": "", "date": "", "allergies": null}}
        """)
        
        chain = prompt | llm
        llm_response = chain.invoke({"ocr_text": raw_text})
        
        # Extract JSON from LLM response (handles extra text)
        json_match = re.search(r'\{.*\}', llm_response, re.DOTALL)
        if json_match:
            structured = json_match.group()
        else:
            structured = llm_response.strip()
        
        prescription = json.loads(structured)
        
    except Exception as e:
        # Fallback to raw OCR text
        prescription = {
            "raw_ocr": raw_text if 'raw_text' in locals() else "No text detected",
            "patient_name": "Unknown", 
            "drug_name": "Unknown",
            "dosage": "Unknown",
            "error": str(e)
        }
    
    return {
        "raw_ocr": raw_text if 'raw_text' in locals() else "No text detected",
        "structured_prescription": prescription,
        "status": "success"
    }
