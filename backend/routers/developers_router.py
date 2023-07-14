from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from controllers import developers
from helpers.get_db import get_db
from database.schemas import DeveloperCreate, Developer

router = APIRouter(
    prefix="/developers",
    tags=["developers"],
    responses={
        404: {"description": "Not found"},
    },
)


@router.get("/")
def get_all_developers(db: Session = Depends(get_db)):
    return developers.get_all_developers(db)


@router.get("/{developer_id}")
def get_developer_by_id(developer_id: int, db: Session = Depends(get_db)):
    db_developer = developers.get_developer_by_id(db, developer_id=developer_id)
    if not db_developer:
        raise HTTPException(status_code=404, detail="Developer not found")
    return db_developer


@router.post("/")
def create_developer(developer: DeveloperCreate, db: Session = Depends(get_db)):
    return developers.create_developer(db, developer=developer)


@router.put("/{developer_id}")
def update_developer(
    developer_id: int, developer_data: DeveloperCreate, db: Session = Depends(get_db)
):
    db_developer = developers.get_developer_by_id(db, developer_id=developer_id)
    if not db_developer:
        raise HTTPException(status_code=404, detail="Developer not found")
    encoded_data = jsonable_encoder(developer_data)
    db_developer.first_name = encoded_data["first_name"]
    db_developer.last_name = encoded_data["last_name"]
    return developers.update_developer(db, developer_data=db_developer)


@router.delete("/{developer_id}")
def delete_developer(developer_id: int, db: Session = Depends(get_db)):
    db_developer = developers.get_developer_by_id(db, developer_id=developer_id)
    if not db_developer:
        raise HTTPException(status_code=404, detail="Developer not found")
    return developers.delete_developer(db, db_developer=db_developer)
