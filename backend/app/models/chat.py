from pydantic import BaseModel, Field
from typing import Optional


class ChatRequest(BaseModel):
    user_message: str
    system_message: str
    platform_type: str = "OPENAI"
    model_type: str = "GPT_4"
    base_url: Optional[str] = None
    api_key: str
    temperature: float = 0.7
    max_tokens: int = 2000
