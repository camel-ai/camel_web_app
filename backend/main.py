from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.tools import router as tools_router

app = FastAPI()

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册工具路由
app.include_router(tools_router, prefix="/api/tools", tags=["tools"])

@app.get("/")
async def root():
    return {"message": "Welcome to CAMEL Web App API"} 