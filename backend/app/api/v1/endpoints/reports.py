from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.models.domain import Report
from app.schemas.schemas import ReportOut

router = APIRouter()

@router.get("", response_model=List[ReportOut])
def get_reports(db: Session = Depends(get_db)):
    return db.query(Report).order_by(Report.created_at.desc()).all()

@router.post("/export")
def generate_report(report_type: str, date_range: str, title: str, db: Session = Depends(get_db)):
    new_report = Report(
        title=title or f"{report_type.capitalize()} Intelligence Report",
        report_type=report_type,
        date_range=date_range,
        generated_by="Admin User",
        file_url=f"/downloads/reports/{report_type}_export.pdf"
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return new_report
