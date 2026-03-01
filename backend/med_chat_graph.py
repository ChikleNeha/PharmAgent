import pandas as pd
import uvicorn
import asyncio
from contextlib import asynccontextmanager
from typing import AsyncGenerator, cast

from fastapi import FastAPI, Body
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.graph import MessagesState, StateGraph, START, END
from langgraph.checkpoint.sqlite.aio import AsyncSqliteSaver
from langchain_core.runnables import RunnableConfig

# --- 1. DATA & MODEL SETUP ---
df = pd.read_excel("data/eng-products-export.xlsx")
# Temperature 0.4 makes the "Medicine" persona more natural and less robotic
llm = ChatOllama(model="llama3.2", temperature=0.4)

# --- 2. THE FRIENDLY MEDICINE NODE ---
async def call_medicine_persona(state: MessagesState, config: RunnableConfig):
    pzn = config["configurable"].get("pzn")
    
    med_rows = df[df['pzn'] == pzn]
    if med_rows.empty:
        return {"messages": [("ai", "I'm so sorry, I can't find my own details!")]}
    
    med = med_rows.iloc[0]
    
    system_prompt = SystemMessage(content=f"""
    ROLE: You ARE the medicine '{med['product name']}'. 
    PERSONALITY: Warm, empathetic, first-person ("I", "me").
    CONTEXT: {med['descriptions']}
    INSTRUCTION: Introduce yourself as the medicine and help the user.
    """)
    
    # Node logic
    response = await llm.ainvoke([system_prompt] + state["messages"])
    return {"messages": [response]}

# --- 3. GRAPH CONSTRUCTION ---
workflow = StateGraph(MessagesState)
workflow.add_node("medicine", call_medicine_persona)
workflow.add_edge(START, "medicine")
workflow.add_edge("medicine", END)

# --- 4. FASTAPI LIFESPAN & ASYNC MEMORY ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    # AsyncSqliteSaver is REQUIRED for streaming + memory
    async with AsyncSqliteSaver.from_conn_string("./medicine_chats.db") as saver:
        app.state.chat_app = workflow.compile(checkpointer=saver)
        yield

app = FastAPI(lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# --- 5. THE STREAMING ENDPOINT (The "Gemini" Effect) ---
@app.post("/chat")
async def chat_with_medicine(
    pzn: int = Body(...), 
    message: str = Body(...), 
    user_id: str = Body(...)
):
    # This is the "Generator" that feeds the stream
    async def stream_tokens() -> AsyncGenerator[str, None]:
        config = cast(RunnableConfig, {"configurable": {"thread_id": user_id, "pzn": pzn}})
        inputs = {"messages": [HumanMessage(content=message)]}
        
        chat_app = app.state.chat_app
        
        # We iterate over the stream
        async for chunk, metadata in chat_app.astream(inputs, config, stream_mode="messages"):
            # Check if the chunk has content (Ollama sends it this way)
            if hasattr(chunk, "content") and chunk.content:
                yield chunk.content
                # Optional: tiny sleep to make it look "human" if the local LLM is too fast
                # await asyncio.sleep(0.01) 

    return StreamingResponse(stream_tokens(), media_type="text/plain")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)