from datetime import datetime
from enum import Enum

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class TicketStatus(str, Enum):
    open = 'Open'
    in_progress = 'In Progress'
    resolved = 'Resolved'


class TicketPriority(str, Enum):
    low = 'Low'
    medium = 'Medium'
    high = 'High'


class TicketCreate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    title: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1)
    customer_name: str = Field(..., min_length=1, max_length=255, alias='customerName')
    customer_email: EmailStr = Field(..., alias='customerEmail')
    priority: TicketPriority


class TicketUpdate(BaseModel):
    status: TicketStatus


class TicketResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    title: str
    description: str
    customer_name: str = Field(serialization_alias='customerName')
    customer_email: str = Field(serialization_alias='customerEmail')
    status: str
    priority: str
    created_at: datetime = Field(serialization_alias='createdAt')
