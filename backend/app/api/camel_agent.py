from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from camel.agents import ChatAgent
from camel.configs import ChatGPTConfig
from camel.models import ModelFactory
from camel.types import ModelPlatformType, ModelType
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

class AgentRequest(BaseModel):
    system_message: str
    user_message: str
    platform_type: str = "OPENAI"  # 默认使用 OpenAI
    model_type: str = "GPT_4"      # 默认使用 GPT-4
    api_key: str | None = None
    base_url: str | None = None

class AgentResponse(BaseModel):
    content: str

@router.post("/create-agent", response_model=AgentResponse)
async def create_agent(request: AgentRequest):
    try:
        # 使用环境变量中的 API key，如果请求中没有提供的话
        api_key = request.api_key or os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise HTTPException(status_code=400, detail="API key is required")

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