from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from controllers import users
from helpers.get_db import get_db
from database.schemas import UserCreate, User

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={
        404: {"description": "Not found"},
    },
)


@router.get("/")
def get_all_users(db: Session = Depends(get_db)):
    return users.get_all_users(db)


@router.get("/{user_id}")
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    db_user = users.get_user_by_id(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.get("/email/{email}")
def get_user_by_email(email: str, db: Session = Depends(get_db)):
    db_user = users.get_user_by_email(db, email=email)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.post("/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = users.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return users.create_user(db, user=user)


@router.put("/{user_id}")
def update_user(user_id: int, user_data: UserCreate, db: Session = Depends(get_db)):
    db_user = users.get_user_by_id(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    encoded_data = jsonable_encoder(user_data)
    db_user.email = encoded_data["email"]
    db_user.password = encoded_data["password"]
    db_user.role_id = encoded_data["role_id"]
    return users.update_user(db, user_data=db_user)


@router.delete("/{user_id}")
def delete_user_by_id(user_id: int, db: Session = Depends(get_db)):
    db_user = users.get_user_by_id(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    users.delete_user(db, db_user=db_user)
