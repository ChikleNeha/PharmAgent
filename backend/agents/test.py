from langchain_ollama import ChatOllama

llm = ChatOllama(model="llama3.2")
print(llm.invoke("What is the capital of France?") )