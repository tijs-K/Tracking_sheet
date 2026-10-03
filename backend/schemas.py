from pydantic import BaseModel


class ApplicationCreate(BaseModel):
    company: str
    position: str
    date_applied: str = ""
    status: str = "Applied"
    url: str = ""
    salary_range: str = ""
    notes: str = ""