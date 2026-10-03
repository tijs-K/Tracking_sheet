from sqlalchemy import Column, Integer, String, Text
from database import Base



class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    company = Column(String, nullable=False)
    position = Column(String, nullable=False)
    date_applied = Column(String, default="")
    status = Column(String, default="Applied")
    url = Column(String, default="")
    salary_range = Column(String, default="")
    notes = Column(Text, default="")