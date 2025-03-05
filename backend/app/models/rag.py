from pydantic import BaseModel, Field

class RAGRequest(BaseModel):
    """
    RAG请求模型，包含处理RAG流程所需的所有参数。
    """
    documentSource: str = Field(..., description="The source of the documents to be processed (e.g., file path or URL).")
    embeddingModel: str = Field(..., description="The embedding model used for document processing (e.g., text-embedding-3-small).")
    vectorStore: str = Field(..., description="The vector store used for storing document embeddings (e.g., FAISS, Qdrant).")
    retrievalParams: dict = Field(..., description="Parameters for document retrieval (e.g., topK, threshold).")
    graphDbConfig: dict = Field(..., description="Configuration for the graph database (e.g., Neo4j URI, username, password).")

class RAGResponse(BaseModel):
    """
    RAG响应模型，返回处理结果。
    """
    message: str = Field(..., description="The result message of the RAG process.")
