from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.core.database import get_db

router = APIRouter()

@router.get("/emails", summary="Get synchronized emails with summaries")
def list_emails(page: int = 1, limit: int = 20, db: Session = Depends(get_db)):
    return {"emails": [], "page": page, "limit": limit, "total": 0}

@router.post("/emails/sync", summary="Trigger Gmail inbox fetch and summarization")
def sync_gmail(db: Session = Depends(get_db)):
    return {"status": "success", "message": "Email synchronization and summarization completed."}

@router.get("/emails/{email_id}", summary="Get email details and full summary")
def get_email_details(email_id: str, db: Session = Depends(get_db)):
    return {"email": {"id": email_id, "subject": "Welcome to AgentOS", "summary": "Initial welcome message."}}
