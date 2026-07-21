import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.database import Base, engine
from app.routers import tickets

load_dotenv()

# Create all tables on startup (fine for SQLite/dev; production would use Alembic)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Support Ticket Dashboard API",
    description="REST API for managing support tickets",
    version="1.0.0",
)

# Allow the Vite dev server (and production build) to reach the API
allowed_origins = os.getenv(
    "ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173,http://127.0.0.1:4173,http://172.25.25.70:5173"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"^http://(localhost|127\.0\.0\.1|0\.0\.0\.0|172\.\d+\.\d+\.\d+)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tickets.router)


@app.get("/health")
def health_check():
    return {"status": "ok"}