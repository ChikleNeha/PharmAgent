import os
import pandas as pd
from langchain_community.document_loaders import DataFrameLoader
from langchain_community.vectorstores import Chroma
from langchain_ollama import OllamaEmbeddings
from langchain_text_splitters import CharacterTextSplitter

# 1. Load your Excel Data
df = pd.read_csv("eng-products-export.xlsx - Products.csv")

# Create a 'combined_info' column for better search matching
df['combined_info'] = df.apply(lambda x: f"Product: {x['product name']} | Price: {x['price rec']} | PZN: {x['pzn']} | Description: {x['descriptions']}", axis=1)

# 2. Convert to LangChain Documents
loader = DataFrameLoader(df, page_content_column="combined_info")
docs = loader.load()

# 3. Create Vector Store (using Ollama Embeddings)
# Note: Ensure you have run 'ollama pull llama3.2' and 'ollama pull mxbai-embed-large'
embeddings = OllamaEmbeddings(model="mxbai-embed-large")
vectorstore = Chroma.from_documents(documents=docs, embedding=embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})