from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.core.database import get_db

router = APIRouter()

@router.get("/login/google", summary="Redirect to Google OAuth consent page")
def login_google():
    return {"login_url": "https://accounts.google.com/o/oauth2/v2/auth?..."}

@router.get("/callback", summary="Google OAuth callback URL")
def google_callback(code: str, db: Session = Depends(get_db)):
    return {"message": "Google Authentication successful", "access_token": "stub_access_token"}

@router.get("/session", summary="Retrieve active user session details")
def get_session():
    return {"user": {"email": "user@example.com", "name": "AgentOS User", "profile_pic": ""}}

@router.post("/logout", summary="Logout current session")
def logout():
    return {"message": "Logged out successfully"}
