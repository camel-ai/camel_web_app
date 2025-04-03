from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
from camel.toolkits import (
    ArxivToolkit,
    AskNewsToolkit,
    AudioAnalysisToolkit,
    BrowserToolkit,
    CodeExecutionToolkit,
    MathToolkit,
    MCPToolkit,
    MemoryToolkit,
    MeshyToolkit,
    MinerUToolkit,
    NetworkXToolkit,
    NotionToolkit,
    OpenAPIToolkit,
    OpenBBToolkit,
    PubMedToolkit,
    RedditToolkit,
    RetrievalToolkit,
    SearchToolkit,
    SemanticScholarToolkit,
    SlackToolkit,
    StripeToolkit,
    SymPyToolkit,
    TerminalToolkit,
    TwitterToolkit,
    VideoAnalysisToolkit,
    VideoDownloaderToolkit,
    WeatherToolkit,
    WhatsAppToolkit,
    ZapierToolkit
)

router = APIRouter()

# 创建工具实例字典
TOOLKIT_MAPPING = {
    'arxiv': ArxivToolkit(),
    'ask_news': AskNewsToolkit(),
    'audio_analysis': AudioAnalysisToolkit(),
    'browser': BrowserToolkit(),
    'code_execution': CodeExecutionToolkit(),
    'math': MathToolkit(),
    'mcp': MCPToolkit(),
    'memory': MemoryToolkit(),
    'meshy': MeshyToolkit(),
    'mineru': MinerUToolkit(),
    'networkx': NetworkXToolkit(),
    'notion': NotionToolkit(),
    'openapi': OpenAPIToolkit(),
    'openbb': OpenBBToolkit(),
    'pubmed': PubMedToolkit(),
    'reddit': RedditToolkit(),
    'retrieval': RetrievalToolkit(),
    'search': SearchToolkit(),
    'semantic_scholar': SemanticScholarToolkit(),
    'slack': SlackToolkit(),
    'stripe': StripeToolkit(),
    'sympy': SymPyToolkit(),
    'terminal': TerminalToolkit(),
    'twitter': TwitterToolkit(),
    'video_analysis': VideoAnalysisToolkit(),
    'video_downloader': VideoDownloaderToolkit(),
    'weather': WeatherToolkit(),
    'whatsapp': WhatsAppToolkit(),
    'zapier': ZapierToolkit()
}

@router.post("/execute_tool/{tool_name}")
async def execute_tool(tool_name: str, params: Dict[str, Any]):
    """
    执行指定的CAMEL工具
    
    Args:
        tool_name: 工具名称
        params: 工具参数
        
    Returns:
        工具执行结果
    """
    if tool_name not in TOOLKIT_MAPPING:
        raise HTTPException(status_code=404, detail=f"Tool {tool_name} not found")
        
    toolkit = TOOLKIT_MAPPING[tool_name]
    try:
        result = await toolkit.run(**params)
        return {"result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/available_tools")
async def get_available_tools() -> List[str]:
    """获取所有可用的工具列表"""
    return list(TOOLKIT_MAPPING.keys())

@router.get("/tool_info/{tool_name}")
async def get_tool_info(tool_name: str):
    """获取指定工具的详细信息"""
    if tool_name not in TOOLKIT_MAPPING:
        raise HTTPException(status_code=404, detail=f"Tool {tool_name} not found")
        
    toolkit = TOOLKIT_MAPPING[tool_name]
    return {
        "name": tool_name,
        "description": toolkit.__doc__,
        "methods": [method for method in dir(toolkit) if not method.startswith('_')]
    } 