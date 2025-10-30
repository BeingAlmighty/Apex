import uuid
from sqlalchemy import Column, String, Boolean, DateTime, Text, ForeignKey, Enum, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.db.base import Base


class MessageSender(str, enum.Enum):
    """Enum for message sender type"""
    USER = "USER"
    AI = "AI"


class User(Base):
    """
    User model for authentication and user management.
    """
    __tablename__ = "users"
    
    user_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    chats = relationship("Chat", back_populates="user", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<User {self.email}>"


class Chat(Base):
    """
    Chat session model for storing conversation sessions.
    Each chat represents a conversation session between user and AI.
    """
    __tablename__ = "chats"
    
    chat_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    started_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    ended_at = Column(DateTime, nullable=True)
    
    # AI-generated summary of the conversation
    context_summary = Column(Text, nullable=True)
    
    # JSONB column for storing extra metadata
    # Example: {"topic": "career advice", "intent": "skill gap analysis", "channel": "web"}
    # Note: using 'chat_metadata' instead of 'metadata' to avoid SQLAlchemy reserved name
    chat_metadata = Column(JSONB, nullable=True)
    
    # Relationships
    user = relationship("User", back_populates="chats")
    messages = relationship("Message", back_populates="chat", cascade="all, delete-orphan", order_by="Message.created_at")
    
    def __repr__(self):
        return f"<Chat {self.chat_id} - User {self.user_id}>"


class Message(Base):
    """
    Message model for storing individual messages within a chat session.
    """
    __tablename__ = "messages"
    
    message_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    chat_id = Column(UUID(as_uuid=True), ForeignKey("chats.chat_id", ondelete="CASCADE"), nullable=False)
    sender = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # JSONB column for storing structured AI analysis data
    # Example: {"skills": [...], "roi": {...}, "sentiment": "positive", "skill_gaps": [...]}
    analysis_data = Column(JSONB, nullable=True)
    
    # Relationships
    chat = relationship("Chat", back_populates="messages")
    
    # Add constraint to ensure sender is either 'USER' or 'AI'
    __table_args__ = (
        CheckConstraint("sender IN ('USER', 'AI')", name='check_sender_type'),
    )
    
    def __repr__(self):
        return f"<Message {self.message_id} from {self.sender}>"


# Legacy model - kept for backward compatibility, will be deprecated
class ChatMessage(Base):
    """
    DEPRECATED: Legacy chat message model.
    Use Chat and Message models instead for new implementations.
    """
    __tablename__ = "chat_messages"
    
    message_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False)
    content = Column(Text, nullable=False)
    sender = Column(Enum(MessageSender), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    analysis_data = Column(JSONB, nullable=True)
    
    def __repr__(self):
        return f"<ChatMessage {self.message_id} from {self.sender}>"
