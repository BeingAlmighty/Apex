"""
Vercel serverless function entry point
"""
from app.main import app

# Vercel requires a handler variable
handler = app
