import os
import jwt

# MUST match auth-service's JWT_SECRET exactly — that's what lets this
# service verify tokens without ever calling auth-service over the network.
JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-change-me")
JWT_ALGORITHM = "HS256"


def decode_access_token(token: str) -> dict:
    # Raises jwt.PyJWTError on invalid/expired token — callers should catch it.
    return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])