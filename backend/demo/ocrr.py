from fastapi import FastAPI, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
import easyocr
import re
import json
import tempfile
import os
import traceback
from typing import Dict, List

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

# Initialize reader with safety flags
try:
    reader = easyocr.Reader(['en'], download_enabled=False, detector=True, recognizer=True)
except Exception as e:
    print(f"EasyOCR init error: {e}")

@app.post("/extract-medicines/")
async def extract_medicines_endpoint(file: UploadFile = File(...)):
    print(f"Processing file: {file.filename}, size: {file.size}")
    
    try:
        content = await file.read()
        if len(content) == 0:
            return JSONResponse(content={"error": "Empty file"}, status_code=400)
        
        with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as tmp:
            tmp.write(content)
            tmp_path = tmp.name
        
        # OCR with timeout safety
        print("Running OCR...")
        results = reader.readtext(tmp_path, detail=1, allow_splitting=False, paragraph=False)
        raw_text = ' '.join([text for _, text, conf in results if conf > 30])  # Filter low conf
        os.unlink(tmp_path)
        print(f"OCR raw text length: {len(raw_text)}")
        print(f"Sample OCR: {raw_text[:200]}")
        
        data = extract_prescription_info(raw_text)
        print("Extraction success")
        return JSONResponse(content=data)
    
    except Exception as e:
        error_msg = f"OCR Error: {str(e)}\n{traceback.format_exc()}"
        print(error_msg)
        return JSONResponse(content={
            "error": "Processing failed",
            "details": error_msg[:500],
            "total_medicines": 0,
            "medicines": []
        }, status_code=500)

def extract_prescription_info(text: str) -> Dict:
    if not text.strip():
        return {"error": "No text detected", "total_medicines": 0, "medicines": [], "raw_ocr": ""}
    
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    
    # Patient/Doctor
    patient_match = re.search(r'(?:Patient|Pt):\s*([A-Za-z\s]{2,30})', text, re.IGNORECASE | re.DOTALL)
    patient = patient_match.group(1).strip() if patient_match else "N/A"
    
    doctor_match = re.search(r'(?:Dr\.|Doctor):\s*([A-Za-z\s]{2,30})', text, re.IGNORECASE)
    doctor = doctor_match.group(1).strip() if doctor_match else "N/A"
    
    # Medicines (same robust patterns)
    medicines = []
    patterns = [
        r'(?:Tab\.?|Cap\.?|Tablet)\s*([A-Z][a-zA-Z0-9\s/]{2,25}?)\s+(\d+(?:\.\d+)?[a-z]+)',
        r'([A-Z][a-zA-Z0-9\s/]{3,25}?)\s+(\d+[a-z]+(?:\s+[a-z]+)?)'
    ]
    
    for line in lines:
        line_upper = line.upper()
        if any(word in line_upper for word in ['TAB', 'CAP', 'SYRUP', 'INJ']):
            for pat in patterns:
                match = re.search(pat, line, re.IGNORECASE)
                if match:
                    medicines.append({
                        "drug_name": match.group(1).strip().title(),
                        "dosage": match.group(2).strip(),
                        "instructions": "N/A"
                    })
                    break
    
    # Dedup
    unique_meds = []
    seen = {(m['drug_name'], m['dosage']) for m in medicines}
    unique_meds = list({(m['drug_name'], m['dosage']): m for m in medicines}.values())
    
    return {
        "patient_name": patient,
        "doctor_name": doctor,
        "total_medicines": len(unique_meds),
        "medicines": unique_meds,
        "raw_ocr": text[:300]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
