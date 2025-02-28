import time

from celery import states

from app.worker import celery_app


@celery_app.task(bind=True, name="run_task")
def run_task(self, user_id: str, subtasks: int, duration: int):
    r"""Run a task with a specified number of subtasks and duration for each subtask."""
    result = subtasks * duration
    for i in range(subtasks):
        time.sleep(duration)
        self.update_state(
            state=states.STARTED,
            meta={
                "user_id": user_id,
                "current": i,
                "total": subtasks
            },
        )

    return result
