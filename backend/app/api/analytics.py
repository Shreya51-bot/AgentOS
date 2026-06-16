from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.core.database import get_db

router = APIRouter()

@router.get("/metrics", summary="Get productivity and volume analytics")
def get_metrics(db: Session = Depends(get_db)):
    return {
        "email_volume": {"received": 12, "summarized": 12},
        "task_completion": {"completed": 4, "pending": 8},
        "meeting_time": {"minutes": 180}
    }

@router.get("/briefing", summary="Retrieve latest daily briefing markdown")
def get_latest_briefing(db: Session = Depends(get_db)):
    return {
        "briefing_date": "2026-06-16",
        "content": "# Good morning!\n\nHere is your daily update. You have 3 meetings and 5 urgent emails today."
    }
