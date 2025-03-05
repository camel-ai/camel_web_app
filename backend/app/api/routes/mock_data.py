from fastapi import FastAPI, HTTPException, Request, APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.models.settings import Settings

router = APIRouter()

# 模拟的数据库数据
MOCK_DATA = {
    "platformOptions": [
        {"value": "OPENAI", "label": "OpenAI"},
        {"value": "MISTRALAI", "label": "MistralAI"},
        {"value": "ANTHROPIC", "label": "Anthropic"},
        {"value": "QWEN", "label": "Qwen"},
        {"value": "DEEPSEEK", "label": "DeepSeek"},
    ],
    "modelOptions": {
        "OPENAI": [
            {"value": "GPT_4o", "label": "GPT-4o"},
            {"value": "GPT_4o_mini", "label": "GPT-4o-mini"},
            {"value": "o1", "label": "o1"},
            {"value": "o1_preview", "label": "o1-preview"},
            {"value": "o1_mini", "label": "o1-mini"},
            {"value": "GPT_4_TURBO", "label": "GPT-4-turbo"},
            {"value": "GPT_4", "label": "GPT-4"},
            {"value": "GPT_3_5_TURBO", "label": "GPT-3.5-Turbo"},
        ],
        "MISTRALAI": [
            {"value": "MISTRAL_LARGE_2", "label": "Mistral-large-2"},
            {"value": "MISTRAL_12B_2409", "label": "Mistral-12b-2409"},
            {"value": "MISTRAL_8B_LATEST", "label": "Mistral-8b-latest"},
            {"value": "MISTRAL_3B_LATEST", "label": "Mistral-3b-latest"},
            {"value": "OPEN_MISTRAL_7B", "label": "Open-mistral-7b"},
            {"value": "OPEN_MISTRAL_NEMO", "label": "Open-mistral-nemo"},
            {"value": "CODESTRAL", "label": "Codestral"},
            {"value": "OPEN_MIXTRAL_8X7B", "label": "Open-mixtral-8x7b"},
            {"value": "OPEN_MIXTRAL_8X22B", "label": "Open-mixtral-8x22b"},
            {"value": "OPEN_CODESTRAL_MAMBA", "label": "Open-codestral-mamba"},
        ],
        "ANTHROPIC": [
            {"value": "CLAUDE_3_5_SONNET_LATEST", "label": "Claude-3-5-Sonnet-latest"},
            {"value": "CLAUDE_3_5_HAIKU_LATEST", "label": "Claude-3-5-haiku-latest"},
            {"value": "CLAUDE_3_HAIKU_20240307", "label": "Claude-3-haiku-20240307"},
            {"value": "CLAUDE_3_SONNET_20240229", "label": "Claude-3-sonnet-20240229"},
            {"value": "CLAUDE_3_OPUS_LATEST", "label": "Claude-3-opus-latest"},
            {"value": "CLAUDE_2_0", "label": "Claude-2.0"},
        ],
        "QWEN": [
            {"value": "QWEN_32b_preview", "label": "Qwen-32b-preview"},
            {"value": "QWEN_MAX", "label": "Qwen-max"},
            {"value": "QWEN_PLUS", "label": "Qwen-plus"},
            {"value": "QWEN_TURBO", "label": "Qwen-turbo"},
            {"value": "QWEN_LONG", "label": "Qwen-long"},
            {"value": "QWEN_VL_MAX", "label": "Qwen-vl-max"},
            {"value": "QWEN_MATH_PLUS", "label": "Qwen-math-plus"},
            {"value": "QWEN_MATH_TURBO", "label": "Qwen-math-turbo"},
            {"value": "QWEN_CODER_TURBO", "label": "Qwen-coder-turbo"},
            {"value": "QWEN2_5_CODER_32B_INSTRUCT", "label": "Qwen2.5-coder-32b-instruct"},
            {"value": "QWEN2_5_72B_INSTRUCT", "label": "Qwen2.5-72b-instruct"},
            {"value": "QWEN2_5_32B_INSTRUCT", "label": "Qwen2.5-32b-instruct"},
            {"value": "QWEN2_5_14B_INSTRUCT", "label": "Qwen2.5-14b-instruct"},
        ],
        "DEEPSEEK": [
            {"value": "DEEPSEEK_CHAT", "label": "DeepSeek-chat"},
            {"value": "DEEPSEEK_REASONER", "label": "DeepSeek-reasoner"},
        ],
    },
    "languageOptions": [
        {"value": "English", "label": "English"},
        {"value": "Chinese", "label": "中文"},
        {"value": "Japanese", "label": "日本語"},
        {"value": "Korean", "label": "한국어"},
    ],
    "approvalHistory": [
        {
            "id": 1,
            "tool": "File System Access",
            "timestamp": "2024-03-20 10:30:45",
            "status": "approved",
            "risk": "low",
        },
        {
            "id": 2,
            "tool": "Database Write",
            "timestamp": "2024-03-20 11:15:22",
            "status": "rejected",
            "risk": "high",
        },
    ],
    "pendingApprovals": [
        {
            "id": 1,
            "tool": "File System Access",
            "risk": "high",
            "description": "Request to access sensitive file: /data/users.db",
            "requestedBy": "AI Agent",
            "timestamp": "2024-03-21 15:30:00",
            "context": {
                "purpose": "Data analysis",
                "impact": "High - Involves sensitive user data",
            },
        },
        {
            "id": 2,
            "tool": "External API Call",
            "risk": "medium",
            "description": "Request to call external API: api.example.com",
            "requestedBy": "AI Agent",
            "timestamp": "2024-03-21 15:28:00",
            "context": {
                "purpose": "Data verification",
                "impact": "Medium - External service interaction",
            },
        },
    ],
    "recentActivity": [
        {
            "id": 1,
            "type": "approval",
            "timestamp": "2024-03-21 15:35:00",
            "description": "Approved database query request",
        },
        {
            "id": 2,
            "type": "rejection",
            "timestamp": "2024-03-21 15:20:00",
            "description": "Rejected unauthorized file access attempt",
        },
    ],
}

# Pydantic 模型
class ChatRequest(BaseModel):
    userMessage: str


# 获取所有选项和数据
@router.get("/api/getOptions", response_model=Dict[str, Any])
async def get_options():
    return MOCK_DATA

# 处理聊天请求
@router.post("/api/chat", response_model=Dict[str, Any])
async def chat(request:ChatRequest,settings: Settings):
    print(request)
    return {"message": "Hello, this is a mock response."}
