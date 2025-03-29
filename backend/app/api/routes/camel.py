from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from camel.agents import ChatAgent
from camel.configs import ChatGPTConfig
from camel.models import ModelFactory
from camel.types import ModelPlatformType, ModelType
from typing import Optional

router = APIRouter()

class AgentRequest(BaseModel):
    system_message: str
    user_message: str
    platform_type: str = "DEEPSEEK"
    model_type: str = "DeepSeek-Chat"
    base_url: Optional[str] = "https://api.deepseek.com"
    api_key: str
    temperature: float = 0.7
    max_tokens: int = 2000

class AgentResponse(BaseModel):
    content: str
    role: str = "assistant"

@router.post("/chat", response_model=AgentResponse)
async def chat_with_agent(request: AgentRequest) -> AgentResponse:
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
        
        return AgentResponse(content=response.msgs[0].content)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 