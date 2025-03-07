
from celery import states
from fastapi import APIRouter, Depends

from app.api.deps import get_current_active_superuser
from app.models import User
from app.models.demo.tasks import Task, TaskCreate, TaskProgress, Tasks
from app.services.task.task import run_task
from app.worker import celery_app

router = APIRouter()


@router.post("/tasks", status_code=201, response_model=Task)
def create_task(
        task_in: TaskCreate,
        current_user: User = Depends(get_current_active_superuser)
):
    print({**task_in.model_dump(), "user_id": str(current_user.id)})

    task = run_task.delay(
        user_id=str(current_user.id),
        subtasks=task_in.subtasks,
        duration=task_in.duration
    )
    return Task(task_id=task.id)


@router.get("/tasks/me", response_model=Tasks)
def get_my_tasks(
        current_user: User = Depends(get_current_active_superuser),
        skip: int = 0,
        limit: int = 100,
):
    worker_tasks = celery_app.control.inspect().active()
    print(f"{worker_tasks=}")
    my_tasks: list[Task] = []
    if worker_tasks:
        for tasks in list(worker_tasks.values())[skip:skip + limit]:
            for task in tasks:
                if task["kwargs"]["user_id"] == str(current_user.id):
                    my_tasks.append(get_status(task["id"]))

    return Tasks(data=my_tasks, count=len(my_tasks))


@router.get("/tasks/{task_id}", response_model=Task)
def get_status(task_id):
    task_result = celery_app.AsyncResult(task_id)
    task = Task(task_id=task_id, status=task_result.status)

    if task_result.info and isinstance(task_result.info, dict):
        progress = TaskProgress(**task_result.info)
        percentage = round(progress.current / progress.total * 100, 2)
        task.progress = TaskProgress(
            user_id=progress.user_id,
            current=progress.current,
            total=progress.total,
            percentage=percentage
        )

    if task_result.status == states.SUCCESS:
        task.result = task_result.result
    elif task_result.status == states.FAILURE:
        task.error = str(task_result.info)

    return task


@router.delete("/tasks/{task_id}", response_model=Task)
def revoke_task(task_id):
    celery_app.control.revoke(task_id, terminate=True)
    task_result = celery_app.AsyncResult(task_id)
    print(f"{task_result=}")
    return Task(task_id=task_id, status=states.REVOKED)
