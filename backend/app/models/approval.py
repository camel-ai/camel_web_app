from pydantic import BaseModel, Field

class ApprovalRequest(BaseModel):
    """
    审批请求模型，包含审批请求的ID和操作类型。
    """
    id: int = Field(..., description="The ID of the approval request.")
    action: str = Field(..., description="The action to be taken on the request (e.g., 'approve', 'reject').")

class ApprovalResponse(BaseModel):
    """
    审批响应模型，返回审批结果。
    """
    message: str = Field(..., description="The result message of the approval process.")
