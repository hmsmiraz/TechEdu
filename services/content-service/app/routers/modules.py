from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from ..database import get_db
from ..deps import get_current_user, CurrentUser
from ..models import Module
from ..schemas import ModuleOut

router = APIRouter(prefix="/modules", tags=["modules"])


@router.get("", response_model=List[ModuleOut])
def list_modules(
    db: Session = Depends(get_db),
    _user: CurrentUser = Depends(get_current_user),
):
    # Any valid JWT means the user is an approved account (auth-service only
    # issues tokens to approved users) — no extra status check needed here.
    return (
        db.query(Module)
        .options(joinedload(Module.resources))
        .order_by(Module.order)
        .all()
    )


@router.get("/{module_id}", response_model=ModuleOut)
def get_module(
    module_id: int,
    db: Session = Depends(get_db),
    _user: CurrentUser = Depends(get_current_user),
):
    module = (
        db.query(Module)
        .options(joinedload(Module.resources))
        .filter(Module.id == module_id)
        .first()
    )
    if not module:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Module not found")
    return module