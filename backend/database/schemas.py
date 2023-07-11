from pydantic import BaseModel


# users
class UserBase(BaseModel):
    email: str
    password: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int
    role_id: int

    class Config:
        from_attributes = True


# roles
class RoleBase(BaseModel):
    name: str


class RoleCreate(RoleBase):
    pass


class Role(RoleBase):
    id: int

    class Config:
        from_attributes = True


# projectDeveloper
class ProjectDeveloperBase(BaseModel):
    pass


class ProjectDeveloperCreate(ProjectDeveloperBase):
    pass


class ProjectDeveloper(ProjectDeveloperBase):
    id: int
    project_id: int
    developer_id: int

    class Config:
        from_attributes = True


# proyect
class ProjectBase(BaseModel):
    name: str
    description: str


class ProjectCreate(ProjectBase):
    pass


class Project(ProjectBase):
    id: int
    manager_id: int
    proyectDevelopers: list[ProjectDeveloper] = []

    class Config:
        from_attributes = True


# manager
class ManagerBase(BaseModel):
    first_name: str
    last_name: str


class ManagerCreate(ManagerBase):
    pass


class Manager(ManagerBase):
    id: int
    projects: list[Project] = []

    class Config:
        from_attributes = True


# developer
class DeveloperBase(BaseModel):
    first_name: str
    last_name: str


class DeveloperCreate(DeveloperBase):
    pass


class Developer(DeveloperBase):
    id: int
    proyectDevelopers: list[ProjectDeveloper] = []

    class Config:
        from_attributes = True
