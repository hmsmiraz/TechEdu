from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, field_validator

from .models import ResourceType


class ResourceCreate(BaseModel):
    type: ResourceType
    title: str = Field(min_length=1, max_length=255)
    url: str = Field(min_length=1, max_length=1024)
    order: int = 0

    @field_validator("url")
    @classmethod
    def validate_url(cls, v: str) -> str:
        if not (v.startswith("http://") or v.startswith("https://")):
            raise ValueError("url must start with http:// or https://")
        return v


class ResourceUpdate(BaseModel):
    type: Optional[ResourceType] = None
    title: Optional[str] = Field(default=None, min_length=1, max_length=255)
    url: Optional[str] = Field(default=None, min_length=1, max_length=1024)
    order: Optional[int] = None


class ResourceOut(BaseModel):
    id: int
    module_id: int
    type: ResourceType
    title: str
    url: str
    order: int
    created_at: datetime

    class Config:
        from_attributes = True


class ModuleCreate(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    description: Optional[str] = None
    order: int = 0


class ModuleUpdate(BaseModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=255)
    description: Optional[str] = None
    order: Optional[int] = None


class ModuleOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    order: int
    created_at: datetime
    resources: List[ResourceOut] = []

    class Config:
        from_attributes = True