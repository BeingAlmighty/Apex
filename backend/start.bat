@echo off
echo ========================================
echo Apex Career Navigator - Backend Setup
echo ========================================
echo.

echo [1/4] Installing Python dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo [2/4] Checking for .env file...
if not exist .env (
    echo Creating .env from template...
    copy .env.example .env
    echo.
    echo WARNING: Please edit .env file with your database credentials!
    echo Generate a secure SECRET_KEY using: openssl rand -hex 32
    echo.
    pause
)
echo.

echo [3/4] Setup complete!
echo.

echo [4/4] Starting FastAPI server...
echo Server will start at: http://localhost:8000
echo API Docs: http://localhost:8000/api/v1/docs
echo.

cd app
python main.py
