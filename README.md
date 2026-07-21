# AUREXILLION Technical Assessment

A full-stack support ticket dashboard built with FastAPI for the backend and React + Vite for the frontend.

## Project Overview

This project allows users to:
- Create support tickets
- View all tickets in a dashboard
- Filter tickets by status and priority
- Update ticket status
- View ticket details

## Tech Stack

### Backend
- Python 3.12
- FastAPI
- SQLAlchemy
- Pydantic
- SQLite
- Uvicorn

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

## Project Structure

- backend/ - FastAPI application, models, routes, schemas, and services
- frontend/ - React/Vite frontend application
- README.md - project documentation

## Prerequisites

- Python 3.12+
- Node.js 18+
- npm

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the backend server:
   ```bash
   PYTHONPATH=. python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

The backend will be available at:
- http://localhost:8000/health

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev -- --host 0.0.0.0 --port 5173
   ```

The frontend will be available at:
- http://localhost:5173

## API Notes

The API exposes ticket endpoints under:
- GET /api/tickets
- GET /api/tickets/{ticket_id}
- POST /api/tickets
- PATCH /api/tickets/{ticket_id}

## Notes

- The backend currently uses SQLite for local development.
- The database file is created automatically when the backend starts.
- The frontend consumes the backend API from the Vite dev server configuration.
