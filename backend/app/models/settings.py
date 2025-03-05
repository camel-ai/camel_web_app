from typing import Dict

from pydantic import BaseModel, Field

class Settings(BaseModel):
    """
    用户设置模型，包含前端界面中可配置的各项参数。
    """
    availableToolkits: list = Field(default=[], description="List of available toolkits for the user to choose from.")
    platformType: str = Field(..., description="The platform type selected by the user (e.g., OPENAI, MISTRALAI).")
    modelType: str = Field(..., description="The model type selected by the user (e.g., GPT_4, MISTRAL_LARGE_2).")
    apiKey: str = Field(..., description="The API key for authentication with the selected platform.")
    baseURL: str = Field(..., description="The base URL for the selected platform.")
    yourApiKey: str = Field(default="", description="The API key for authentication with the selected platform.")
    yourBaseURL: str = Field(default="", description="The base URL for the selected platform.")
    yourPlatformType: str = Field(..., description="The platform type selected by the user (e.g., OPENAI, MISTRALAI).")
    yourModelType: str = Field(..., description="The model type selected by the user (e.g., GPT_4, MISTRAL_LARGE_2).")
    systemMessage: str = Field(..., description="The system message that defines the behavior of the AI agent.")
    outputLanguage: str = Field(..., description="The output language for the AI agent's responses.")
    temperature: float = Field(..., description="The temperature parameter for the AI agent.")
    agents: list = Field(default=[], description="List of agents configured by the user.")
    max_tokens: int = Field(..., description="The maximum number of tokens for the AI agent's responses.")
    pendingApprovals: list = Field(default=[], description="List of pending approval requests.")
    recentActivity: list = Field(default=[], description="List of recent activity logs.")
    retrievalParams: Dict

class SettingsResponse(BaseModel):
    """
    设置响应模型，返回保存的设置数据。
    """
    data: Settings

class CodeGenerateRequest(BaseModel):
    moduleType: str
    settings: Settings

class RagSettings(BaseModel):
    fileUrl: str
    embeddingModel: str
    vectorStore: str
    topNumber: str
    similarityThreshold: str
    databaseType: str
    databaseURI: str
    username: str
    password: str

class Human(BaseModel):
    apiKey: str
    timeout: str
    level: str
    email: bool
    browser: bool
    slack: bool
    fileSystemAccess: str
    externalAPICall: str
