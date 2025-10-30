# Apex Career Navigator - Backend API

Professional FastAPI backend with PostgreSQL database and JWT authentication.

## 🏗️ Architecture

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/
│   │       │   ├── login.py       # Authentication endpoints
│   │       │   ├── users.py       # User management
│   │       │   ├── chat.py        # Chat functionality
│   │       │   └── analysis.py    # Career analysis endpoints
│   │       └── api.py             # Combines all routers
│   ├── core/
│   │   ├── config.py              # Application settings
│   │   └── security.py            # Password hashing & JWT
│   ├── db/
│   │   ├── base.py                # SQLAlchemy base
│   │   ├── models.py              # Database models
│   │   └── session.py             # Database session
│   ├── schemas/
│   │   ├── token.py               # JWT schemas
│   │   ├── user.py                # User schemas
│   │   └── chat.py                # Chat schemas
│   └── main.py                    # FastAPI app
├── requirements.txt               # Python dependencies
└── .env.example                   # Environment variables template
```

## 🚀 Quick Start

### Prerequisites

- Python 3.10+
- PostgreSQL 14+

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Setup PostgreSQL Database

```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE apex_db;

-- Create user (optional)
CREATE USER apex_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE apex_db TO apex_user;
```

### 3. Configure Environment Variables

```bash
# Copy example env file
cp .env.example .env

# Edit .env file with your settings
# Generate a secure secret key with:
# openssl rand -hex 32
```

### 4. Run the Server

```bash
cd app
python main.py
```

Or with uvicorn directly:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Server will start at: **http://localhost:8000**

API Documentation: **http://localhost:8000/api/v1/docs**

## 📚 API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/token` - Login (returns JWT token)
- `POST /api/v1/auth/logout` - Logout (clears cookie)

### Users (Protected)

- `GET /api/v1/users/me` - Get current user info

### Chat (Protected)

- `POST /api/v1/chat/chat` - Send chat message
- `GET /api/v1/chat/chat-history?limit=50` - Get chat history

### Analysis (Protected)

- `POST /api/v1/analysis/analyze-resume` - Analyze resume
- `POST /api/v1/analysis/skill-gap-analysis` - Analyze skill gaps
- `POST /api/v1/analysis/roi-calculation` - Calculate ROI

## 🔐 Authentication Flow

1. **Register**: `POST /api/v1/auth/register`
   ```json
   {
     "email": "user@example.com",
     "password": "securepassword",
     "full_name": "John Doe"
   }
   ```

2. **Login**: `POST /api/v1/auth/token`
   ```
   Form data:
   username: user@example.com
   password: securepassword
   ```
   Returns JWT token in HttpOnly cookie

3. **Access Protected Endpoints**: Token is automatically sent in cookie

4. **Logout**: `POST /api/v1/auth/logout`

## 💾 Database Models

### User
- `user_id` (UUID, Primary Key)
- `email` (String, Unique)
- `hashed_password` (String)
- `full_name` (String, Optional)
- `is_active` (Boolean)
- `created_at` (DateTime)

### ChatMessage
- `message_id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key → User)
- `content` (Text)
- `sender` (Enum: "user" | "ai")
- `analysis_data` (JSONB) - Stores complex analysis results
- `created_at` (DateTime)

## 🔧 Configuration

Edit `.env` file:

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/apex_db

# Security (Generate with: openssl rand -hex 32)
SECRET_KEY=your-super-secret-key-here

# CORS (Frontend URLs)
BACKEND_CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

## 🧪 Testing API

### Using cURL

```bash
# Register
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","full_name":"Test User"}'

# Login
curl -X POST http://localhost:8000/api/v1/auth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=test@example.com&password=test123" \
  -c cookies.txt

# Get current user (using saved cookies)
curl -X GET http://localhost:8000/api/v1/users/me \
  -b cookies.txt
```

### Using Interactive Docs

Visit: **http://localhost:8000/api/v1/docs**

- Swagger UI with "Try it out" functionality
- Built-in authentication support

## 📦 Dependencies

- **FastAPI** - Modern web framework
- **Uvicorn** - ASGI server
- **SQLAlchemy** - ORM for database
- **PostgreSQL** - Database (psycopg2-binary driver)
- **python-jose** - JWT token creation/verification
- **passlib** - Password hashing with bcrypt
- **Alembic** - Database migrations (to be configured)
- **Pydantic** - Data validation

## 🔄 Database Migrations (Future)

To set up Alembic migrations:

```bash
# Initialize Alembic
alembic init alembic

# Edit alembic.ini and alembic/env.py
# Then create initial migration
alembic revision --autogenerate -m "Initial tables"

# Apply migration
alembic upgrade head
```

## 🛡️ Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ HttpOnly cookies (prevents XSS)
- ✅ CORS configuration
- ✅ SQL injection protection (SQLAlchemy ORM)
- ✅ Token expiration (7 days default)

## 🚧 TODO

- [ ] Implement resume parsing logic
- [ ] Add skill gap analysis algorithm
- [ ] Implement ROI calculation logic
- [ ] Add email verification
- [ ] Set up Alembic migrations
- [ ] Add rate limiting
- [ ] Add OAuth2 (Google/LinkedIn)
- [ ] Add file upload for resumes
- [ ] Add WebSocket support for real-time chat
- [ ] Add caching (Redis)

## 📝 Notes

- The import errors you see are expected until you run `pip install -r requirements.txt`
- Database tables are automatically created on first run
- Default token expiration is 7 days
- All endpoints under `/api/v1/chat` and `/api/v1/analysis` require authentication
