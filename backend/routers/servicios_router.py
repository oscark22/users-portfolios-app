from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from helpers.authentication import get_current_active_user
from database.schemas import User
from controllers import projects
from helpers.get_db import get_db

router = APIRouter(
    prefix="/servicios",
    tags=["servicios"],
    responses={
        404: {"description": "Not found"},
    },
)


@router.get("/open/projectos/")  # equivalent to /projects
def get_all_servicios(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)
):
    return projects.get_all_projects(db)


@router.get("/auth/projectos/")
def get_all_servicios(db: Session = Depends(get_db)):
    return projects.get_all_projects(db)
