from fastapi import APIRouter, HTTPException
from app.models.chat import ChatRequest
from app.models.settings import Settings
from typing import List, Dict, Any
from camel.agents import ChatAgent
from camel.configs import ChatGPTConfig
from camel.models import ModelFactory
from camel.types import ModelPlatformType, ModelType

router = APIRouter()

@router.post("/generate_code")
async def generate_code(request_data: Settings):
    return generate_code_fun(request_data)

def generate_code_fun(code: str) -> str:
    code = ""
    return code

@router.post("/chat", response_model=Dict[str, Any])
async def chat(request: ChatRequest):
    try:
        # 创建模型配置
        model_config = ChatGPTConfig(
            temperature=request.temperature,
            max_tokens=request.max_tokens
        )

        # 创建模型
        model = ModelFactory.create(
            model_platform=ModelPlatformType[request.platform_type],
            model_type=ModelType[request.model_type],
            api_key=request.api_key,
            url=request.base_url,
            model_config_dict=model_config.as_dict(),
        )

        # 创建 agent
        agent = ChatAgent(
            system_message=request.system_message,
            model=model,
            message_window_size=10
        )

        # 获取响应
        response = agent.step(request.user_message)
        
        return {"content": response.msgs[0].content, "role": "assistant"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
