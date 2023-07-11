from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from controllers import project_developers
from helpers.get_db import get_db
from database.schemas import ProjectDeveloperCreate, ProjectDeveloper

router = APIRouter(
    prefix="/project-developers",
    tags=["project-developers"],
    responses={
        404: {"description": "Not found"},
    },
)


@router.get("/")
def get_all_project_developers(db: Session = Depends(get_db)):
    return project_developers.get_all_project_developers(db)


@router.get("/{project_developer_id}")
def get_project_developer_by_id(
    project_developer_id: int, db: Session = Depends(get_db)
):
    db_project_developer = project_developers.get_project_developer_by_id(
        db, project_developer_id=project_developer_id
    )
    if not db_project_developer:
        raise HTTPException(status_code=404, detail="Project developer not found")
    return db_project_developer


@router.post("/")
def create_project_developer(
    project_developer: ProjectDeveloperCreate, db: Session = Depends(get_db)
):
    return project_developers.create_project_developer(
        db, project_developer=project_developer
    )


@router.put("/{project_developer_id}")
def update_project_developer(
    project_developer_id: int,
    project_developer: ProjectDeveloperCreate,
    db: Session = Depends(get_db),
):
    db_project_developer = project_developers.get_project_developer_by_id(
        db, project_developer_id=project_developer_id
    )
    if not db_project_developer:
        raise HTTPException(status_code=404, detail="Project developer not found")
    encoded_data = jsonable_encoder(project_developer)
    db_project_developer.project_id = encoded_data["project_id"]
    db_project_developer.developer_id = encoded_data["developer_id"]
    return project_developers.update_project_developer(
        db, project_developer_data=db_project_developer
    )


@router.delete("/{project_developer_id}")
def delete_project_developer(project_developer_id: int, db: Session = Depends(get_db)):
    db_project_developer = project_developers.get_project_developer_by_id(
        db, project_developer_id=project_developer_id
    )
    if not db_project_developer:
        raise HTTPException(status_code=404, detail="Project developer not found")
    return project_developers.delete_project_developer(
        db, db_project_developer=db_project_developer
    )
