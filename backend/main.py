from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from schemas import ApplicationCreate, ApplicationResponse 
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

@app.get("/api/applications", response_model=list[ApplicationResponse])
def get_applications(db: Session = Depends(get_db)):
    return db.query(models.Application).all()

@app.get("/api/applications/{application_id}", response_model=ApplicationResponse)
def get_application(application_id: int, db: Session = Depends(get_db)):
    application = db.query(models.Application).filter(models.Application.id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    return application

@app.post("/api/applications", response_model=ApplicationResponse)
def create_application(application: ApplicationCreate, db: Session = Depends(get_db)):
    new_app = models.Application(
        company=application.company,
        position=application.position,
        url=application.url,
        salary_range=application.salary_range,
        date_applied=application.date_applied,
        status=application.status,
        notes=application.notes,
    )
    db.add(new_app)
    db.commit()
    db.refresh(new_app)
    return new_app

@app.put("/api/applications/{application_id}", response_model=ApplicationResponse)
def update_application_status(application_id: int, status: str, db: Session = Depends(get_db)):
    app_record = db.query(models.Application).filter(models.Application.id == application_id).first()
    if not app_record:
        raise HTTPException(status_code=404, detail="Application not found")
    
    app_record.status = status
    db.commit()
    db.refresh(app_record)
    return app_record
