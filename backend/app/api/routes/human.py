from fastapi import APIRouter
from app.models.settings import Human
router = APIRouter()
@router.post(
    "/human/process",
    response_model=Human,
    summary="处理Human请求",
    description="根据前端提供的参数处理Human流程。"
)
async def process_human(request: Human):
    """处理human请求"""
    # 模拟human处理逻辑
    print("Processing human:", request)
    return {"message": "human process completed successfully!"}
