from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from schemas import (
    ApplicationCreate,
    ApplicationResponse,
    ApplicationUpdate,
    InterviewLogCreate,
    InterviewLogResponse,
    HiringContactCreate,
    HiringContactResponse,
    ProcessTimelineEventCreate,
    ProcessTimelineEventResponse,
)
from database import engine, get_db
import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_app_or_404(application_id: int, db: Session) -> models.Application:
    app_record = db.query(models.Application).filter(models.Application.id == application_id).first()
    if not app_record:
        raise HTTPException(status_code=404, detail="Application not found")
    return app_record


@app.get("/api/applications", response_model=list[ApplicationResponse])
def get_applications(db: Session = Depends(get_db)):
    return db.query(models.Application).all()


@app.get("/api/applications/{application_id}", response_model=ApplicationResponse)
def get_application(application_id: int, db: Session = Depends(get_db)):
    return get_app_or_404(application_id, db)


@app.post("/api/applications", response_model=ApplicationResponse)
def create_application(application: ApplicationCreate, db: Session = Depends(get_db)):
    new_app = models.Application(**application.model_dump())
    db.add(new_app)
    db.commit()
    db.refresh(new_app)
    return new_app


@app.put("/api/applications/{application_id}", response_model=ApplicationResponse)
def update_application(
    application_id: int,
    application: ApplicationUpdate,
    db: Session = Depends(get_db),
):
    app_record = get_app_or_404(application_id, db)
    for key, value in application.model_dump(exclude_unset=True).items():
        setattr(app_record, key, value)
    db.commit()
    db.refresh(app_record)
    return app_record


@app.post("/api/applications/{application_id}/interview-logs", response_model=InterviewLogResponse)
def add_interview_log(application_id: int, log: InterviewLogCreate, db: Session = Depends(get_db)):
    get_app_or_404(application_id, db)
    new_log = models.InterviewLog(application_id=application_id, **log.model_dump())
    db.add(new_log)
    db.commit()
    db.refresh(new_log)
    return new_log


@app.post("/api/applications/{application_id}/contacts", response_model=HiringContactResponse)
def add_hiring_contact(application_id: int, contact: HiringContactCreate, db: Session = Depends(get_db)):
    get_app_or_404(application_id, db)
    new_contact = models.HiringContact(application_id=application_id, **contact.model_dump())
    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)
    return new_contact


@app.post("/api/applications/{application_id}/timeline", response_model=ProcessTimelineEventResponse)
def add_timeline_event(application_id: int, event: ProcessTimelineEventCreate, db: Session = Depends(get_db)):
    get_app_or_404(application_id, db)
    new_event = models.ProcessTimelineEvent(application_id=application_id, **event.model_dump())
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event
