from pydantic import BaseModel


class Token(BaseModel):
    """
    JWT token response model.
    """
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    """
    Data extracted from JWT token.
    """
    email: str | None = None
