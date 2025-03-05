from fastapi import APIRouter, HTTPException
from app.models.workflow import WorkflowRequest, WorkflowResponse

router = APIRouter()

@router.post(
    "/workflow/start",
    response_model=WorkflowResponse,
    summary="启动工作流",
    description="根据用户配置的代理和任务定义启动工作流。"
)
async def start_workflow(request: WorkflowRequest):
    """启动工作流"""
    # 模拟工作流处理逻辑
    print("Starting workflow:", request)
    return {"message": "Workflow started successfully!"}
