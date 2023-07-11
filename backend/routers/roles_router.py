from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from controllers import roles
from helpers.get_db import get_db
from database.schemas import RoleCreate, Role

router = APIRouter(
    prefix="/roles",
    tags=["roles"],
    responses={
        404: {"description": "Not found"},
    },
)


@router.get("/")
def get_all_roles(db: Session = Depends(get_db)):
    return roles.get_all_roles(db)


@router.get("/{role_id}")
def get_role_by_id(role_id: int, db: Session = Depends(get_db)):
    db_role = roles.get_role_by_id(db, role_id=role_id)
    if not db_role:
        raise HTTPException(status_code=404, detail="Role not found")
    return db_role


@router.post("/")
def create_role(role: RoleCreate, db: Session = Depends(get_db)):
    return roles.create_role(db, role=role)


@router.put("/{role_id}")
def update_role(role_id: int, role_data: RoleCreate, db: Session = Depends(get_db)):
    db_role = roles.get_role_by_id(db, role_id=role_id)
    if not db_role:
        raise HTTPException(status_code=404, detail="Role not found")
    encoded_data = jsonable_encoder(role_data)
    db_role.name = encoded_data["name"]
    return roles.update_role(db, role_data=db_role)


@router.delete("/{role_id}")
def delete_role(role_id: int, db: Session = Depends(get_db)):
    db_role = roles.get_role_by_id(db, role_id=role_id)
    if not db_role:
        raise HTTPException(status_code=404, detail="Role not found")
    return roles.delete_role(db, db_role=db_role)
