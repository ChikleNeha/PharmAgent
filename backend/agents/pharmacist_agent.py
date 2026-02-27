from sqlalchemy import create_engine
from langchain_community.utilities.sql_database import SQLDatabase

from langchain_ollama import ChatOllama
from langchain_community.agent_toolkits.sql.toolkit import SQLDatabaseToolkit



# point this to your local SQLite file
DB_URI = "sqlite:///../database/d1.db"
engine = create_engine(DB_URI, connect_args={"check_same_thread": False})

db = SQLDatabase.from_uri(DB_URI)


llm = ChatOllama(
    model="llama3.2",
    temperature=0.2,
    format="json"
)

toolkit = SQLDatabaseToolkit(db=db, llm=llm)
tools = toolkit.get_tools()

from langchain_community.agent_toolkits.sql.base import create_sql_agent

agent = create_sql_agent(
    llm=llm,
    toolkit=toolkit,
    agent_type="tool-calling",   # this is recommended
    verbose=True
)

query = {"input": "Show medicines related to pain relief from the inventory"}
result = agent.invoke(query)
print(result)