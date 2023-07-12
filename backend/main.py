from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from database import models, schemas
from database.settings import SessionLocal, engine


from routers import (
    managers_router,
    users_router,
    roles_router,
    developers_router,
    projects_router,
    project_developer_router,
)
import controllers


models.Base.metadata.create_all(bind=engine)

app = FastAPI()


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(users_router.router)
app.include_router(roles_router.router)
app.include_router(managers_router.router)
app.include_router(developers_router.router)
app.include_router(projects_router.router)
app.include_router(project_developer_router.router)


@app.get("/")
def read_root():
    return {"Hello": "World"}


if __name__ == "__main__":
    uvicorn.run("main:app", port=9000, reload=True)
