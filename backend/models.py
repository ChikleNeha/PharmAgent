from typing import TypedDict, Literal, Annotated
from sqlalchemy import create_engine, Column, Integer, String, JSON, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import operator

class WorkflowState(TypedDict):
    input_data: str
    prescription_details: dict
    compliance_pass: bool
    drug_available: bool
    risk_level: Literal["low", "medium", "high"] | None
    notifications: Annotated[list[str], operator.add]
    updates: Annotated[list[str], operator.add]

# SQLite DB
Base = declarative_base()
engine = create_engine('sqlite:///pharmacy.db')
SessionLocal = sessionmaker(bind=engine)

class WorkflowLog(Base):
    __tablename__ = 'workflows'
    id = Column(Integer, primary_key=True)
    state = Column(JSON)
    timestamp = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(engine)
