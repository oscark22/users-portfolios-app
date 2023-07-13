from sqlalchemy.orm import Session
from database.models import Project, ProjectDeveloper, Developer
from database.schemas import ProjectCreate
from sqlalchemy.orm import joinedload


def get_all_projects(db: Session):
    return db.query(Project).all()


def get_project_by_id(db: Session, project_id: int):
    return db.query(Project).filter(Project.id == project_id).first()


def get_all_projects_data(db: Session):
    projects = (
        db.query(Project)
        .options(
            joinedload(Project.manager),
            joinedload(Project.projectDevelopers).joinedload(
                ProjectDeveloper.developer
            ),
        )
        .all()
    )

    project_data = []

    for project in projects:
        project_info = {
            "id": project.id,
            "name": project.name,
            "manager": f"{project.manager.first_name} {project.manager.last_name}",
            "description": project.description,
            "developers": [
                {
                    "id": pd.developer.id,
                    "first_name": pd.developer.first_name,
                    "last_name": pd.developer.last_name,
                }
                for pd in project.projectDevelopers
            ],
        }
        project_data.append(project_info)

    return project_data


def get_project_data_by_id(db: Session, project_id: int):
    project = (
        db.query(Project)
        .options(
            joinedload(Project.manager),
            joinedload(Project.projectDevelopers).joinedload(
                ProjectDeveloper.developer
            ),
        )
        .filter(Project.id == project_id)
        .first()
    )

    project_data = {
        "id": project.id,
        "name": project.name,
        "manager": f"{project.manager.first_name} {project.manager.last_name}",
        "description": project.description,
        "developers": [
            {
                "id": pd.developer.id,
                "first_name": pd.developer.first_name,
                "last_name": pd.developer.last_name,
            }
            for pd in project.projectDevelopers
        ],
    }

    return project_data


def create_project(db: Session, project: ProjectCreate):
    db_project = Project(
        name=project.name,
        description=project.description,
        manager_id=project.manager_id,
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


def update_project(db: Session, project_data):
    db.merge(project_data)
    db.commit()


def delete_project(db: Session, db_project):
    db.delete(db_project)
    db.commit()
