import faster_whisper
import sounddevice as sd
import numpy as np
import queue
import threading
import asyncio
from pharmacist_agent import pharmacist_agent

model = faster_whisper.WhisperModel("small", device="cpu", compute_type="int8")
audio_queue = queue.Queue()

def audio_callback(indata, frames, time, status):
    audio_queue.put(indata.copy())

async def start_voice_listening():
    print("🎤 Voice input ready. Speak prescriptions...")
    with sd.InputStream(samplerate=16000, channels=1, callback=audio_callback):
        while True:
            audio = audio_queue.get()
            segments, _ = model.transcribe(audio, vad_filter=True)
            text = " ".join([s.text.strip() for s in segments])
            
            if len(text) > 3:
                result = pharmacist_agent({"input_data": text})
                print(f"💊 Pharmacist: {result['prescription_details']}")

if __name__ == "__main__":
    asyncio.run(start_voice_listening())
