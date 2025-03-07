from fastapi import APIRouter

from app.api.routes import login, users, tasks,settings,rag,workflow,approval,mock_data,human,agent,rolePlaying

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(tasks.router, prefix="/tasks", tags=["tasks"])

api_router.include_router(settings.router, prefix="/settings", tags=["settings"])
api_router.include_router(rag.router, prefix="/rag", tags=["rag"])
api_router.include_router(workflow.router, prefix="/workflow", tags=["workflow"])
api_router.include_router(approval.router, prefix="/approval", tags=["approval"])
api_router.include_router(mock_data.router, prefix="/mock_data", tags=["mock_data"])
api_router.include_router(human.router, prefix="/human", tags=["human"])
api_router.include_router(agent.router, prefix="/agent", tags=["agent"])
api_router.include_router(rolePlaying.router, prefix="/rolePlaying", tags=["rolePlaying"])
