from fastapi import APIRouter, Depends, HTTPException
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


@router.get("/{user_id}", tags=["users"])
def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = users.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.get("/{email}", tags=["users"])
def get_user_by_email(email: str, db: Session = Depends(get_db)):
    db_user = users.get_user_by_email(db, email=email)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.post("/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = users.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return users.create_user(db, user=user)


@router.put("/{user_id}")
def update_user(user_id: int, user_data: User, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=403, detail="User not found with given id")
    db_user["email"] = user_data["email"]
    db_user["password"] = user_data["password"]
    return users.update_user(db, user_data=db_user)


@router.delete("/{user_id}")
def delete_user_by_id(user_id: int, db: Session = Depends(get_db)):
    db_user = users.get_user_by_id(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found with given id")
    users.delete_user(db, user_id)
