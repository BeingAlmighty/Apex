from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from app.db.session import get_db
from app.db.models import User, Chat, Message, ChatMessage, MessageSender
from app.schemas.chat import (
    ChatMessageRead, ChatRequest, ChatResponse,
    ChatRead, ChatSummary, MessageRead
)
from app.api.v1.endpoints.users import get_current_user

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def send_chat_message(
    chat_request: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Send a chat message and get AI response.
    
    This endpoint supports the new chat session model.
    - If chat_id is provided, adds message to existing chat
    - If chat_id is not provided, creates a new chat session
    
    - **message**: The user's message to send
    - **chat_id**: Optional - existing chat session ID
    
    Returns the AI's response along with chat_id and message_id.
    """
    # Get or create chat session
    if chat_request.chat_id:
        chat = db.query(Chat).filter(
            Chat.chat_id == chat_request.chat_id,
            Chat.user_id == current_user.user_id
        ).first()
        if not chat:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Chat session not found"
            )
    else:
        # Create new chat session
        chat = Chat(
            user_id=current_user.user_id,
            chat_metadata={"channel": "web", "topic": "career_guidance"}
        )
        db.add(chat)
        db.commit()
        db.refresh(chat)
    
    # Save user message
    user_message = Message(
        chat_id=chat.chat_id,
        sender="USER",
        content=chat_request.message
    )
    db.add(user_message)
    db.commit()
    
    # TODO: Integrate with your AI/LLM logic here
    ai_response_text = f"AI response to: {chat_request.message}"
    
    # Example analysis data
    analysis_data = {
        "skill_gaps": [
            {"skill": "Python", "current_level": 3, "target_level": 5},
            {"skill": "Machine Learning", "current_level": 2, "target_level": 4}
        ],
        "roi_calculation": {
            "investment": 5000,
            "expected_return": 25000,
            "roi_percentage": 400
        }
    }
    
    # Save AI response
    ai_message = Message(
        chat_id=chat.chat_id,
        sender="AI",
        content=ai_response_text,
        analysis_data=analysis_data
    )
    db.add(ai_message)
    db.commit()
    db.refresh(ai_message)
    
    return ChatResponse(
        message=ai_response_text,
        chat_id=chat.chat_id,
        message_id=ai_message.message_id,
        analysis_data=analysis_data
    )


@router.get("/chat-history", response_model=List[ChatMessageRead])
async def get_chat_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    limit: int = 50
):
    """
    LEGACY ENDPOINT: Get flat chat history for the current user.
    
    This endpoint maintains backward compatibility with the old schema.
    For new implementations, use /chats endpoint instead.
    
    - **limit**: Maximum number of messages to return (default: 50)
    
    Returns a flat list of chat messages ordered by creation time.
    """
    messages = db.query(ChatMessage)\
        .filter(ChatMessage.user_id == current_user.user_id)\
        .order_by(ChatMessage.created_at.desc())\
        .limit(limit)\
        .all()
    
    return messages


@router.get("/chats", response_model=List[ChatSummary])
async def get_user_chats(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    limit: int = 20
):
    """
    Get all chat sessions for the current user.
    
    Returns a list of chat sessions with summary information.
    
    - **limit**: Maximum number of chats to return (default: 20)
    """
    chats = db.query(Chat)\
        .filter(Chat.user_id == current_user.user_id)\
        .order_by(Chat.started_at.desc())\
        .limit(limit)\
        .all()
    
    # Build summary with message count
    chat_summaries = []
    for chat in chats:
        message_count = db.query(Message).filter(Message.chat_id == chat.chat_id).count()
        chat_summaries.append(ChatSummary(
            chat_id=chat.chat_id,
            user_id=chat.user_id,
            started_at=chat.started_at,
            ended_at=chat.ended_at,
            context_summary=chat.context_summary,
            message_count=message_count
        ))
    
    return chat_summaries


@router.get("/chats/{chat_id}", response_model=ChatRead)
async def get_chat_by_id(
    chat_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get a specific chat session with all messages.
    
    - **chat_id**: The chat session ID
    
    Returns the chat session with all messages.
    """
    chat = db.query(Chat).filter(
        Chat.chat_id == chat_id,
        Chat.user_id == current_user.user_id
    ).first()
    
    if not chat:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat session not found"
        )
    
    return chat


@router.delete("/chats/{chat_id}")
async def delete_chat(
    chat_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Delete a chat session and all its messages.
    
    - **chat_id**: The chat session ID
    """
    chat = db.query(Chat).filter(
        Chat.chat_id == chat_id,
        Chat.user_id == current_user.user_id
    ).first()
    
    if not chat:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Chat session not found"
        )
    
    db.delete(chat)
    db.commit()
    
    return {"message": "Chat session deleted successfully"}
