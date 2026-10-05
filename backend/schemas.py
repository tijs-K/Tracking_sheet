from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class CamelModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )


class ApplicationBase(CamelModel):
    company: str
    position: str
    date_applied: str = ""
    salary_range: str = ""
    status: str = "Applied"
    url: str = ""
    notes: str = ""


class ApplicationCreate(ApplicationBase):
    pass


class ApplicationUpdate(CamelModel):
    company: str | None = None
    position: str | None = None
    date_applied: str | None = None
    salary_range: str | None = None
    status: str | None = None
    url: str | None = None
    notes: str | None = None


class InterviewLogBase(CamelModel):
    date: str = ""
    type: str = ""
    notes: str = ""


class InterviewLogCreate(InterviewLogBase):
    pass


class InterviewLogResponse(InterviewLogBase):
    id: int
    application_id: int


class HiringContactBase(CamelModel):
    name: str = ""
    role: str = ""
    email: str = ""


class HiringContactCreate(HiringContactBase):
    pass


class HiringContactResponse(HiringContactBase):
    id: int
    application_id: int


class ProcessTimelineEventBase(CamelModel):
    label: str = ""
    date: str = ""
    completed: bool = False


class ProcessTimelineEventCreate(ProcessTimelineEventBase):
    pass


class ProcessTimelineEventResponse(ProcessTimelineEventBase):
    id: int
    application_id: int


class ApplicationResponse(ApplicationBase):
    id: int
    interview_log: list[InterviewLogResponse] = []
    hiring_contacts: list[HiringContactResponse] = []
    process_timeline: list[ProcessTimelineEventResponse] = []
