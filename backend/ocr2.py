import pandas as pd
import easyocr
import numpy as np
from PIL import Image
import io
from thefuzz import process # For fuzzy matching

from fastapi import FastAPI, UploadFile, File, Body
from fastapi.responses import StreamingResponse
from contextlib import asynccontextmanager

# (Include your LangGraph and Message imports here)

# Initialize EasyOCR
reader = easyocr.Reader(['en']) 

# Load your medicine database
df = pd.read_excel("data/eng-products-export.xlsx")
# Create a list of all product names for fuzzy matching
ALL_PRODUCT_NAMES = df['product name'].tolist()

# --- 1. FUZZY EXTRACTION LOGIC ---
def find_best_med_match(raw_text: str):
    """
    Takes messy OCR text and finds the closest medicine name from Excel.
    """
    matches = []
    # Split OCR text into words to check each one
    words = raw_text.split()
    
    for word in words:
        if len(word) < 4: continue # Skip tiny words
        
        # Find the best match in our Excel list for this specific word
        # limit=1 returns the single best match
        best_match, score = process.extractOne(word, ALL_PRODUCT_NAMES)
        
        # If the match is > 80% certain, we consider it a hit
        if score > 80:
            med_data = df[df['product name'] == best_match].iloc[0]
            matches.append({
                "pzn": int(med_data['pzn']),
                "name": best_match,
                "confidence": score
            })
    
    # Remove duplicates
    return {v['pzn']: v for v in matches}.values()



# --- 3. THE FRIENDLY CHAT (Existing Logic) ---
# Use the PZN from 'identified_medicines' to start the chat here...