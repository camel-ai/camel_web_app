import React, { useState, useEffect, useCallback } from 'react';
import './AIPlayground.css';

const AIPlayground = () => {
  const [activeModule, setActiveModule] = useState('Module1'); // 默认模块
  const [platformType, setPlatformType] = useState('OPENAI');
  const [modelType, setModelType] = useState('GPT_4');
  const [temperature, setTemperature] = useState(0.4);
  const [maxTokens, setMaxTokens] = useState(4096);
  const [apiKey, setApiKey] = useState('');
  const [systemMessage, setSystemMessage] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [codeExample, setCodeExample] = useState('');
  const [taskPrompt, setTaskPrompt] = useState('');
  const [outputLanguage, setOutputLanguage] = useState('English');
  const [assistantRole, setAssistantRole] = useState('');
  const [userRole, setUserRole] = useState('');
  const [enableCritic, setEnableCritic] = useState(false);
  const [workforceName, setWorkforceName] = useState('');
  const [workforceDesc, setWorkforceDesc] = useState('');
  const [taskDefinition, setTaskDefinition] = useState('');
  const [agents, setAgents] = useState([]);
  const [coordinationStrategy, setCoordinationStrategy] = useState('sequential');
  const [documentSource, setDocumentSource] = useState('');
  const [embeddingModel, setEmbeddingModel] = useState('text-embedding-3-small');
  const [vectorDatabase, setVectorDatabase] = useState('qdrant');
  const [contextWindow, setContextWindow] = useState(4000);
  const [retrievalParams, setRetrievalParams] = useState({
    topK: 3,
    threshold: 0.7
  });
  const [graphDbConfig, setGraphDbConfig] = useState({
    dbType: 'neo4j',
    uri: '',
    username: '',
    password: ''
  });
  const [humanLayerKey, setHumanLayerKey] = useState('');
  const [permissionLevel, setPermissionLevel] = useState('moderate');
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    browser: true,
    slack: false
  });
  const [approvalHistory, setApprovalHistory] = useState([
    {
      id: 1,
      tool: 'File System Access',
      timestamp: '2024-03-20 10:30:45',
      status: 'approved',
      risk: 'low'
    },
    {
      id: 2,
      tool: 'Database Write',
      timestamp: '2024-03-20 11:15:22',
      status: 'rejected',
      risk: 'high'
    }
  ]);
  const [chatHistory, setChatHistory] = useState([]);
  const [humanInteractionConfig, setHumanInteractionConfig] = useState({
    timeout: 300,
    defaultRisk: 'medium'
  });
  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 1,
      tool: 'File System Access',
      risk: 'high',
      description: 'Request to access sensitive file: /data/users.db',
      requestedBy: 'AI Agent',
      timestamp: '2024-03-21 15:30:00',
      context: {
        purpose: 'Data analysis',
        impact: 'High - Involves sensitive user data'
      }
    },
    {
      id: 2,
      tool: 'External API Call',
      risk: 'medium',
      description: 'Request to call external API: api.example.com',
      requestedBy: 'AI Agent',
      timestamp: '2024-03-21 15:28:00',
      context: {
        purpose: 'Data verification',
        impact: 'Medium - External service interaction'
      }
    }
  ]);
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'approval',
      timestamp: '2024-03-21 15:25:00',
      description: 'Approved database query request'
    },
    {
      id: 2,
      type: 'rejection',
      timestamp: '2024-03-21 15:20:00',
      description: 'Rejected unauthorized file access attempt'
    }
  ]);
  const [tourGuideConfig, setTourGuideConfig] = useState({
    systemMessage: "You have to lead everyone to have fun"
  });
  const [plannerConfig, setPlannerConfig] = useState({
    systemMessage: "Expert at creating detailed tour plans"
  });
  const [selectedTools, setSelectedTools] = useState({
    search: true,
    weather: true,
    maps: true,
    math: false,
    twitter: false,
    retrieval: false,
    slack: false,
    linkedin: false,
    reddit: false,
  });
  const [assistantSelectedToolkits, setAssistantSelectedToolkits] = useState(
    {
      search: true,
      weather: true,
      maps: true,
      math: false,
      twitter: false,
      retrieval: false,
      slack: false,
      linkedin: false,
      reddit: false,
    }
  );
  const [userSelectedToolkits, setUserSelectedToolkits] = useState(
    {
      search: true,
      weather: true,
      maps: true,
      math: false,
      twitter: false,
      retrieval: false,
      slack: false,
      linkedin: false,
      reddit: false,
    }
  );
  const [taskId, setTaskId] = useState('task_001');
  const [workflowProgress, setWorkflowProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [toolkits, setToolkits] = useState([]);
  const [useCustomModel, setUseCustomModel] = useState(false);
  const [apiType, setApiType] = useState('camel'); // 用于选择 API 类型
  const [customModel, setCustomModel] = useState(''); // 用于自定义模型
  const [showToolkits, setShowToolkits] = useState(false); // 用于Module1中控制工具包列表的显示
  const [showAssistantToolkits, setShowAssistantToolkits] = useState(false); // 用于Module2中Assistant工具包列表的显示
  const [showUserToolkits, setShowUserToolkits] = useState(false); // 用于Module2中User工具包列表的显示
  const [ragType, setRagType] = useState('rag'); // 新增状态变量，用于控制 RAG 类型（'rag' 或 'graph-rag'）

  const modules = [
    { id: 'Module1', title: 'Create Your First Agent' },
    { id: 'Module2', title: 'Role Playing Session' },
    { id: 'Module3', title: 'Workforce Session' },
    { id: 'Module4', title: 'Synthetic Data' },
    { id: 'Module5', title: 'RAG & Graph RAG' },
    { id: 'Module6', title: 'Human-in-the-loop' }
  ];

  const handleModuleChange = (module) => {
    setActiveModule(module);
    // 这里可以添加切换模块时的逻辑
  };

  const platformOptions = [
    { value: 'OPENAI', label: 'OpenAI' },
    { value: 'MISTRALAI', label: 'MistralAI' },
    { value: 'ANTHROPIC', label: 'Anthropic' },
    { value: 'QWEN', label: 'Qwen' },
    { value: 'DEEPSEEK', label: 'DeepSeek' },
  ];

  const modelOptions = {
    OPENAI: [
        { value: 'GPT_4o', label: 'GPT-4o' },
        { value: 'GPT_4o_mini', label: 'GPT-4o-mini' },
        { value: 'o1', label: 'o1' },
        { value: 'o1_preview', label: 'o1-preview' },
        { value: 'o1_mini', label: 'o1-mini' },
        { value: 'GPT_4_TURBO', label: 'GPT-4-turbo' },
        { value: 'GPT_4', label: 'GPT-4' },
        { value: 'GPT_3_5_TURBO', label: 'GPT-3.5-Turbo' }
      ],
      MISTRALAI: [
        { value: 'MISTRAL_LARGE_2', label: 'Mistral-large-2' },
        { value: 'MISTRAL_12B_2409', label: 'Mistral-12b-2409' },
        { value: 'MISTRAL_8B_LATEST', label: 'Mistral-8b-latest' },
        { value: 'MISTRAL_3B_LATEST', label: 'Mistral-3b-latest' },
        { value: 'OPEN_MISTRAL_7B', label: 'Open-mistral-7b' },
        { value: 'OPEN_MISTRAL_NEMO', label: 'Open-mistral-nemo' },
        { value: 'CODESTRAL', label: 'Codestral' },
        { value: 'OPEN_MIXTRAL_8X7B', label: 'Open-mixtral-8x7b' },
        { value: 'OPEN_MIXTRAL_8X22B', label: 'Open-mixtral-8x22b' },
        { value: 'OPEN_CODESTRAL_MAMBA', label: 'Open-codestral-mamba' },
      ],
      ANTHROPIC: [
        { value: 'CLAUDE_3_5_SONNET_LATEST', label: 'Claude-3-5-Sonnet-latest' },
        { value: 'CLAUDE_3_5_HAIKU_LATEST', label: 'Claude-3-5-haiku-latest' },
        { value: 'CLAUDE_3_HAIKU_20240307', label: 'Claude-3-haiku-20240307' },
        { value: 'CLAUDE_3_SONNET_20240229', label: 'Claude-3-sonnet-20240229' },
        { value: 'CLAUDE_3_OPUS_LATEST', label: 'Claude-3-opus-latest' },
        { value: 'CLAUDE_2_0', label: 'Claude-2.0' }
      ],
      QWEN: [
        { value: 'QWEN_32b_preview', label: 'Qwen-32b-preview' },
        { value: 'QWEN_MAX', label: 'Qwen-max' },
        { value: 'QWEN_PLUS', label: 'Qwen-plus' },
        { value: 'QWEN_TURBO', label: 'Qwen-turbo' },
        { value: 'QWEN_LONG', label: 'Qwen-long' },
        { value: 'QWEN_VL_MAX', label: 'Qwen-vl-max' },
        { value: 'QWEN_MATH_PLUS', label: 'Qwen-math-plus' },
        { value: 'QWEN_MATH_TURBO', label: 'Qwen-math-turbo' },
        { value: 'QWEN_CODER_TURBO', label: 'Qwen-coder-turbo' },
        { value: 'QWEN2_5_CODER_32B_INSTRUCT', label: 'Qwen2.5-coder-32b-instruct' },
        { value: 'QWEN2_5_72B_INSTRUCT', label: 'Qwen2.5-72b-instruct' },
        { value: 'QWEN2_5_32B_INSTRUCT', label: 'Qwen2.5-32b-instruct' },
        { value: 'QWEN2_5_14B_INSTRUCT', label: 'Qwen2.5-14b-instruct' },
      ],
      DEEPSEEK: [
        { value: 'DEEPSEEK_CHAT', label: 'DeepSeek-chat' },
        { value: 'DEEPSEEK_REASONER', label: 'DeepSeek-reasoner' },
      ],
  };

  const getModuleCode = (moduleType) => {
    switch (moduleType) {
      case 'Module1':
        return `from camel.agents import ChatAgent
from camel.configs import ChatGPTConfig
from camel.models import ModelFactory
from camel.types import ModelPlatformType, ModelType

model = ModelFactory.create(
  model_platform=ModelPlatformType.${platformType},
  model_type=ModelType.${modelType},
  api_key="${apiKey}",
  url="${baseUrl}",
  model_config_dict=ChatGPTConfig(temperature=0.0).as_dict(),(temperature=0.0).as_dict(),
)

camel_agent = ChatAgent(
    model=model,
    system_message="${systemMessage || 'Default system message'}"
)
user_msg = "${userMessage || 'Your user message here'}"
response = camel_agent.step(user_msg)
print(response.msgs[0].content)
`;

      case 'Module2':
        return `from camel.agents import RolePlaying
from camel.configs import ChatGPTConfig
from camel.models import ModelFactory

# Initialize the role-playing session
role_playing = RolePlaying(
    assistant_role_name="${assistantRole || 'Assistant'}",
    user_role_name="${userRole || 'User'}",
    task_prompt="${taskPrompt || 'Default task'}",
    output_language="${outputLanguage}",
    model_config=ChatGPTConfig(temperature=0.7)
)

# Start the conversation
while True:
    user_input = input("User: ")
    response = role_playing.step(user_input)
    print(f"Assistant: {response.assistant_message}")
`;

      case 'Module3':
        return `from camel.agents import ChatAgent
from camel.messages import BaseMessage
from camel.models import ModelFactory
from camel.societies import Workforce
from camel.tasks import Task
from camel.toolkits import (
    GoogleMapsToolkit,
    SearchToolkit,
    WeatherToolkit,
    MathToolkit,
    TwitterToolkit,
    RetrievalToolkit,
    SlackToolkit,
    LinkedInToolkit,
    RedditToolkit,
)
from camel.types import ModelPlatformType, ModelType

# Set up tools
function_list = [
    *SearchToolkit().get_tools(),
    *WeatherToolkit().get_tools(),
    *GoogleMapsToolkit().get_tools(),
]

# Set up single agents
guide_agent = ChatAgent(
    system_message=BaseMessage.make_assistant_message(
        role_name="tour guide",
        content="You have to lead everyone to have fun",
    )
)

planner_agent = ChatAgent(
    system_message=BaseMessage.make_assistant_message(
        role_name="planner",
        content="Expert at creating detailed tour plans",
    )
)

# Set up role-playing pair configuration
model_platform = ModelPlatformType.DEFAULT
model_type = ModelType.DEFAULT
assistant_role_name = "Searcher"
user_role_name = "Professor"

assistant_agent_kwargs = dict(
    model=ModelFactory.create(
        model_platform=model_platform,
        model_type=model_type,
    ),
    tools=function_list,
)

user_agent_kwargs = dict(
    model=ModelFactory.create(
        model_platform=model_platform,
        model_type=model_type,
    ),
)

# Create and configure workforce with both single agents and role-playing pairs
workforce = Workforce('Travel Planning Team')

# Add role-playing pair
workforce.add_role_playing_worker(
    'Research Team',
    assistant_role_name,
    user_role_name,
    assistant_agent_kwargs,
    user_agent_kwargs,
    max_turns=1,
)

# Add single agents
workforce.add_single_agent_worker(
    'Tour Guide',
    worker=guide_agent,
).add_single_agent_worker(
    'Travel Planner',
    worker=planner_agent,
)

# Define and process task
task = Task(
    content="Research the history of Paris and create a comprehensive tour plan.",
    id='task_001',
)

# Process task through workforce
result = workforce.process_task(task)
print('Task Result:', result.result)
`;

      case 'Module4':
        return `# Agentic Synthetic Data Generation
# Coming soon...
`;

      case 'Module5':
        return `# RAG (Retrieval-Augmented Generation) Implementation
from camel.embeddings import OpenAIEmbedding
from camel.retrievers import AutoRetriever
from camel.storages import QdrantStorage
from camel.types import StorageType
from camel.models import ModelFactory
from camel.agents import ChatAgent, KnowledgeGraphAgent
from camel.loaders import UnstructuredIO
from camel.storages import Neo4jGraph

# 1. Document Processing
# Initialize document loader
loader = UnstructuredIO()
documents = loader.load_documents("${documentSource || 'local_data/'}")

# 2. RAG Setup
# Initialize embedding model
embedding_model = OpenAIEmbedding(
    model_name="${embeddingModel}"  # Using selected embedding model
)

# Initialize vector store
vector_store = ${vectorDatabase}.create(
    embedding_model=embedding_model,
    documents=documents
)

# Configure retriever
retriever = AutoRetriever(
    vector_store=vector_store,
    top_k=${retrievalParams.topK},  # Using configured top K
    similarity_threshold=${retrievalParams.threshold}  # Using configured threshold
)

# 3. Graph RAG Setup
# Initialize Neo4j connection
graph_db = Neo4jGraph(
    url="${graphDbConfig.uri}",  # Using configured URI
    username="${graphDbConfig.username}",
    password="${graphDbConfig.password}"
)

# Initialize Knowledge Graph Agent
kg_agent = KnowledgeGraphAgent(
    model=ModelFactory.create(
        model_platform=ModelPlatformType.${platformType},
        model_type=ModelType.${modelType}
    )
)

# 4. Process and Store Knowledge
# Extract entities and relationships
for doc in documents:
    # Process document
    elements = kg_agent.process_document(doc)
    
    # Store in vector database
    vector_store.add_elements(elements)
    
    # Store in graph database
    graph_db.add_graph_elements(elements)

# 5. Query Example
query = "How does CAMEL handle knowledge integration?"

# Get vector-based results
vector_results = retriever.retrieve(
    query=query,
    top_k=${retrievalParams.topK}
)

# Get graph-based results
graph_query = f"""
MATCH (n)-[r]->(m)
WHERE n.content CONTAINS '{query}'
RETURN n, r, m
LIMIT ${retrievalParams.topK}
"""
graph_results = graph_db.query(graph_query)

# Combine and process results
combined_results = {
    'vector_results': vector_results,
    'graph_results': graph_results
}

print("Combined Knowledge Results:")
print(combined_results)
`;

      case 'Module6':
        return `from camel.human import HumanLayer
from camel.agents import ChatAgent
from camel.models import ModelFactory
from camel.types import ModelPlatformType, ModelType
from camel.configs import HumanInteractionConfig

# 1. Initialize Human Layer with configured settings
human_layer = HumanLayer(
    api_key="${humanLayerKey}",  # From API Configuration
    notification_settings={
        "email": ${notificationSettings.email},  # From Notification Settings
        "browser": ${notificationSettings.browser},
        "slack": ${notificationSettings.slack}
    }
)

# 2. Configure human interaction settings
interaction_config = HumanInteractionConfig(
    timeout_seconds=${humanInteractionConfig.timeout},  # From Human Interaction Settings
    default_risk_level="${humanInteractionConfig.defaultRisk}"
)

# 3. Initialize AI model with human-in-the-loop capabilities
model = ModelFactory.create(
    model_platform=ModelPlatformType.${platformType},
    model_type=ModelType.${modelType}
)

agent = ChatAgent(
    model=model,
    human_layer=human_layer,
    interaction_config=interaction_config
)

# 4. Current pending approvals (from Pending Approvals section)
pending_approvals = [
    ${pendingApprovals.map(item => `{
        "id": "${item.id}",
        "tool": "${item.tool}",
        "risk": "${item.risk}",
        "description": "${item.description}",
        "context": {
            "purpose": "${item.context.purpose}",
            "impact": "${item.context.impact}"
        }
    }`).join(',\n    ')}
]

# 5. Recent activity log (from Recent Activity section)
activity_history = [
    ${recentActivity.map(activity => `{
        "id": "${activity.id}",
        "type": "${activity.type}",
        "timestamp": "${activity.timestamp}",
        "description": "${activity.description}"
    }`).join(',\n    ')}
]

# Example usage of human-in-the-loop functionality
def execute_with_approval(action, data, risk_level=None):
    """Execute action with human approval based on risk level."""
    risk = risk_level or interaction_config.default_risk_level
    
    # Request human approval
    approval_request = human_layer.request_approval(
        action=action,
        data=data,
        risk_level=risk,
        context={
            "purpose": "Sensitive operation execution",
            "impact": f"{risk.capitalize()} risk operation",
            "requested_by": "AI Agent",
            "timestamp": "${new Date().toISOString()}"
        }
    )
    
    if approval_request.approved:
        return f"Executing {action} with approved data: {data}"
    else:
        return f"Operation {action} was rejected by human supervisor"

# Example workflow
response = agent.step("I need to perform a sensitive operation.")
print("Agent response:", response.content)

# Request human approval for a sensitive operation
result = execute_with_approval(
    action="access_sensitive_data",
    data="user_records.db",
    risk_level="high"
)
print("Operation result:", result)

# Get current approval status and history
pending = human_layer.get_pending_approvals()
history = human_layer.get_activity_history()
print("Pending approvals:", pending)
print("Activity history:", history)
`;

      default:
        return null;
    }
  };

  const updateCodeExample = useCallback(() => {
    const newCode = getModuleCode(activeModule);
    setCodeExample(newCode);
  }, [activeModule, platformType, modelType, systemMessage, userMessage, 
      assistantRole, userRole, taskPrompt, outputLanguage,
      workforceName, workforceDesc, coordinationStrategy, agents, taskDefinition]);

  useEffect(() => {
    updateCodeExample();
  }, [updateCodeExample]);

  const handleSubmit = async () => {
    if (!userMessage.trim()) return;

    // 添加用户消息到历史记录
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    
    // 清空输入框
    setUserMessage('');
    
    // 设置加载状态
    setIsLoading(true);

    try {
      // 这里添加与后端的通信逻辑
      // const response = await sendToBackend(userMessage);
      
      // 模拟 AI 响应
      setTimeout(() => {
        setChatHistory(prev => [...prev, {
          role: 'assistant',
          content: 'This is a simulated response from the RAG-enhanced AI. In production, this would be replaced with actual API calls to your backend.'
        }]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeExample);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('copy code failed:', err);
    }
  };

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Chinese', label: '中文' },
    { value: 'Japanese', label: '日本語' },
    { value: 'Korean', label: '한국어' },
  ];

  const handleAddAgent = (type) => {
    const newAgent = {
      id: Date.now(),
      type: type,
      name: '',
      systemMessage: '',
      assistantRole: '',
      userRole: '',
      tools: []
    };
    setAgents(prev => [...prev, newAgent]);
  };

  const handleRemoveAgent = (index) => {
    setAgents(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateAgent = (index, field, value) => {
    setAgents(prev => prev.map((agent, i) => 
      i === index ? { ...agent, [field]: value } : agent
    ));
  };

  const handleToolToggle = (agentIndex, tool, checked) => {
    setAgents(prev => prev.map((agent, i) => {
      if (i === agentIndex) {
        const tools = checked 
          ? [...agent.tools, tool]
          : agent.tools.filter(t => t !== tool);
        return { ...agent, tools };
      }
      return agent;
    }));
  };

  const handleApproval = (id, action) => {
    setPendingApprovals(prev => prev.filter(item => item.id !== id));
    setRecentActivity(prev => [{
      id: Date.now(),
      type: action,
      timestamp: new Date().toLocaleString(),
      description: `${action === 'approve' ? 'Approved' : 'Rejected'} request #${id}`
    }, ...prev]);
  };

  const handleStartRAG = async () => {
    if (!documentSource) return;
    
    setIsLoading(true);
    try {
      // 这里添加实际的 RAG 处理逻辑
      // 1. 上传文档
      // 2. 处理嵌入
      // 3. 构建知识图谱
      // 4. 更新状态
      
      // 模拟处理时间
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 成功后更新状态
      setIsLoading(false);
      // 可以添加成功提示
      alert('RAG process completed successfully!');
      
    } catch (error) {
      console.error('RAG process failed:', error);
      setIsLoading(false);
      // 可以添加错误提示
      alert('Failed to process RAG: ' + error.message);
    }
  };

  const handleStartWorkflow = async () => {
    if (agents.length === 0) return;
    
    setIsLoading(true);
    setWorkflowProgress(0);
    
    try {
      // 模拟工作流程序
      const steps = [
        { name: 'Initializing agents...', progress: 20 },
        { name: 'Setting up tools...', progress: 40 },
        { name: 'Configuring workforce...', progress: 60 },
        { name: 'Processing task...', progress: 80 },
        { name: 'Finalizing results...', progress: 100 }
      ];

      for (const step of steps) {
        setCurrentStep(step.name);
        setWorkflowProgress(step.progress);
        // 模拟处理时间
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // 完成后的处理
      setIsLoading(false);
      alert('Workforce process completed successfully!');
      
    } catch (error) {
      console.error('Workforce process failed:', error);
      setIsLoading(false);
      setWorkflowProgress(0);
      alert('Failed to process workforce: ' + error.message);
    }
  };

  const renderParameterPanel = () => {
    switch (activeModule) {
      case 'Module1':
        return (
          <div className="module-content">
            <div className="card">
              <h3>Configure your AI agent with the following parameters:</h3>
              <ul>
                <li>Select your preferred model platform and type</li>
                <li>Enter your API key for authentication</li>
                <li>Enter the Base URL for API calls</li>
                <li>Customize the system message to define agent behavior</li>
                <li>Input your user message to interact with the agent</li>
                <li>Select your preferred toolkits</li>
              </ul>
            </div>

            <div className="form">
              {/* API 类型选择标签页 */}
              <div className="tab-container">
                <button 
                  className={`tab-button ${apiType === 'camel' ? 'active' : ''}`} 
                  onClick={() => setApiType('camel')}
                >
                  CAMEL-supported model
                </button>
                <button 
                  className={`tab-button ${apiType === 'custom' ? 'active' : ''}`} 
                  onClick={() => setApiType('custom')}
                >
                  Custom model
                </button>
                <button 
                  className={`tab-button ${apiType === 'openai' ? 'active' : ''}`} 
                  onClick={() => setApiType('openai')}
                >
                  OpenAI compatible API
                </button>
                <button 
                  className={`tab-button ${apiType === 'on-device' ? 'active' : ''}`} 
                  onClick={() => setApiType('on-device')}
                >
                  On-Device Opensource Model
                </button>
              </div>

              {/* Available Toolkits */}
              <div className="form-group">
                <label className="toolkit-label" onClick={() => setShowToolkits(prev => !prev)}>
                  Available Toolkits
                  <span 
                    className={`arrow ${showToolkits ? 'open' : 'closed'}`} 
                  >
                    {showToolkits ? '▲' : '▼'}
                  </span>
                </label>
                {showToolkits && (
                  <div className="toolkit-options">
                    {Object.keys(selectedTools).map(tool => (
                      <label key={tool} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={selectedTools[tool]}
                          onChange={(e) => setSelectedTools(prev => ({
                            ...prev,
                            [tool]: e.target.checked
                          }))}
                        />
                        {tool.charAt(0).toUpperCase() + tool.slice(1)} {/* 首字母大写 */}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* 根据选择的 API 类型渲染不同的输入框 */}
              {apiType === 'camel' && (
                <>
                  {/* CAMEL supported model */}
                  <div className="form-group">
                    <label htmlFor="platform">model_platform</label>
                    <select
                      id="platform"
                      value={platformType}
                      onChange={(e) => setPlatformType(e.target.value)}
                      className="short-select"
                    >
                      {platformOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="model">model_type</label>
                    <select
                      id="model"
                      value={modelType}
                      onChange={(e) => setModelType(e.target.value)}
                      className="short-select"
                    >
                      {modelOptions[platformType]?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {apiType === 'custom' && (
                <>
                  <div className="form-group">
                    <label>model_platform</label>
                    <input
                      type="text"
                      id="platform"
                      value={platformType}
                      onChange={(e) => setPlatformType(e.target.value)}
                      placeholder="Enter model platform"
                      className="short-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="customModel">model_name</label>
                    <input
                      type="text"
                      id="customModel"
                      value={modelType}
                      onChange={(e) => setModelType(e.target.value)}
                      placeholder="Enter model name"
                      className="short-input"
                    />
                  </div>
                </>
              )}

              {apiType === 'openai' && (
                <>
                  <div className="form-group">
                    <label htmlFor="openaicompatibleApiKey">api_key</label>
                    <input
                      type="text"
                      id="openaicompatibleApiKey"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter openai-compatible API key"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="openaicompatibleBaseUrl">base_url</label>
                    <input
                      type="text"
                      id="openaicompatibleBaseUrl"
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                      placeholder="Enter openai-compatible base URL"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="openaicompatibleModelType">model_type</label>
                    <input
                      type="text"
                      id="openaicompatibleModelType"
                      value={modelType}
                      onChange={(e) => setModelType(e.target.value)}
                      placeholder="Enter openai-compatible model type"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="temperature">temperature</label>
                    <input
                      type="text"
                      id="temperature"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      placeholder="Enter temperature"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="maxTokens">max_tokens</label>
                    <input
                      type="text"
                      id="maxTokens"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(e.target.value)}
                      placeholder="Enter max tokens"
                      className="short-input"
                    />
                  </div>
                </>
              )}

              {apiType === 'on-device' && (
                <>
                {/* model platform is fixed to ollama, user cannot change it, and it's grayed out*/}
                  <div className="form-group">
                    <label htmlFor="onDeviceModel">model_platform</label>
                    <input
                      type="text"
                      id="onDeviceModel"
                      value="ollama"
                      className="short-input-disabled"
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="onDeviceModel">model_name</label>
                    <input
                      type="text"
                      id="onDeviceModel"
                      value={modelType}
                      onChange={(e) => setModelType(e.target.value)}
                      placeholder="Enter on-device model name"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="onDeviceConfig">base_url</label>
                    <input
                      type="text"
                      id="onDeviceConfig"
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                      placeholder="Enter base url"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="onDeviceConfig">temperature</label>
                    <input
                      type="text"
                      id="onDeviceConfig"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      placeholder="Enter temperature"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="onDeviceConfig">max_tokens</label>
                    <input
                      type="text"
                      id="onDeviceConfig"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(e.target.value)}
                      placeholder="Enter max tokens"
                      className="short-input"
                    />
                  </div>
                </>
              )}

              {/* API Key 输入 */}
              <div className="form-group">
                <label htmlFor="apiKey">api_key</label>
                <input
                  type="text"
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="short-input"
                />
              </div>

              {/* Base URL 输入 */}
              <div className="form-group">
                <label htmlFor="baseUrl">Base URL</label>
                <input
                  type="text"
                  id="baseUrl"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="Enter the base URL"
                  className="short-input"
                />
              </div>

              {/* Agent Prompt 输入（重命名为系统消息） */}
              <div className="form-group">
                <label htmlFor="agentPrompt">System Message</label>
                <textarea
                  id="agentPrompt"
                  value={systemMessage}
                  onChange={(e) => setSystemMessage(e.target.value)}
                  placeholder="Enter system message here..."
                  className="short-textarea"
                />
              </div>
            </div>
          </div>
        );
      
      case 'Module2':
        return (
          <div className="module-content">
            <div className="card">
              <h3>Configure your role-playing session with the following parameters:</h3>
              
            </div>

            <div className="form">
              {/* Task Configuration */}
              <div className="section-title">Task Configuration</div>
              
              <div className="form-group">
                <label htmlFor="taskPrompt">Task Prompt</label>
                <textarea
                  id="taskPrompt"
                  value={taskPrompt}
                  onChange={(e) => setTaskPrompt(e.target.value)}
                  placeholder="Define the task for agents to accomplish..."
                  className="short-textarea"
                />
              </div>

              {/* Assistant Agent Configuration */}
              <div className="section-title">Assistant Agent</div>
              <div className="form">
              {/* API 类型选择标签页 */}
              <div className="tab-container">
                <button 
                  className={`tab-button ${apiType === 'camel' ? 'active' : ''}`} 
                  onClick={() => setApiType('camel')}
                >
                  CAMEL-supported model
                </button>
                <button 
                  className={`tab-button ${apiType === 'custom' ? 'active' : ''}`} 
                  onClick={() => setApiType('custom')}
                >
                  Custom model
                </button>
                <button 
                  className={`tab-button ${apiType === 'openai' ? 'active' : ''}`} 
                  onClick={() => setApiType('openai')}
                >
                  OpenAI compatible API
                </button>
                <button 
                  className={`tab-button ${apiType === 'on-device' ? 'active' : ''}`} 
                  onClick={() => setApiType('on-device')}
                >
                  On-Device Opensource Model
                </button>
              </div>

              {/* Available Toolkits */}
              <div className="form-group">
                <label className="toolkit-label" onClick={() => setShowAssistantToolkits(prev => !prev)}>
                  Available Toolkits
                  <span 
                    className={`arrow ${showAssistantToolkits ? 'open' : 'closed'}`} 
                    
                  >
                    {showAssistantToolkits ? '▲' : '▼'}
                  </span>
                </label>
                {showAssistantToolkits && (
                  <div className="toolkit-options">
                    {Object.keys(assistantSelectedToolkits).map(tool => (
                      <label key={tool} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={assistantSelectedToolkits[tool]}
                          onChange={(e) => setAssistantSelectedToolkits(prev => ({
                            ...prev,
                            [tool]: e.target.checked
                          }))}
                        />
                        {tool.charAt(0).toUpperCase() + tool.slice(1)} {/* 首字母大写 */}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* 根据选择的 API 类型渲染不同的输入框 */}
              {apiType === 'camel' && (
                <>
                  {/* CAMEL supported model */}
                  <div className="form-group">
                    <label htmlFor="platform">model_platform</label>
                    <select
                      id="platform"
                      value={platformType}
                      onChange={(e) => setPlatformType(e.target.value)}
                      className="short-select"
                    >
                      {platformOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="model">model_type</label>
                    <select
                      id="model"
                      value={modelType}
                      onChange={(e) => setModelType(e.target.value)}
                      className="short-select"
                    >
                      {modelOptions[platformType]?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {apiType === 'custom' && (
                <>
                  <div className="form-group">
                    <label>model_platform</label>
                    <input
                      type="text"
                      id="platform"
                      value={platformType}
                      onChange={(e) => setPlatformType(e.target.value)}
                      placeholder="Enter model platform"
                      className="short-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="customModel">model_name</label>
                    <input
                      type="text"
                      id="customModel"
                      value={modelType}
                      onChange={(e) => setModelType(e.target.value)}
                      placeholder="Enter model name"
                      className="short-input"
                    />
                  </div>
                </>
              )}

              {apiType === 'openai' && (
                <>
                  <div className="form-group">
                    <label htmlFor="openaicompatibleApiKey">api_key</label>
                    <input
                      type="text"
                      id="openaicompatibleApiKey"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter openai-compatible API key"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="openaicompatibleBaseUrl">base_url</label>
                    <input
                      type="text"
                      id="openaicompatibleBaseUrl"
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                      placeholder="Enter openai-compatible base URL"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="openaicompatibleModelType">model_type</label>
                    <input
                      type="text"
                      id="openaicompatibleModelType"
                      value={modelType}
                      onChange={(e) => setModelType(e.target.value)}
                      placeholder="Enter openai-compatible model type"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="temperature">temperature</label>
                    <input
                      type="text"
                      id="temperature"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      placeholder="Enter temperature"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="maxTokens">max_tokens</label>
                    <input
                      type="text"
                      id="maxTokens"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(e.target.value)}
                      placeholder="Enter max tokens"
                      className="short-input"
                    />
                  </div>
                </>
              )}

              {apiType === 'on-device' && (
                <>
                {/* model platform is fixed to ollama, user cannot change it, and it's grayed out*/}
                  <div className="form-group">
                    <label htmlFor="onDeviceModel">model_platform</label>
                    <input
                      type="text"
                      id="onDeviceModel"
                      value="ollama"
                      className="short-input-disabled"
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="onDeviceModel">model_name</label>
                    <input
                      type="text"
                      id="onDeviceModel"
                      value={modelType}
                      onChange={(e) => setModelType(e.target.value)}
                      placeholder="Enter on-device model name"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="onDeviceConfig">base_url</label>
                    <input
                      type="text"
                      id="onDeviceConfig"
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                      placeholder="Enter base url"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="onDeviceConfig">temperature</label>
                    <input
                      type="text"
                      id="onDeviceConfig"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      placeholder="Enter temperature"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="onDeviceConfig">max_tokens</label>
                    <input
                      type="text"
                      id="onDeviceConfig"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(e.target.value)}
                      placeholder="Enter max tokens"
                      className="short-input"
                    />
                  </div>
                </>
              )}

              {/* API Key 输入 */}
              <div className="form-group">
                <label htmlFor="apiKey">api_key</label>
                <input
                  type="text"
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="short-input"
                />
              </div>

              {/* Base URL 输入 */}
              <div className="form-group">
                <label htmlFor="baseUrl">Base URL</label>
                <input
                  type="text"
                  id="baseUrl"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="Enter the base URL"
                  className="short-input"
                />
              </div>

              {/* Agent Prompt 输入（重命名为系统消息） */}
              <div className="form-group">
                <label htmlFor="agentPrompt">System Message</label>
                <textarea
                  id="agentPrompt"
                  value={systemMessage}
                  onChange={(e) => setSystemMessage(e.target.value)}
                  placeholder="Enter system message here..."
                  className="short-textarea"
                />
              </div>
            </div>
              

              {/* User Agent Configuration */}
              <div className="section-title">User Agent</div>
              <div className="form">
              {/* API 类型选择标签页 */}
              <div className="tab-container">
                <button 
                  className={`tab-button ${apiType === 'camel' ? 'active' : ''}`} 
                  onClick={() => setApiType('camel')}
                >
                  CAMEL-supported model
                </button>
                <button 
                  className={`tab-button ${apiType === 'custom' ? 'active' : ''}`} 
                  onClick={() => setApiType('custom')}
                >
                  Custom model
                </button>
                <button 
                  className={`tab-button ${apiType === 'openai' ? 'active' : ''}`} 
                  onClick={() => setApiType('openai')}
                >
                  OpenAI compatible API
                </button>
                <button 
                  className={`tab-button ${apiType === 'on-device' ? 'active' : ''}`} 
                  onClick={() => setApiType('on-device')}
                >
                  On-Device Opensource Model
                </button>
              </div>

              {/* Available Toolkits */}
              <div className="form-group">
                <label className="toolkit-label" onClick={() => setShowUserToolkits(prev => !prev)}>
                  Available Toolkits
                  <span 
                    className={`arrow ${showUserToolkits ? 'open' : 'closed'}`} 
                  >
                    {showUserToolkits ? '▲' : '▼'}
                  </span>
                </label>
                {showUserToolkits && (
                  <div className="toolkit-options">
                    {Object.keys(userSelectedToolkits).map(tool => (
                      <label key={tool} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={userSelectedToolkits[tool]}
                          onChange={(e) => setUserSelectedToolkits(prev => ({
                            ...prev,
                            [tool]: e.target.checked
                          }))}
                        />
                        {tool.charAt(0).toUpperCase() + tool.slice(1)} {/* 首字母大写 */}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* 根据选择的 API 类型渲染不同的输入框 */}
              {apiType === 'camel' && (
                <>
                  {/* CAMEL supported model */}
                  <div className="form-group">
                    <label htmlFor="platform">model_platform</label>
                    <select
                      id="platform"
                      value={platformType}
                      onChange={(e) => setPlatformType(e.target.value)}
                      className="short-select"
                    >
                      {platformOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="model">model_type</label>
                    <select
                      id="model"
                      value={modelType}
                      onChange={(e) => setModelType(e.target.value)}
                      className="short-select"
                    >
                      {modelOptions[platformType]?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {apiType === 'custom' && (
                <>
                  <div className="form-group">
                    <label>model_platform</label>
                    <input
                      type="text"
                      id="platform"
                      value={platformType}
                      onChange={(e) => setPlatformType(e.target.value)}
                      placeholder="Enter model platform"
                      className="short-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="customModel">model_name</label>
                    <input
                      type="text"
                      id="customModel"
                      value={modelType}
                      onChange={(e) => setModelType(e.target.value)}
                      placeholder="Enter model name"
                      className="short-input"
                    />
                  </div>
                </>
              )}

              {apiType === 'openai' && (
                <>
                  <div className="form-group">
                    <label htmlFor="openaicompatibleApiKey">api_key</label>
                    <input
                      type="text"
                      id="openaicompatibleApiKey"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter openai-compatible API key"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="openaicompatibleBaseUrl">base_url</label>
                    <input
                      type="text"
                      id="openaicompatibleBaseUrl"
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                      placeholder="Enter openai-compatible base URL"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="openaicompatibleModelType">model_type</label>
                    <input
                      type="text"
                      id="openaicompatibleModelType"
                      value={modelType}
                      onChange={(e) => setModelType(e.target.value)}
                      placeholder="Enter openai-compatible model type"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="temperature">temperature</label>
                    <input
                      type="text"
                      id="temperature"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      placeholder="Enter temperature"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="maxTokens">max_tokens</label>
                    <input
                      type="text"
                      id="maxTokens"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(e.target.value)}
                      placeholder="Enter max tokens"
                      className="short-input"
                    />
                  </div>
                </>
              )}

              {apiType === 'on-device' && (
                <>
                {/* model platform is fixed to ollama, user cannot change it, and it's grayed out*/}
                  <div className="form-group">
                    <label htmlFor="onDeviceModel">model_platform</label>
                    <input
                      type="text"
                      id="onDeviceModel"
                      value="ollama"
                      className="short-input-disabled"
                      disabled
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="onDeviceModel">model_name</label>
                    <input
                      type="text"
                      id="onDeviceModel"
                      value={modelType}
                      onChange={(e) => setModelType(e.target.value)}
                      placeholder="Enter on-device model name"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="onDeviceConfig">base_url</label>
                    <input
                      type="text"
                      id="onDeviceConfig"
                      value={baseUrl}
                      onChange={(e) => setBaseUrl(e.target.value)}
                      placeholder="Enter base url"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="onDeviceConfig">temperature</label>
                    <input
                      type="text"
                      id="onDeviceConfig"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      placeholder="Enter temperature"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="onDeviceConfig">max_tokens</label>
                    <input
                      type="text"
                      id="onDeviceConfig"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(e.target.value)}
                      placeholder="Enter max tokens"
                      className="short-input"
                    />
                  </div>
                </>
              )}

              {/* API Key 输入 */}
              <div className="form-group">
                <label htmlFor="apiKey">api_key</label>
                <input
                  type="text"
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="short-input"
                />
              </div>

              {/* Base URL 输入 */}
              <div className="form-group">
                <label htmlFor="baseUrl">Base URL</label>
                <input
                  type="text"
                  id="baseUrl"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="Enter the base URL"
                  className="short-input"
                />
              </div>

              {/* Agent Prompt 输入（重命名为系统消息） */}
              <div className="form-group">
                <label htmlFor="agentPrompt">System Message</label>
                <textarea
                  id="agentPrompt"
                  value={systemMessage}
                  onChange={(e) => setSystemMessage(e.target.value)}
                  placeholder="Enter system message here..."
                  className="short-textarea"
                />
              </div>
            </div>
            </div>
          </div>
        );
      
      case 'Module3':
        return (
          <div className="module-content">
            <div className="card">
              <h3>Workforce Configuration</h3>
              <p>Configure your workforce with single agents and role-playing pairs.</p>
            </div>

            <div className="form">
              {/* Workforce Basic Settings */}
              <div className="section-title">Workforce Settings</div>
              <div className="form-group">
                <label>Workforce Description</label>
                <input
                  type="text"
                  value={workforceName}
                  onChange={(e) => setWorkforceName(e.target.value)}
                  placeholder="e.g., Travel Planning Team"
                  className="short-input"
                />
              </div>

              {/* Agent Management Buttons */}
              <div className="agent-management">
                <button 
                  className="add-agent-btn"
                  onClick={() => handleAddAgent('single')}
                >
                  <span className="icon">➕</span>
                  Add Single Agent
                </button>
                <button 
                  className="add-agent-btn"
                  onClick={() => handleAddAgent('pair')}
                >
                  <span className="icon">➕</span>
                  Add Role-Playing Pair
                </button>
              </div>

              {/* Agent List */}
              <div className="agent-list">
                {agents.map((agent, index) => (
                  <div key={agent.id} className="agent-config">
                    <div className="agent-header">
                      <h4>{agent.type === 'single' ? 'Single Agent' : 'Role-Playing Pair'}</h4>
                      <button 
                        className="remove-agent-btn"
                        onClick={() => handleRemoveAgent(index)}
                      >
                        ✕
                      </button>
                    </div>

                    {agent.type === 'single' ? (
                      // Single Agent Configuration
                      <>
                        <div className="form-group">
                          <label>Agent Name</label>
                          <input
                            type="text"
                            value={agent.name}
                            onChange={(e) => handleUpdateAgent(index, 'name', e.target.value)}
                            placeholder="e.g., Tour Guide"
                            className="short-input"
                          />
                        </div>
                        <div className="form-group">
                          <label>System Message</label>
                          <textarea
                            value={agent.systemMessage}
                            onChange={(e) => handleUpdateAgent(index, 'systemMessage', e.target.value)}
                            placeholder="Define agent's behavior..."
                          />
                        </div>
                      </>
                    ) : (
                      // Role-Playing Pair Configuration
                      <>
                        <div className="form-group">
                          <label>Assistant Role</label>
                          <input
                            type="text"
                            value={agent.assistantRole}
                            onChange={(e) => handleUpdateAgent(index, 'assistantRole', e.target.value)}
                            placeholder="e.g., Researcher"
                            className="short-input"
                          />
                        </div>
                        <div className="form-group">
                          <label>User Role</label>
                          <input
                            type="text"
                            value={agent.userRole}
                            onChange={(e) => handleUpdateAgent(index, 'userRole', e.target.value)}
                            placeholder="e.g., Professor"
                            className="short-input"
                          />
                        </div>
                      </>
                    )}

                    {/* Tools Selection */}
                    <div className="tools-section">
                      <label className="section-label">Available Tools</label>
                      <div className="tools-selection">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={agent.tools.includes('search')}
                            onChange={(e) => handleToolToggle(index, 'search', e.target.checked)}
                          />
                          Search Tools
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={agent.tools.includes('weather')}
                            onChange={(e) => handleToolToggle(index, 'weather', e.target.checked)}
                          />
                          Weather Tools
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={agent.tools.includes('maps')}
                            onChange={(e) => handleToolToggle(index, 'maps', e.target.checked)}
                          />
                          Google Maps Tools
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={agent.tools.includes('math')}
                            onChange={(e) => handleToolToggle(index, 'math', e.target.checked)}
                          />
                          MathToolkit
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={agent.tools.includes('twitter')}
                            onChange={(e) => handleToolToggle(index, 'twitter', e.target.checked)}
                          />
                          TwitterToolkit
                        </label>
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={agent.tools.includes('retrieval')}
                            onChange={(e) => handleToolToggle(index, 'retrieval', e.target.checked)}
                          />
                          RetrievalToolkit
                        </label>
                        <label className="checkbox-label"> 
                          <input
                            type="checkbox"
                            checked={agent.tools.includes('slack')}
                            onChange={(e) => handleToolToggle(index, 'slack', e.target.checked)}
                          />
                          SlackToolkit
                        </label>
                        <label className="checkbox-label"> 
                          <input
                            type="checkbox"
                            checked={agent.tools.includes('linkedin')}
                            onChange={(e) => handleToolToggle(index, 'linkedin', e.target.checked)}
                          />
                          LinkedInToolkit
                        </label>
                        <label className="checkbox-label"> 
                          <input
                            type="checkbox"
                            checked={agent.tools.includes('reddit')}
                            onChange={(e) => handleToolToggle(index, 'reddit', e.target.checked)}
                          />
                          RedditToolkit
                        </label>
                      
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Task Configuration */}
              <div className="section-title">Task Definition</div>
              <div className="form-group">
                <label>Task Content</label>
                <textarea
                  value={taskDefinition}
                  onChange={(e) => setTaskDefinition(e.target.value)}
                  placeholder="e.g., Research the history of Paris and create a comprehensive tour plan."
                />
              </div>

              {/* 添加进度条和开始按钮 */}
              <div className="workflow-control">
                <div className="progress-section">
                  <div className="progress-info">
                    <span className="progress-label">Workflow Progress</span>
                    <span className="progress-percentage">{`${workflowProgress}%`}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${workflowProgress}%` }}
                    ></div>
                  </div>
                  <div className="progress-status">
                    {isLoading ? currentStep : 'Ready to start'}
                  </div>
                </div>

                <button 
                  className="start-workflow-btn"
                  disabled={isLoading || agents.length === 0}
                  onClick={handleStartWorkflow}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span className="icon">🚀</span>
                      <span>Start Workforce</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'Module4':
        return (
          <div className="module-content">
            <div className="card coming-soon">
              <h3>Agentic Synthetic Data Generation</h3>
              <div className="coming-soon-content">
                <p>Coming Soon</p>
                <p className="description">This feature is currently under development.</p>
              </div>
            </div>
          </div>
        );
      
      case 'Module5':
        return (
          <div className="module-content">
            <div className="card">
              <h3>RAG & Graph RAG Configuration</h3>
              <p>Configure your knowledge base and retrieval settings.</p>
            </div>

            {/* RAG 类型选择标签页 */}
            <div className="tab-container">
              <button 
                className={`tab-button ${ragType === 'rag' ? 'active' : ''}`} 
                onClick={() => setRagType('rag')}
              >
                RAG
              </button>
              <button 
                className={`tab-button ${ragType === 'graph-rag' ? 'active' : ''}`} 
                onClick={() => setRagType('graph-rag')}
              >
                Graph RAG
              </button>
            </div>

            <div className="form">
              {/* 基础 RAG 配置 */}
              {ragType === 'rag' && (
                <>
                  {/* Document Upload Section */}
                  <div className="section-title">Document Management</div>
                  <div className="upload-section">
                    <input
                      type="file"
                      id="documentUpload"
                      onChange={(e) => setDocumentSource(e.target.files[0])}
                      multiple
                      accept=".pdf,.txt,.doc,.docx"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="documentUpload" className="upload-button">
                      <i className="upload-icon">📄</i>
                      Upload Documents
                    </label>
                    <p className="upload-hint">Supported: PDF, TXT, DOC, DOCX</p>
                  </div>

                  {/* RAG Configuration */}
                  <div className="section-title">RAG Settings</div>
                  <div className="form-group">
                    <label>Embedding Model</label>
                    <select
                      value={embeddingModel}
                      onChange={(e) => setEmbeddingModel(e.target.value)}
                    >
                      <option value="text-embedding-3-small">text-embedding-3-small</option>
                      <option value="text-embedding-3-large">text-embedding-3-large</option>
                      <option value="text-embedding-ada-002">text-embedding-ada-002</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Vector Store</label>
                    <select
                      value={vectorDatabase}
                      onChange={(e) => setVectorDatabase(e.target.value)}
                    >
                      <option value="QDRANT">Qdrant</option>
                      <option value="MILVUS">Milvus</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Top K Results</label>
                    <input
                      type="number"
                      value={retrievalParams.topK}
                      onChange={(e) => setRetrievalParams(prev => ({
                        ...prev,
                        topK: Number(e.target.value)
                      }))}
                      min="1"
                      max="20"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Similarity Threshold</label>
                    <input
                      type="range"
                      value={retrievalParams.threshold}
                      onChange={(e) => setRetrievalParams(prev => ({
                        ...prev,
                        threshold: Number(e.target.value)
                      }))}
                      min="0"
                      max="1"
                      step="0.1"
                      className="slider"
                    />
                    <span className="slider-value">{retrievalParams.threshold}</span>
                  </div>
                </>
              )}

              {/* Graph RAG 配置 */}
              {ragType === 'graph-rag' && (
                <>
                  <div className="section-title">Graph Database</div>
                  <div className="form-group">
                    <label>Database Type</label>
                    <select
                      value={graphDbConfig.dbType}
                      onChange={(e) => setGraphDbConfig(prev => ({
                        ...prev,
                        dbType: e.target.value
                      }))}
                    >
                      <option value="neo4j">Neo4j</option>
                      <option value="Nebula">Nebula</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Database URI</label>
                    <input
                      type="text"
                      value={graphDbConfig.uri}
                      onChange={(e) => setGraphDbConfig(prev => ({
                        ...prev,
                        uri: e.target.value
                      }))}
                      placeholder="neo4j://localhost:7687"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      value={graphDbConfig.username}
                      onChange={(e) => setGraphDbConfig(prev => ({
                        ...prev,
                        username: e.target.value
                      }))}
                      placeholder="neo4j"
                      className="short-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      value={graphDbConfig.password}
                      onChange={(e) => setGraphDbConfig(prev => ({
                        ...prev,
                        password: e.target.value
                      }))}
                      placeholder="Enter password"
                      className="short-input"
                    />
                  </div>
                </>
              )}

              {/* 添加开始按钮 */}
              <div className="rag-action">
                <button 
                  className="start-rag-btn"
                  disabled={!documentSource || isLoading}
                  onClick={handleStartRAG}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span className="icon">🚀</span>
                      <span>Start {ragType.toUpperCase()} Process</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'Module6':
        return (
          <div className="module-content">
            <div className="card">
              <h3>Human-in-the-loop Configuration</h3>
              <p>Configure human interaction and approval settings.</p>
            </div>

            <div className="form">
              {/* API Configuration */}
              <div className="section-title">API Configuration</div>
              <div className="form-group">
                <label>HumanLayer API Key</label>
                <input
                  type="password"
                  value={humanLayerKey}
                  onChange={(e) => setHumanLayerKey(e.target.value)}
                  placeholder="Enter HumanLayer API key"
                  className="short-input"
                />
              </div>

              {/* Human Interaction Settings */}
              <div className="section-title">Human Interaction Settings</div>
              <div className="form-group">
                <label>Response Timeout (seconds)</label>
                <input
                  type="number"
                  value={humanInteractionConfig.timeout}
                  onChange={(e) => setHumanInteractionConfig(prev => ({
                    ...prev,
                    timeout: Number(e.target.value)
                  }))}
                  min="30"
                  max="3600"
                  className="short-input"
                />
              </div>

              <div className="form-group">
                <label>Default Risk Level</label>
                <select
                  value={humanInteractionConfig.defaultRisk}
                  onChange={(e) => setHumanInteractionConfig(prev => ({
                    ...prev,
                    defaultRisk: e.target.value
                  }))}
                >
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>
              </div>

              {/* Notification Settings */}
              <div className="section-title">Notification Settings</div>
              <div className="notification-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={notificationSettings.email}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      email: e.target.checked
                    }))}
                  />
                  Email Notifications
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={notificationSettings.browser}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      browser: e.target.checked
                    }))}
                  />
                  Browser Notifications
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={notificationSettings.slack}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      slack: e.target.checked
                    }))}
                  />
                  Slack Notifications
                </label>
              </div>

              {/* Pending Approvals */}
              <div className="section-title">Pending Approvals</div>
              <div className="approval-list">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="approval-request">
                    <div className="request-header">
                      <span className="tool-name">{item.tool}</span>
                      <span className={`risk-badge ${item.risk}`}>{item.risk} risk</span>
                    </div>
                    <div className="request-content">
                      <p>{item.description}</p>
                      <div className="context-info">
                        <span>Requested by: {item.requestedBy}</span>
                        <span>Time: {item.timestamp}</span>
                      </div>
                      <div className="additional-context">
                        <div className="context-item">
                          <span className="context-label">Purpose:</span>
                          <span>{item.context.purpose}</span>
                        </div>
                        <div className="context-item">
                          <span className="context-label">Impact:</span>
                          <span>{item.context.impact}</span>
                        </div>
                      </div>
                    </div>
                    <div className="action-buttons">
                      <button 
                        className="approve-btn"
                        onClick={() => handleApproval(item.id, 'approve')}
                      >
                        Approve
                      </button>
                      <button 
                        className="reject-btn"
                        onClick={() => handleApproval(item.id, 'reject')}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="section-title">Recent Activity</div>
              <div className="activity-list">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'approval' ? '✓' : activity.type === 'rejection' ? '✗' : '!'}
                    </div>
                    <div className="activity-content">
                      <div className="activity-header">
                        <span className="activity-type">{activity.type}</span>
                        <span className="activity-time">{activity.timestamp}</span>
                      </div>
                      <p className="activity-description">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return getModuleCode(activeModule);
    }
  };

  const renderResponsePanel = () => {
    return (
      <div className="response-panel">
        {/* Module3 的 Workforce 可视化 */}
        {activeModule === 'Module3' && (
          <div className="workforce-visualization">
            <h3>Workforce Flow Visualization</h3>
            <div className="workflow-container">
              <svg className="workflow-svg" viewBox="0 0 800 400">
                {/* Workforce 中心节点 */}
                <circle cx="400" cy="200" r="45" className="node workforce-node" />
                <text x="400" y="200" className="node-text">
                  {workforceName || 'Workforce'}
                </text>

                {/* 动态生成 Agent 节点 */}
                {agents.map((agent, index) => {
                  const angle = (2 * Math.PI * index) / agents.length;
                  const radius = 150;
                  const x = 400 + radius * Math.cos(angle);
                  const y = 200 + radius * Math.sin(angle);

                  return (
                    <g key={agent.id}>
                      {/* Agent 节点 */}
                      <circle 
                        cx={x} 
                        cy={y} 
                        r="35" 
                        className={`node ${agent.type === 'single' ? 'single-agent-node' : 'pair-agent-node'}`}
                      />
                      <text x={x} y={y} className="node-text">
                        {agent.type === 'single' ? agent.name : 'Role Pair'}
                      </text>
                      
                      {/* 连接线 */}
                      <line 
                        x1="400" 
                        y1="200" 
                        x2={x} 
                        y2={y} 
                        className={`connection ${isLoading ? 'active' : ''}`} 
                      />

                      {/* 任务状态指示器 */}
                      {isLoading && (
                        <g className="task-indicator">
                          <circle 
                            cx={x + 40} 
                            cy={y - 40} 
                            r="15" 
                            className="task-status"
                          />
                          <text 
                            x={x + 40} 
                            y={y - 40} 
                            className="task-status-text"
                          >
                            {workflowProgress >= (index + 1) * (100 / agents.length) ? '✓' : '...'}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* Task 指示器 */}
                {isLoading && (
                  <g className="task-flow">
                    <text x="400" y="150" className="task-label">
                      {currentStep}
                    </text>
                    <circle 
                      cx="400" 
                      cy="200" 
                      r="55" 
                      className="progress-ring"
                      style={{
                        strokeDasharray: `${workflowProgress * 3.45}, 345`
                      }}
                    />
                  </g>
                )}
              </svg>
            </div>
          </div>
        )}

        {/* Module5 的知识图谱可视化 */}
        {activeModule === 'Module5' && (
          <div className="graph-visualization">
            <h3>Knowledge Graph Visualization</h3>
            <div className="graph-container">
              <svg className="graph-svg" viewBox="0 0 800 400">
                {/* 中心节点 - Knowledge Graph */}
                <circle cx="400" cy="200" r="40" className="node main-node" />
                <text x="400" y="200" className="node-text main-text">Knowledge Graph</text>
                
                {/* CAMEL 节点 */}
                <circle cx="400" cy="80" r="35" className="node camel-node" />
                <text x="400" y="80" className="node-text">CAMEL</text>
                <line x1="400" y1="120" x2="400" y2="160" className="connection" />
                
                {/* Entities 节点 */}
                <circle cx="250" cy="200" r="35" className="node entity-node" />
                <text x="250" y="200" className="node-text">Entities</text>
                <line x1="285" y1="200" x2="360" y2="200" className="connection" />
                
                {/* Relations 节点 */}
                <circle cx="550" cy="200" r="35" className="node relation-node" />
                <text x="550" y="200" className="node-text">Relations</text>
                <line x1="440" y1="200" x2="515" y2="200" className="connection" />
                
                {/* Model 节点 */}
                <circle cx="400" cy="320" r="35" className="node model-node" />
                <text x="400" y="320" className="node-text">Model</text>
                <line x1="400" y1="240" x2="400" y2="285" className="connection" />
              </svg>
            </div>
          </div>
        )}

        {/* 代码容器 */}
        <div className="code-container">
          <div className="copy-button-container">
            <button
              className={`copy-button ${copySuccess ? 'success' : ''}`}
              onClick={copyCode}
            >
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre><code>{getModuleCode(activeModule)}</code></pre>
        </div>

        {/* Module1 和 Module2 的聊天窗口 */}
        {(activeModule === 'Module1' || activeModule === 'Module2') && (
          <div className="chat-interface">
            <div className="chat-title">
              <h3>Chat with AI</h3>
              <p className="chat-hint">
                {activeModule === 'Module1' 
                  ? 'Ask questions about the agent and its configuration'
                  : 'Ask questions about the role-playing session'}
              </p>
            </div>
            
            <div className="chat-history">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.role}`}>
                  <div className="message-content">{msg.content}</div>
                </div>
              ))}
            </div>

            <div className="chat-input-container">
              <textarea
                className="chat-input"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder={
                  activeModule === 'Module1'
                    ? "Ask agent anything..."
                    : "Ask role-playing agent anything..."
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <button 
                className="send-button"
                disabled={isLoading || !userMessage.trim()}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Module5 的聊天界面 */}
        {activeModule === 'Module5' && (
          <div className="chat-interface rag-chat">
            <div className="chat-title">
              <h3>Chat with RAG-Enhanced AI</h3>
              <p className="chat-hint">Ask questions about your uploaded documents</p>
            </div>
            
            <div className="chat-history">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.role}`}>
                  <div className="message-content">{msg.content}</div>
                </div>
              ))}
            </div>

            <div className="chat-input-container">
              <textarea
                className="chat-input"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Ask a question about your documents..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              />
              <button 
                className="send-button"
                disabled={isLoading || !userMessage.trim()}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="ai-playground-container">
      <h1 className="title">CAMEL Agent Playground</h1>
      
      <div className="layout">
        {/* 左侧模块切换按钮 */}
        <div className="module-buttons">
          {modules.map((module) => (
            <button
              key={module.id}
              className={`module-button ${activeModule === module.id ? 'active' : ''}`}
              onClick={() => handleModuleChange(module.id)}
            >
              {module.title}
            </button>
          ))}
        </div>

        {/* 左侧参数栏 */}
        <div className="parameter-panel">
          {renderParameterPanel()}
        </div>

        {/* 右侧代码和响应区域 */}
        {renderResponsePanel()}
      </div>
    </div>
  );
};

export default AIPlayground;