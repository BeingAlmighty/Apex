from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
import hashlib
import secrets
from app.core.config import settings


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password against a hashed password.
    
    Args:
        plain_password: The plain text password
        hashed_password: The hashed password from database
        
    Returns:
        True if password matches, False otherwise
    """
    # Split the stored hash to get salt and hash
    try:
        salt, stored_hash = hashed_password.split('$')
        # Hash the provided password with the same salt
        password_hash = hashlib.pbkdf2_hmac('sha256', plain_password.encode('utf-8'), 
                                            bytes.fromhex(salt), 100000)
        # Compare hashes
        return password_hash.hex() == stored_hash
    except Exception:
        return False


def get_password_hash(password: str) -> str:
    """
    Hash a password using PBKDF2.
    
    Args:
        password: The plain text password to hash
        
    Returns:
        The hashed password in format: salt$hash
    """
    # Generate a random salt
    salt = secrets.token_bytes(32)
    # Hash the password
    password_hash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    # Return salt and hash separated by $
    return f"{salt.hex()}${password_hash.hex()}"


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Create a JWT access token.
    
    Args:
        data: The data to encode in the token (typically {"sub": user_email})
        expires_delta: Optional custom expiration time
        
    Returns:
        The encoded JWT token
    """
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    
    return encoded_jwt


def decode_token(token: str) -> Optional[dict]:
    """
    Decode and verify a JWT token.
    
    Args:
        token: The JWT token to decode
        
    Returns:
        The decoded token payload, or None if invalid
    """
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        return None
