 from fastapi import APIRouter
from app.models.chat import ChatRequest
from app.models.settings import Settings
from typing import List, Dict, Any
router = APIRouter()


@router.post("/agent/generate_code")
async def generate_code(request_data: Settings):
    return generate_code_fun(request_data)

def generate_code_fun(code: str) -> str:
    code = ""
    return code



@router.post("/agent/chat", response_model=Dict[str, Any])
async def chat(request:ChatRequest,agent: Settings):
    print(request)
    return {"message": "Hello, this is a mock response."}
