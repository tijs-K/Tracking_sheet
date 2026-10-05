from sqlalchemy import Column, Integer, String, Text, ForeignKey, Boolean
from sqlalchemy.orm import relationship
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

    interview_log = relationship("InterviewLog", back_populates="application", cascade="all, delete-orphan")
    hiring_contacts = relationship("HiringContact", back_populates="application", cascade="all, delete-orphan")
    process_timeline = relationship("ProcessTimelineEvent", back_populates="application", cascade="all, delete-orphan")

class InterviewLog(Base):
    __tablename__ = "interview_logs"
    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("applications.id"), nullable=False)
    date = Column(String, default="")
    type = Column(String, default="")
    notes = Column(Text, default="")
    application = relationship("Application", back_populates="interview_log")
class HiringContact(Base):
    __tablename__ = "hiring_contacts"
    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("applications.id"), nullable=False)
    name = Column(String, default="")
    role = Column(String, default="")
    email = Column(String, default="")
    application = relationship("Application", back_populates="hiring_contacts")
class ProcessTimelineEvent(Base):
    __tablename__ = "process_timeline_events"
    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("applications.id"), nullable=False)
    label = Column(String, default="")
    date = Column(String, default="")
    completed = Column(Boolean, default=False)
    application = relationship("Application", back_populates="process_timeline")

  