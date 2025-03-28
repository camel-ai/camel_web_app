from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from camel.agents import ChatAgent
from camel.configs import ChatGPTConfig
from camel.models import ModelFactory
from camel.types import ModelPlatformType, ModelType
import os

router = APIRouter()

class AgentRequest(BaseModel):
    system_message: str
    user_message: str
    platform_type: str = "OPENAI"
    model_type: str = "GPT_4"
    base_url: str | None = None

class AgentResponse(BaseModel):
    content: str
    role: str = "assistant"

@router.post("/chat", response_model=AgentResponse)
async def chat_with_agent(request: AgentRequest) -> AgentResponse:
    try:
        # 获取 API key
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise HTTPException(status_code=400, detail="OpenAI API key not configured")

        # 创建模型
        model = ModelFactory.create(
            model_platform=ModelPlatformType[request.platform_type],
            model_type=ModelType[request.model_type],
            api_key=api_key,
            url=request.base_url,
            model_config_dict=ChatGPTConfig(temperature=0.0).as_dict(),
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