import os
from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

# Resolve the absolute path to the backend/.env file
base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
env_file_path = os.path.join(base_dir, ".env")

class Settings(BaseSettings):
    PROJECT_NAME: str = "AgentOS"
    API_V1_STR: str = "/api/v1"
    
    # Database configuration
    # Note: postgresql://user:pass@host:port/db
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/agentos"
    
    # JWT authentication settings
    JWT_SECRET: str = "super_secret_jwt_key_please_change_in_production_1234567890"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 1 week
    
    # Encryption key for securing refresh tokens (Fernet key format)
    # Generate one using: cryptography.fernet.Fernet.generate_key().decode()
    ENCRYPTION_KEY: str = "zJ6EwY6hV3_aLks7X8vQ3E9fPz-a4S1T5V_mU7p4Wbc=" 
    
    # Google OAuth settings
    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""
    GOOGLE_REDIRECT_URI: str = "http://localhost:8000/api/v1/auth/callback"
    
    # Gemini API
    GEMINI_API_KEY: str = ""
    
    # CORS origins
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
    ]
    
    model_config = SettingsConfigDict(
        env_file=env_file_path,
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

settings = Settings()
