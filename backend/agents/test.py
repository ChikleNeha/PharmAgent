# # import easyocr
# # from PIL import Image
# # import cv2  # For preprocessing if needed

# # reader = easyocr.Reader(['en'])  # English; add 'hi' for Hindi if needed

# # def extract_prescription_text(image_path: str) -> str:
# #     # Read text with bounding boxes/confidence
# #     results = reader.readtext(image_path)
    
# #     # Combine extracted text
# #     full_text = ' '.join([text for (bbox, text, conf) in results if conf > 0.5])
# #     return full_text

# # # Usage
# # text = extract_prescription_text('prescription1.jpg')
# # print(text)  # Outputs: "Patient Name: John Doe Drug: Lipitor 10mg Dosage: Daily..."


# # ***************************************************************************************************8888888888888

# import easyocr
# import typing as t
# from langchain_ollama import OllamaLLM

# reader = easyocr.Reader(['en'])

# def extract_structured_prescription(image_path: str):
#     results: list = reader.readtext(image_path, detail=1)  # detail=1 ensures [bbox, text, conf] [web:53]
    
#     # Type-safe filtering: Extract conf as float
#     confidences = []
#     raw_texts = []
    
#     for detection in results:
#         if len(detection) == 3 and isinstance(detection[2], (int, float)):
#             bbox, text, conf = detection
#             if conf > 0.5:  # Now type-safe
#                 raw_texts.append(text)
#             confidences.append(float(conf))  # Explicit cast
    
#     raw_text = ' '.join(raw_texts)
#     avg_conf = sum(confidences) / len(confidences) if confidences else 0.0
    
#     # LLM structuring (unchanged)
#     llm = OllamaLLM(model="llama3.2")
#     reader = easyocr.Reader(['en'])
#     # ... rest of LLM code ...
#     STRUCTURE_PROMPT = """
# Extract prescription details from this OCR text into JSON format.
# Focus on: patient_name, drug_name, dosage, quantity, instructions, doctor_name, date.

# Raw OCR text: {ocr_text}

# Return ONLY valid JSON:
# {{
#   "patient_name": "...",
#   "drug_name": "...", 
#   "dosage": "...",
#   "quantity": "...",
#   "instructions": "...",
#   "doctor_name": "...",
#   "date": "...",
#   "allergies": null
# }}
# """
    
#     return {
#         "raw_ocr": raw_text,
#         "structured_prescription": prescription,
#         "confidence": avg_conf
#     }
