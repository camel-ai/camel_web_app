from fastapi import APIRouter

from app.api.v1.endpoints import camel

api_router = APIRouter()
api_router.include_router(camel.router, prefix="/camel", tags=["camel"]) 