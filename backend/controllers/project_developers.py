from sqlalchemy.orm import Session
from database.models import ProjectDeveloper
from database.schemas import ProjectDeveloperCreate


def get_all_project_developers(db: Session):
    return db.query(ProjectDeveloper).all()


def get_project_developer_by_id(db: Session, project_developer_id: int):
    return (
        db.query(ProjectDeveloper)
        .filter(ProjectDeveloper.id == project_developer_id)
        .first()
    )


def create_project_developer(db: Session, project_developer: ProjectDeveloperCreate):
    db_project_developer = ProjectDeveloper(
        project_id=project_developer.project_id,
        developer_id=project_developer.developer_id,
    )
    db.add(db_project_developer)
    db.commit()
    db.refresh(db_project_developer)
    return db_project_developer


def update_project_developer(db: Session, project_developer_data):
    db.merge(project_developer_data)
    db.commit()


def delete_project_developer(db: Session, db_project_developer: int):
    db.delete(db_project_developer)
    db.commit()
