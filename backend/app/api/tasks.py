from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.core.database import get_db

router = APIRouter()

@router.get("/tasks", summary="List tasks sorted by priority (Eisenhower quadrants)")
def list_tasks(db: Session = Depends(get_db)):
    return {"tasks": []}

@router.post("/tasks", summary="Create a new task manually")
def create_task(title: str, description: str = None, priority: str = "Neither", db: Session = Depends(get_db)):
    return {"status": "success", "task": {"title": title, "priority": priority}}

@router.put("/tasks/{task_id}", summary="Update a task status or priority quadrant")
def update_task(task_id: str, status: str = None, priority: str = None, db: Session = Depends(get_db)):
    return {"status": "success", "message": f"Task {task_id} updated."}

@router.delete("/tasks/{task_id}", summary="Delete a task")
def delete_task(task_id: str, db: Session = Depends(get_db)):
    return {"status": "success", "message": f"Task {task_id} deleted."}
