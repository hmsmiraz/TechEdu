from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User, UserStatus
from ..schemas import SignupRequest, LoginRequest, AuthResponse
from ..security import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def signup(payload: SignupRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists",
        )

    user = User(
        name=payload.name,
        email=payload.email,
        password_hash=hash_password(payload.password),
        status=UserStatus.pending,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return AuthResponse(status=user.status, detail="Account created, pending admin approval")


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if user.status == UserStatus.pending:
        return AuthResponse(status=user.status, detail="Account pending admin approval")

    if user.status == UserStatus.rejected:
        return AuthResponse(status=user.status, detail="Account request was not approved")

    token = create_access_token(user_id=user.id, role=user.role.value)
    return AuthResponse(status=user.status, access_token=token)