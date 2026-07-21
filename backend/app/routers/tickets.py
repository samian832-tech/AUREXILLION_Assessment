from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.ticket import TicketCreate, TicketResponse, TicketUpdate
from app.services import ticket_service

router = APIRouter(prefix="/api/tickets", tags=["tickets"])


def _to_response(ticket) -> dict:
    """Convert ORM object to camelCase dict for the client."""
    return TicketResponse.model_validate(ticket).model_dump(by_alias=True)


@router.get("", response_model=list[dict])
def list_tickets(
    status: Optional[str] = None,
    priority: Optional[str] = None,
    db: Session = Depends(get_db),
):
    tickets = ticket_service.get_all_tickets(db, status=status, priority=priority)
    return [_to_response(t) for t in tickets]


@router.get("/{ticket_id}", response_model=dict)
def get_ticket(ticket_id: int, db: Session = Depends(get_db)):
    ticket = ticket_service.get_ticket_by_id(db, ticket_id)
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Ticket {ticket_id} not found",
        )
    return _to_response(ticket)


@router.post("", response_model=dict, status_code=status.HTTP_201_CREATED)
def create_ticket(payload: TicketCreate, db: Session = Depends(get_db)):
    ticket = ticket_service.create_ticket(db, payload)
    return _to_response(ticket)


@router.patch("/{ticket_id}", response_model=dict)
def update_ticket_status(
    ticket_id: int,
    payload: TicketUpdate,
    db: Session = Depends(get_db),
):
    ticket = ticket_service.get_ticket_by_id(db, ticket_id)
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Ticket {ticket_id} not found",
        )
    updated = ticket_service.update_ticket_status(db, ticket, payload)
    return _to_response(updated)