import enum
from datetime import datetime, timezone

from sqlalchemy import Column, Integer, String, Text, Enum, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from .database import Base


class ResourceType(str, enum.Enum):
    video = "video"
    doc = "doc"


class Module(Base):
    __tablename__ = "modules"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    order = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    resources = relationship(
        "Resource",
        back_populates="module",
        cascade="all, delete-orphan",
        order_by="Resource.order",
    )


class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    module_id = Column(Integer, ForeignKey("modules.id"), nullable=False)
    type = Column(Enum(ResourceType), nullable=False)
    title = Column(String(255), nullable=False)
    url = Column(String(1024), nullable=False)
    order = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    module = relationship("Module", back_populates="resources")