from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from controllers import managers
from helpers.get_db import get_db
from database.schemas import ManagerCreate, Manager

router = APIRouter(
    prefix="/managers",
    tags=["managers"],
    responses={
        404: {"description": "Not found"},
    },
)


@router.get("/")
def get_all_managers(db: Session = Depends(get_db)):
    return managers.get_all_managers(db)


@router.get("/{manager_id}")
def get_manager_by_id(manager_id: int, db: Session = Depends(get_db)):
    db_manager = managers.get_manager_by_id(db, manager_id=manager_id)
    if not db_manager:
        raise HTTPException(status_code=404, detail="Manager not found")
    return db_manager


@router.post("/")
def create_manager(manager: ManagerCreate, db: Session = Depends(get_db)):
    return managers.create_manager(db, manager=manager)


@router.put("/{manager_id}")
def update_manager(
    manager_id: int, manager_data: ManagerCreate, db: Session = Depends(get_db)
):
    db_manager = managers.get_manager_by_id(db, manager_id=manager_id)
    if not db_manager:
        raise HTTPException(status_code=404, detail="Manager not found")
    encoded_data = jsonable_encoder(manager_data)
    db_manager.first_name = encoded_data["first_name"]
    db_manager.last_name = encoded_data["last_name"]
    return managers.update_manager(db, manager_data=db_manager)


@router.delete("/{manager_id}")
def delete_manager(manager_id: int, db: Session = Depends(get_db)):
    db_manager = managers.get_manager_by_id(db, manager_id=manager_id)
    if not db_manager:
        raise HTTPException(status_code=404, detail="Manager not found")
    return managers.delete_manager(db, db_manager=db_manager)
