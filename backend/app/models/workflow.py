from pydantic import BaseModel, Field

class WorkflowRequest(BaseModel):
    """
    工作流请求模型，包含启动工作流所需的所有参数。
    """
    agents: list = Field(..., description="List of agents configured for the workflow.")
    taskDefinition: str = Field(..., description="The definition of the task to be executed by the workflow.")

class WorkflowResponse(BaseModel):
    """
    工作流响应模型，返回启动结果。
    """
    message: str = Field(..., description="The result message of the workflow process.")
