from langchain_ollama import ChatOllama
from langchain_core.messages import SystemMessage, HumanMessage
from pydantic import BaseModel, Field
from typing import Annotated
from operator import add

class PharmacistResponse(BaseModel):
    medicines: list[str] = Field(description="List of medicine names extracted from the user's query")

messages = [SystemMessage(content="You are an expert in finding keywords within given string. Find the keywords in th egiven string and return only those keywords"), HumanMessage(content="I need vitamin D")]
llm = ChatOllama(model="llama3.2")
print(llm.invoke(messages))