from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..deps import require_admin, CurrentUser
from ..models import Module, Resource
from ..schemas import (
    ModuleCreate,
    ModuleUpdate,
    ModuleOut,
    ResourceCreate,
    ResourceUpdate,
    ResourceOut,
)

router = APIRouter(prefix="/admin", tags=["admin-content"])


def _get_module_or_404(module_id: int, db: Session) -> Module:
    module = db.query(Module).filter(Module.id == module_id).first()
    if not module:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Module not found")
    return module


def _get_resource_or_404(resource_id: int, db: Session) -> Resource:
    resource = db.query(Resource).filter(Resource.id == resource_id).first()
    if not resource:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found")
    return resource


# ---- Modules ----


@router.post("/modules", response_model=ModuleOut, status_code=status.HTTP_201_CREATED)
def create_module(
    payload: ModuleCreate,
    db: Session = Depends(get_db),
    _admin: CurrentUser = Depends(require_admin),
):
    module = Module(title=payload.title, description=payload.description, order=payload.order)
    db.add(module)
    db.commit()
    db.refresh(module)
    return module


@router.put("/modules/{module_id}", response_model=ModuleOut)
def update_module(
    module_id: int,
    payload: ModuleUpdate,
    db: Session = Depends(get_db),
    _admin: CurrentUser = Depends(require_admin),
):
    module = _get_module_or_404(module_id, db)
    if payload.title is not None:
        module.title = payload.title
    if payload.description is not None:
        module.description = payload.description
    if payload.order is not None:
        module.order = payload.order
    db.commit()
    db.refresh(module)
    return module


@router.delete("/modules/{module_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_module(
    module_id: int,
    db: Session = Depends(get_db),
    _admin: CurrentUser = Depends(require_admin),
):
    module = _get_module_or_404(module_id, db)
    db.delete(module)  # cascades to resources
    db.commit()


# ---- Resources ----


@router.post(
    "/modules/{module_id}/resources",
    response_model=ResourceOut,
    status_code=status.HTTP_201_CREATED,
)
def create_resource(
    module_id: int,
    payload: ResourceCreate,
    db: Session = Depends(get_db),
    _admin: CurrentUser = Depends(require_admin),
):
    _get_module_or_404(module_id, db)  # 404 if the module doesn't exist
    resource = Resource(
        module_id=module_id,
        type=payload.type,
        title=payload.title,
        url=payload.url,
        order=payload.order,
    )
    db.add(resource)
    db.commit()
    db.refresh(resource)
    return resource


@router.put("/resources/{resource_id}", response_model=ResourceOut)
def update_resource(
    resource_id: int,
    payload: ResourceUpdate,
    db: Session = Depends(get_db),
    _admin: CurrentUser = Depends(require_admin),
):
    resource = _get_resource_or_404(resource_id, db)
    if payload.type is not None:
        resource.type = payload.type
    if payload.title is not None:
        resource.title = payload.title
    if payload.url is not None:
        resource.url = payload.url
    if payload.order is not None:
        resource.order = payload.order
    db.commit()
    db.refresh(resource)
    return resource


@router.delete("/resources/{resource_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_resource(
    resource_id: int,
    db: Session = Depends(get_db),
    _admin: CurrentUser = Depends(require_admin),
):
    resource = _get_resource_or_404(resource_id, db)
    db.delete(resource)
    db.commit()
