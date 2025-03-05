from fastapi import APIRouter, HTTPException
from app.models.approval import ApprovalRequest, ApprovalResponse

router = APIRouter()

@router.post(
    "/approval/approve",
    response_model=ApprovalResponse,
    summary="处理审批请求",
    description="根据请求ID和操作类型（批准或拒绝）处理审批请求。"
)
async def approve_request(request: ApprovalRequest):
    """处理审批请求"""
    # 模拟审批逻辑
    print("Approval request received:", request)
    return {"message": "Request approved successfully!"}
