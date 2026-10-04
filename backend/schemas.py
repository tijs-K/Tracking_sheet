from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel

class ApplicationBase(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )
    company: str
    position: str
    date_applied: str = ""
    salary_range: str = ""
    status: str = "Applied"
    url: str = ""
    notes: str = ""
class ApplicationCreate(ApplicationBase):
    pass


class ApplicationResponse(ApplicationBase):
    id: int