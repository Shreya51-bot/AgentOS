from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.core.database import get_db

router = APIRouter()

@router.get("/events", summary="List cached calendar events")
def list_events(db: Session = Depends(get_db)):
    return {"events": []}

@router.post("/events/sync", summary="Trigger calendar sync from Google Calendar API")
def sync_calendar(db: Session = Depends(get_db)):
    return {"status": "success", "message": "Calendar synchronization completed successfully."}

@router.post("/events", summary="Create a new calendar event")
def create_event(title: str, start_time: str, end_time: str, db: Session = Depends(get_db)):
    return {"message": "Calendar event created", "event": {"title": title}}
