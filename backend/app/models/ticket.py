from sqlalchemy import Column, Integer, String, Text, DateTime, func
from app.database import Base


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    description = Column(Text, nullable=False)

    customer_name = Column(String, nullable=False)

    customer_email = Column(String, nullable=False)

    status = Column(String, nullable=False, default="Open")

    priority = Column(String, nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )