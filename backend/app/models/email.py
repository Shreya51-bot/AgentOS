import uuid
from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from backend.app.core.database import Base

class Email(Base):
    __tablename__ = "emails"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    google_message_id = Column(String(255), nullable=False)
    thread_id = Column(String(255), nullable=False)
    sender = Column(Text, nullable=False)
    recipient = Column(Text, nullable=False)
    subject = Column(Text, nullable=True)
    body_text = Column(Text, nullable=True)
    received_at = Column(DateTime(timezone=True), nullable=False)
    
    # Computed metadata fields
    summary = Column(Text, nullable=True)
    priority_score = Column(Integer, nullable=True) # 1-5
    urgency = Column(String(50), nullable=True) # Urgent, Normal, Low
    sentiment = Column(String(50), nullable=True)
    is_read = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="emails")
    tasks = relationship("Task", back_populates="source_email")
    chunks = relationship("DocumentChunk", back_populates="email", cascade="all, delete-orphan")
