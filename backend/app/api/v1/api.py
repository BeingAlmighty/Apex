from fastapi import APIRouter
from app.api.v1.endpoints import login, users, chat, analysis

api_router = APIRouter()

# Include all endpoint routers with their prefixes and tags
api_router.include_router(login.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(chat.router, prefix="/chat", tags=["Chat"])
api_router.include_router(analysis.router, prefix="/analysis", tags=["Analysis"])
