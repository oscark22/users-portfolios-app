from fastapi import APIRouter, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from controllers import projects
from helpers.get_db import get_db
from database.schemas import ProjectCreate, Project

router = APIRouter(
    prefix="/projects",
    tags=["projects"],
    responses={
        404: {"description": "Not found"},
    },
)


@router.get("/")
def get_all_users(db: Session = Depends(get_db)):
    return projects.get_all_projects(db)


@router.get("/{project_id}")
def get_project_by_id(project_id: int, db: Session = Depends(get_db)):
    db_project = projects.get_project_by_id(db, project_id=project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project


@router.post("/")
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    return projects.create_project(db, project=project)


@router.put("/{project_id}")
def update_project(
    project_id: int, project_data: ProjectCreate, db: Session = Depends(get_db)
):
    db_project = projects.get_project_by_id(db, project_id=project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    encoded_data = jsonable_encoder(project_data)
    db_project.name = encoded_data["name"]
    db_project.description = encoded_data["description"]
    db_project.manager_id = encoded_data["manager_id"]  # bad
    return projects.update_project(db, project_data=db_project)


@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    db_project = projects.get_project_by_id(db, project_id=project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return projects.delete_project(db, db_project=db_project)
