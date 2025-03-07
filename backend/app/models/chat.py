from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    userMessage: str
