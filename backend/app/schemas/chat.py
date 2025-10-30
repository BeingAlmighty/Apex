from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from typing import Optional, Any, List


class ChatMessageBase(BaseModel):
    """
    Base chat message schema.
    """
    content: str


class ChatMessageCreate(ChatMessageBase):
    """
    Schema for creating a chat message.
    """
    pass


class ChatMessageRead(ChatMessageBase):
    """
    Schema for chat message response (LEGACY - for backward compatibility).
    """
    message_id: UUID
    user_id: UUID
    sender: str  # "user" or "ai"
    created_at: datetime
    analysis_data: Optional[dict[str, Any]] = None
    
    class Config:
        from_attributes = True


class ChatRequest(BaseModel):
    """
    Schema for chat API request.
    """
    message: str
    chat_id: Optional[UUID] = None  # Optional - will create new chat if not provided


class ChatResponse(BaseModel):
    """
    Schema for chat API response.
    """
    message: str
    chat_id: UUID
    message_id: UUID
    analysis_data: Optional[dict[str, Any]] = None


# New schemas for the recommended structure
class MessageBase(BaseModel):
    """Base message schema"""
    content: str


class MessageCreate(MessageBase):
    """Schema for creating a message"""
    pass


class MessageRead(MessageBase):
    """Schema for reading a message"""
    message_id: UUID
    chat_id: UUID
    sender: str  # "USER" or "AI"
    created_at: datetime
    analysis_data: Optional[dict[str, Any]] = None
    
    class Config:
        from_attributes = True


class ChatBase(BaseModel):
    """Base chat schema"""
    context_summary: Optional[str] = None
    chat_metadata: Optional[dict[str, Any]] = None


class ChatCreate(ChatBase):
    """Schema for creating a chat session"""
    pass


class ChatRead(ChatBase):
    """Schema for reading a chat session"""
    chat_id: UUID
    user_id: UUID
    started_at: datetime
    ended_at: Optional[datetime] = None
    messages: List[MessageRead] = []
    
    class Config:
        from_attributes = True


class ChatSummary(BaseModel):
    """Schema for chat session summary (without messages)"""
    chat_id: UUID
    user_id: UUID
    started_at: datetime
    ended_at: Optional[datetime] = None
    context_summary: Optional[str] = None
    message_count: int = 0
    
    class Config:
        from_attributes = True
