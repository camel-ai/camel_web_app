import os

from celery import Celery


celery_app = Celery(__name__)
celery_app.conf.broker = os.environ.get(
    "CELERY_BROKER_URL", "redis://localhost:6379"
)
celery_app.conf.result_backend = os.environ.get(
    "CELERY_RESULT_BACKEND", "redis://localhost:6379"
)
celery_app.autodiscover_tasks(["app.services.task.task"])
