from fastapi import APIRouter, HTTPException
from app.models.approval import ApprovalRequest, ApprovalResponse

router = APIRouter()

@router.post(
    "/approval/approve",
    response_model=ApprovalResponse,
    summary="Process approval request",
    description="Process the approval request based on the request ID and action type (approve or reject)."
)
async def approve_request(request: ApprovalRequest):
    """Process approval request"""
    # Simulate approval logic
    print("Approval request received:", request)
    return {"message": "Request approved successfully!"}
