from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from backend.app.core.database import get_db

router = APIRouter()

@router.get("/documents", summary="List knowledge base files")
def list_documents(db: Session = Depends(get_db)):
    return {"documents": []}

@router.post("/documents/upload", summary="Upload file and queue for vector chunk indexing")
def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db)):
    return {"status": "success", "filename": file.filename, "message": "File received and queued for vectorization."}

@router.delete("/documents/{document_id}", summary="Remove file from knowledge base")
def delete_document(document_id: str, db: Session = Depends(get_db)):
    return {"status": "success", "message": f"Document {document_id} deleted."}
