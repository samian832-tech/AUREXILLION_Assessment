from datetime import datetime, timezone
from typing import Optional

from sqlalchemy.orm import Session

from app.models.ticket import Ticket
from app.schemas.ticket import TicketCreate, TicketUpdate


def get_all_tickets(
    db: Session,
    status: Optional[str] = None,
    priority: Optional[str] = None,
) -> list[Ticket]:
    query = db.query(Ticket)
    if status:
        query = query.filter(Ticket.status == status)
    if priority:
        query = query.filter(Ticket.priority == priority)
    return query.order_by(Ticket.created_at.desc()).all()


def get_ticket_by_id(db: Session, ticket_id: int) -> Optional[Ticket]:
    return db.query(Ticket).filter(Ticket.id == ticket_id).first()


def create_ticket(db: Session, payload: TicketCreate) -> Ticket:
    ticket = Ticket(
        title=payload.title,
        description=payload.description,
        customer_name=payload.customer_name,
        customer_email=str(payload.customer_email),
        status="Open",  # starts as Open regardless of payload
        priority=payload.priority.value,
        created_at=datetime.now(timezone.utc),
    )
    db.add(ticket)
    db.commit()
    db.refresh(ticket)
    return ticket


def update_ticket_status(db: Session, ticket: Ticket, payload: TicketUpdate) -> Ticket:
    ticket.status = payload.status.value
    db.commit()
    db.refresh(ticket)
    return ticket