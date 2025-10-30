from pydantic import BaseModel, EmailStr
from datetime import datetime
from uuid import UUID


class UserBase(BaseModel):
    """
    Base user schema with common attributes.
    """
    email: EmailStr
    full_name: str | None = None


class UserCreate(UserBase):
    """
    Schema for user registration.
    """
    password: str


class UserRead(UserBase):
    """
    Schema for user response (without sensitive data).
    """
    user_id: UUID
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class UserInDB(UserBase):
    """
    Schema for user in database (includes hashed password).
    """
    user_id: UUID
    hashed_password: str
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
