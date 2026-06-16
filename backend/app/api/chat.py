from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.core.database import get_db

router = APIRouter()

@router.get("/sessions", summary="List user's active chat conversations")
def list_sessions(db: Session = Depends(get_db)):
    return {"sessions": []}

@router.post("/sessions", summary="Create a new chat conversation session")
def create_session(title: str = "New Chat", db: Session = Depends(get_db)):
    return {"status": "success", "session": {"title": title}}

@router.get("/sessions/{session_id}/messages", summary="Retrieve message history for a session")
def get_chat_history(session_id: str, db: Session = Depends(get_db)):
    return {"messages": []}

@router.post("/sessions/{session_id}/messages", summary="Send message to Copilot assistant")
def send_message(session_id: str, message: str, db: Session = Depends(get_db)):
    return {
        "user_message": message,
        "assistant_response": "I am your AI Copilot helper. This is a skeleton response."
    }
