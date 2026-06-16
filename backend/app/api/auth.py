from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
import httpx
from datetime import datetime, timedelta, timezone
from urllib.parse import urlencode

from backend.app.core.database import get_db
from backend.app.core.config import settings
from backend.app.core.security import encrypt_token
from backend.app.models import User, GoogleCredential

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


# Phase 2: Google OAuth Router (mounted without prefix in main.py)
google_router = APIRouter(prefix="/auth/google")

@google_router.get("/login", summary="Redirect to Google OAuth consent page")
def login_google_oauth():
    if not settings.GOOGLE_CLIENT_ID or not settings.GOOGLE_CLIENT_SECRET:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Google OAuth client ID or client secret is not configured."
        )
    
    # Scopes required to fetch basic user profile
    scopes = [
        "openid",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
    ]
    
    params = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "redirect_uri": settings.GOOGLE_REDIRECT_URI,
        "response_type": "code",
        "scope": " ".join(scopes),
        "access_type": "offline",
        "prompt": "consent"
    }
    
    auth_url = f"https://accounts.google.com/o/oauth2/v2/auth?{urlencode(params)}"
    return RedirectResponse(url=auth_url)

@google_router.get("/callback", summary="Google OAuth callback URL")
async def google_callback_oauth(code: str = None, error: str = None, db: Session = Depends(get_db)):
    if error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Google OAuth error: {error}"
        )
    if not code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Authorization code was not provided."
        )
        
    if not settings.GOOGLE_CLIENT_ID or not settings.GOOGLE_CLIENT_SECRET:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Google OAuth credentials not configured."
        )

    # 1. Exchange authorization code for tokens
    token_url = "https://oauth2.googleapis.com/token"
    token_data = {
        "code": code,
        "client_id": settings.GOOGLE_CLIENT_ID,
        "client_secret": settings.GOOGLE_CLIENT_SECRET,
        "redirect_uri": settings.GOOGLE_REDIRECT_URI,
        "grant_type": "authorization_code"
    }
    
    async with httpx.AsyncClient() as client:
        try:
            token_response = await client.post(token_url, data=token_data)
            token_response.raise_for_status()
        except httpx.HTTPStatusError as exc:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to retrieve token from Google: {exc.response.text}"
            )
        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error exchanging authorization code: {str(exc)}"
            )
            
        tokens = token_response.json()
        access_token = tokens.get("access_token")
        refresh_token = tokens.get("refresh_token")
        token_type = tokens.get("token_type")
        expires_in = tokens.get("expires_in", 3600)
        scopes_returned = tokens.get("scope", "").split(" ") if tokens.get("scope") else []
        
        if not access_token:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Google did not return an access token."
            )
            
        # 2. Fetch user profile from Google UserInfo endpoint
        userinfo_url = "https://www.googleapis.com/oauth2/v3/userinfo"
        headers = {"Authorization": f"Bearer {access_token}"}
        try:
            userinfo_response = await client.get(userinfo_url, headers=headers)
            userinfo_response.raise_for_status()
        except httpx.HTTPStatusError as exc:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Failed to fetch user profile from Google: {exc.response.text}"
            )
        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error retrieving user profile: {str(exc)}"
            )
            
        user_profile = userinfo_response.json()
        email = user_profile.get("email")
        name = user_profile.get("name")
        picture = user_profile.get("picture")
        
        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User email was not provided in the Google profile."
            )
            
        # 3. Save or update User details in the database
        user = db.query(User).filter(User.email == email).first()
        if not user:
            user = User(
                email=email,
                name=name,
                profile_pic=picture
            )
            db.add(user)
            db.flush()  # Generate user.id
        else:
            user.name = name
            user.profile_pic = picture
            db.add(user)
            
        # 4. Save or update Google Credentials in the database
        expires_at = datetime.now(timezone.utc) + timedelta(seconds=expires_in)
        existing_credential = db.query(GoogleCredential).filter(GoogleCredential.user_id == user.id).first()
        
        final_refresh_token = None
        if refresh_token:
            final_refresh_token = encrypt_token(refresh_token)
        elif existing_credential:
            final_refresh_token = existing_credential.refresh_token
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No refresh token returned by Google and no existing credentials found. Please re-authenticate."
            )
            
        if existing_credential:
            existing_credential.access_token = access_token
            if refresh_token:
                existing_credential.refresh_token = final_refresh_token
            existing_credential.token_type = token_type
            existing_credential.scopes = scopes_returned
            existing_credential.expires_at = expires_at
            db.add(existing_credential)
        else:
            db_credential = GoogleCredential(
                user_id=user.id,
                access_token=access_token,
                refresh_token=final_refresh_token,
                token_type=token_type,
                scopes=scopes_returned,
                expires_at=expires_at
            )
            db.add(db_credential)
            
        db.commit()
        
        return {
            "email": email,
            "name": name
        }
