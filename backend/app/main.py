import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.database import Base, engine
from app.routers import tickets

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title='Support Ticket Dashboard API',
    description='REST API for managing support tickets',
    version='1.0.0',
)

allowed_origins = os.getenv('ALLOWED_ORIGINS', 'http://localhost:5173,http://localhost:4173').split(',')
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(tickets.router)

@app.get('/health')
def health_check():
    return {'status': 'ok'}
