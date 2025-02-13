from typing import Any, Optional

from celery import states
from pydantic import BaseModel, Field, ConfigDict


class TaskProgress(BaseModel):
    user_id: str = Field(..., description="The ID of the user.")
    current: int = Field(0, description="The current progress.")
    total: int = Field(1, description="The total progress.")
    percentage: float = Field(0.0, description="The percentage of the progress.")


class TaskBase(BaseModel):
    task_id: str = Field(..., description="The ID of the task.")
    status: states.ALL_STATES = Field(states.PENDING, description="The status of the task.")
    result: Optional[Any] = Field(None, description="The result of the task.")
    error: Optional[str] = Field(None, description="The error message if the task fails.")

    model_config = ConfigDict(arbitrary_types_allowed=True)


class TaskCreate(BaseModel):
    r"""Create a task, including the number of subtasks and the duration of each subtask."""
    subtasks: int = Field(2, description="The number of subtasks.")
    duration: int = Field(5, description="The duration of each subtask.")


class Task(TaskBase):
    progress: Optional[TaskProgress] = Field(None, description="The progress of the task.")


class Tasks(BaseModel):
    data: list[Task] = Field([], description="A list of tasks.")
    count: int = Field(0, description="The number of tasks.")
