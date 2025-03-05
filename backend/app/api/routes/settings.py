from typing import List, Dict

from fastapi import APIRouter, HTTPException
from app.models.settings import Settings, SettingsResponse,CodeGenerateRequest
from pydantic import BaseModel
import re

router = APIRouter()


@router.get("/settings/", response_model=SettingsResponse)
async def get_settings():
    """获取初始设置数据"""
    initial_settings = {
        "platformType": "OPENAI",
        "modelType": "GPT_4",
        "apiKey": "",
        "systemMessage": "You are a helpful assistant.",
        "outputLanguage": "English",
        "agents": [],
        "pendingApprovals": [],
        "recentActivity": [],
        "retrievalParams": {"topK": 3, "threshold": 0.7}
    }
    return {"data": initial_settings}

@router.post("/settings/", response_model=SettingsResponse)
async def save_settings(settings: Settings):
    """保存用户设置"""
    print("Settings saved:", settings)
    return {"data": settings}


@router.post("/settings/generate_code")
async def generate_code(request_data: CodeGenerateRequest):
    module_type = request_data.moduleType
    settings = request_data.settings

    def get_module_code(module_type: str, settings: Settings):
        if module_type == "Module1":
            return generate_module1_code(settings)
        elif module_type == "Module2":
            return generate_module2_code(settings)
        elif module_type == "Module5":
            return generate_module5_code(settings)
        else:
            return "// Module not implemented"

    def generate_module1_code(settings: Settings):
        return f"""
from camel.agents import ChatAgent
from camel.configs import ChatGPTConfig
from camel.models import ModelFactory
from camel.types import ModelPlatformType, ModelType

model = ModelFactory.create(
    model_platform=ModelPlatformType.{settings.platformType},
    model_type=ModelType.{settings.modelType},
    model_config_dict=ChatGPTConfig(temperature=0.0).as_dict(),
)

agent = ChatAgent(model=model, system_message="{settings.systemMessage}")
response = agent.step("{settings.systemMessage}")
print(response.msgs[0].content)
        """

    def generate_module2_code(settings: Settings):
        return f"""
from camel.agents import RolePlaying
from camel.configs import ChatGPTConfig
from camel.models import ModelFactory

role_playing = RolePlaying(
    assistant_role_name="{settings.assistantRole}",
    user_role_name="{settings.userRole}",
    task_prompt="{settings.taskPrompt}",
    output_language="{settings.outputLanguage}",
    model_config=ChatGPTConfig(temperature=0.7)
)

response = role_playing.start()
print(response.assistant_message)
        """

    def generate_module5_code(settings: Settings):
        return f"""
from camel.embeddings import OpenAIEmbedding
from camel.retrievers import AutoRetriever
from camel.storages import QdrantStorage
from camel.models import ModelFactory

embedding_model = OpenAIEmbedding(model_name="{settings.embeddingModel}")
vector_store = QdrantStorage.create(embedding_model=embedding_model)

retriever = AutoRetriever(
    vector_store=vector_store,
    top_k={settings.retrievalParams.get('topK', 3)},
    similarity_threshold={settings.retrievalParams.get('threshold', 0.7)}
)

response = retriever.retrieve(query="")
print(response)
        """

    code = get_module_code(module_type, settings)
    # 安全检查：避免代码注入
    code = sanitize_code(code)
    return {"codeExample": code}

def sanitize_code(code: str) -> str:
    # 移除潜在的恶意代码
    code = re.sub(r'[\w\s]*import[\s\w]*', '', code, flags=re.IGNORECASE)
    code = re.sub(r'eval\([\w\s,\'"]*\)', '', code, flags=re.IGNORECASE)
    code = re.sub(r'exec\([\w\s,\'"]*\)', '', code, flags=re.IGNORECASE)
    code = re.sub(r'os\.([\w\.]*)', '', code, flags=re.IGNORECASE)
    return code
