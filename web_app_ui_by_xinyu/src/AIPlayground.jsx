import React, { useState, useEffect, useCallback } from 'react';
import './AIPlayground.css';

const AIPlayground = () => {
  const [activeModule, setActiveModule] = useState('Module1'); // 默认模块
  const [platformType, setPlatformType] = useState('OPENAI');
  const [modelType, setModelType] = useState('GPT_4');
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
  const [vectorStore, setVectorStore] = useState('faiss');
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
        return `
from camel.agents import ChatAgent
from camel.configs import ChatGPTConfig
from camel.models import ModelFactory
from camel.types import ModelPlatformType, ModelType

o1_model = ModelFactory.create(
    model_platform=ModelPlatformType.${platformType},
    model_type=ModelType.${modelType},
    model_config_dict=ChatGPTConfig(temperature=0.0).as_dict(),
)

camel_agent = ChatAgent(
    model=o1_model,
    system_message="${systemMessage || 'Default system message'}"
)
user_msg = "${userMessage || 'Your user message here'}"
response = camel_agent.step(user_msg)
print(response.msgs[0].content)
`;

      case 'Module2':
        return `
from camel.agents import RolePlaying
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
response = role_playing.start()
print(response.assistant_message)
`;

      case 'Module3':
        return `
from camel.agents import Workforce
from camel.configs import WorkforceConfig

# Initialize the workforce
workforce = Workforce(
    name="${workforceName || 'Default Workforce'}",
    description="${workforceDesc || 'Workforce description'}",
    coordination_strategy="${coordinationStrategy}"
)

# Add agents to workforce
${agents.map(agent => `workforce.add_agent(
    name="${agent.name || 'Unnamed Agent'}",
    role="${agent.role}",
    model_type="${agent.model}"
)`).join('\n')}

# Execute task
task = "${taskDefinition || 'Default task'}"
result = workforce.execute(task)
print(result)
`;

      case 'Module4':
        return `
# Agentic Synthetic Data Generation
# Coming soon...
`;

      case 'Module5':
        return (
          <div className="module-content">
            <div className="card">
              <h3>Agent with RAG & Graph RAG</h3>
              <p>Configure your agents with retrieval and graph capabilities.</p>
            </div>

            <div className="form">
              {/* Knowledge Base Management */}
              <div className="section-title">Knowledge Base Management</div>
              
              <div className="knowledge-base">
                <div className="upload-section">
                  <div className="file-upload">
                    <input
                      type="file"
                      id="documentSource"
                      onChange={(e) => setDocumentSource(e.target.files[0])}
                      multiple
                      accept=".pdf,.txt,.doc,.docx"
                    />
                    <label htmlFor="documentSource" className="file-upload-label">
                      <i className="upload-icon">📄</i>
                      Upload Documents
                    </label>
                  </div>
                  <p className="upload-hint">Supported formats: PDF, TXT, DOC, DOCX</p>
                </div>

                <div className="uploaded-files">
                  <h4>Uploaded Documents</h4>
                  <div className="file-list">
                    {/* 示例文件列表 */}
                    <div className="file-item">
                      <span>document1.pdf</span>
                      <button className="remove-file">×</button>
                    </div>
                    <div className="file-item">
                      <span>knowledge_base.txt</span>
                      <button className="remove-file">×</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* RAG Configuration */}
              <div className="section-title">RAG Configuration</div>
              
              <div className="form-group">
                <label htmlFor="embeddingModel">Embedding Model</label>
                <select
                  id="embeddingModel"
                  value={embeddingModel}
                  onChange={(e) => setEmbeddingModel(e.target.value)}
                >
                  <option value="text-embedding-3-small">text-embedding-3-small</option>
                  <option value="text-embedding-3-large">text-embedding-3-large</option>
                  <option value="text-embedding-ada-002">text-embedding-ada-002</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="vectorStore">Vector Store</label>
                <select
                  id="vectorStore"
                  value={vectorStore}
                  onChange={(e) => setVectorStore(e.target.value)}
                >
                  <option value="faiss">FAISS</option>
                  <option value="pinecone">Pinecone</option>
                  <option value="milvus">Milvus</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="contextWindow">Context Window Size</label>
                <input
                  type="number"
                  id="contextWindow"
                  value={contextWindow}
                  onChange={(e) => setContextWindow(Number(e.target.value))}
                  min="1000"
                  max="128000"
                  step="1000"
                  className="short-input"
                />
              </div>

              {/* Graph RAG Configuration */}
              <div className="section-title">Graph RAG Configuration</div>
              
              <div className="form-group">
                <label htmlFor="dbType">Knowledge Graph Type</label>
                <select
                  id="dbType"
                  value={graphDbConfig.dbType}
                  onChange={(e) => setGraphDbConfig(prev => ({
                    ...prev,
                    dbType: e.target.value
                  }))}
                >
                  <option value="neo4j">Neo4j</option>
                  <option value="tigergraph">TigerGraph</option>
                  <option value="neptune">Amazon Neptune</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'Module6':
        return (
          <div className="module-content">
            <div className="card">
              <h3>Agents with Human-in-the-loop</h3>
              <p>Configure human oversight and interaction settings for AI agents.</p>
            </div>

            <div className="form">
              {/* Human Layer Integration */}
              <div className="section-title">Human Layer Integration</div>
              
              <div className="form-group">
                <label htmlFor="humanLayerKey">HumanLayer API Key</label>
                <input
                  type="password"
                  id="humanLayerKey"
                  value={humanLayerKey}
                  onChange={(e) => setHumanLayerKey(e.target.value)}
                  placeholder="Enter your HumanLayer API key"
                  className="short-input"
                />
              </div>

              {/* Tool Approval System */}
              <div className="section-title">Tool Approval System</div>
              
              <div className="form-group">
                <label htmlFor="permissionLevel">Permission Level</label>
                <select
                  id="permissionLevel"
                  value={permissionLevel}
                  onChange={(e) => setPermissionLevel(e.target.value)}
                >
                  <option value="strict">Strict (Approve all actions)</option>
                  <option value="moderate">Moderate (Approve risky actions)</option>
                  <option value="lenient">Lenient (Minimal approval needed)</option>
                </select>
              </div>

              {/* Pending Approvals */}
              <div className="section-title">Pending Approvals</div>
              <div className="approval-list">
                <div className="approval-request">
                  <div className="request-header">
                    <span className="tool-name">File System Access</span>
                    <span className="risk-badge high">High Risk</span>
                  </div>
                  <div className="request-content">
                    <p>AI agent requests permission to access file: /data/sensitive.txt</p>
                    <div className="context-info">
                      <span>Purpose: Data analysis</span>
                      <span>Time: 2024-03-21 14:30</span>
                    </div>
                  </div>
                  <div className="action-buttons">
                    <button className="approve-btn">Approve</button>
                    <button className="reject-btn">Reject</button>
                  </div>
                </div>

                <div className="approval-request">
                  <div className="request-header">
                    <span className="tool-name">Database Query</span>
                    <span className="risk-badge low">Low Risk</span>
                  </div>
                  <div className="request-content">
                    <p>AI agent requests to execute SELECT query on user_data table</p>
                    <div className="context-info">
                      <span>Purpose: User verification</span>
                      <span>Time: 2024-03-21 14:28</span>
                    </div>
                  </div>
                  <div className="action-buttons">
                    <button className="approve-btn">Approve</button>
                    <button className="reject-btn">Reject</button>
                  </div>
                </div>
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
            </div>
          </div>
        );

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
    setIsLoading(true);
    try {
      // 模拟API调用
      const mockResponse = "This is a mock response from the AI agent...";
      setResponse(mockResponse);
    } catch (error) {
      console.error(error);
      setResponse("Error occurred while processing request.");
    } finally {
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
      id: Date.now(), // 使用时间戳作为唯一ID
      type: type,
      name: '',
      role: type === 'single' ? 'Agent' : 'Role-Playing Pair',
      platform: 'OPENAI',
      model: 'GPT_4',
      tools: []
    };
    
    setAgents(prevAgents => [...prevAgents, newAgent]);
  };

  const handleRemoveAgent = (index) => {
    setAgents(prevAgents => prevAgents.filter((_, i) => i !== index));
  };

  const handleUpdateAgent = (index, field, value) => {
    setAgents(prevAgents => {
      const newAgents = [...prevAgents];
      newAgents[index] = {
        ...newAgents[index],
        [field]: value
      };
      return newAgents;
    });
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'Module1':
        return (
          <div className="module-content">
            <div className="card">
              <h3>Configure your AI agent with the following parameters:</h3>
              <ul>
                <li>Select your preferred model platform and type</li>
                <li>Enter your API key for authentication</li>
                <li>Customize the system message to define agent behavior</li>
                <li>Input your user message to interact with the agent</li>
              </ul>
            </div>

            <div className="form">
              {/* API Key 输入 */}
              <div className="form-group">
                <label htmlFor="apiKey">API Key</label>
                <input
                  type="text"
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="short-input"
                />
              </div>

              {/* Agent Prompt 输入 */}
              <div className="form-group">
                <label htmlFor="agentPrompt">Agent Prompt</label>
                <textarea
                  id="agentPrompt"
                  value={systemMessage}
                  onChange={(e) => setSystemMessage(e.target.value)}
                  placeholder="Enter agent prompt here..."
                  className="short-textarea"
                />
              </div>

              {/* 平台选择 */}
              <div className="form-group">
                <label htmlFor="platform">Platform Type</label>
                <select
                  id="platform"
                  value={platformType}
                  onChange={(e) => setPlatformType(e.target.value)}
                >
                  {platformOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 模型选择 */}
              <div className="form-group">
                <label htmlFor="model">Model Type</label>
                <select
                  id="model"
                  value={modelType}
                  onChange={(e) => setModelType(e.target.value)}
                >
                  {modelOptions[platformType]?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );
      
      case 'Module2':
        return (
          <div className="module-content">
            <div className="card">
              <h3>Role Playing Session Configuration</h3>
              <p>Configure your role-playing session with the following parameters:</p>
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

              <div className="form-group">
                <label htmlFor="outputLanguage">Output Language</label>
                <select
                  id="outputLanguage"
                  value={outputLanguage}
                  onChange={(e) => setOutputLanguage(e.target.value)}
                >
                  {languageOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Assistant Agent Configuration */}
              <div className="section-title">Assistant Agent</div>
              
              <div className="form-group">
                <label htmlFor="assistantRole">Role Name</label>
                <input
                  type="text"
                  id="assistantRole"
                  value={assistantRole}
                  onChange={(e) => setAssistantRole(e.target.value)}
                  placeholder="Enter assistant role name"
                  className="short-input"
                />
              </div>

              {/* Model Configuration (重用 Module 1 的配置) */}
              <div className="form-group">
                <label htmlFor="platform">Platform Type</label>
                <select
                  id="platform"
                  value={platformType}
                  onChange={(e) => setPlatformType(e.target.value)}
                >
                  {platformOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* User Agent Configuration */}
              <div className="section-title">User Agent</div>
              
              <div className="form-group">
                <label htmlFor="userRole">Role Name</label>
                <input
                  type="text"
                  id="userRole"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  placeholder="Enter user role name"
                  className="short-input"
                />
              </div>

              {/* Critic Agent Toggle */}
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={enableCritic}
                    onChange={(e) => setEnableCritic(e.target.checked)}
                  />
                  Enable Critic Agent for evaluation
                </label>
              </div>
            </div>
          </div>
        );
      
      case 'Module3':
        return (
          <div className="module-content">
            <div className="card">
              <h3>Workforce Session Configuration</h3>
              <p>Configure your workforce to coordinate multiple agents for complex tasks.</p>
            </div>

            <div className="form">
              {/* Workforce Setup */}
              <div className="section-title">Workforce Setup</div>
              
              <div className="form-group">
                <label htmlFor="workforceName">Workforce Name</label>
                <input
                  type="text"
                  id="workforceName"
                  value={workforceName}
                  onChange={(e) => setWorkforceName(e.target.value)}
                  placeholder="Enter workforce name"
                  className="short-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="workforceDesc">Description</label>
                <textarea
                  id="workforceDesc"
                  value={workforceDesc}
                  onChange={(e) => setWorkforceDesc(e.target.value)}
                  placeholder="Describe the workforce purpose and structure..."
                  className="short-textarea"
                />
              </div>

              <div className="form-group">
                <label htmlFor="taskDefinition">Task Definition</label>
                <textarea
                  id="taskDefinition"
                  value={taskDefinition}
                  onChange={(e) => setTaskDefinition(e.target.value)}
                  placeholder="Define the main task to be accomplished..."
                  className="short-textarea"
                />
              </div>

              <div className="form-group">
                <label htmlFor="coordinationStrategy">Coordination Strategy</label>
                <select
                  id="coordinationStrategy"
                  value={coordinationStrategy}
                  onChange={(e) => setCoordinationStrategy(e.target.value)}
                >
                  <option value="sequential">Sequential</option>
                  <option value="parallel">Parallel</option>
                  <option value="hierarchical">Hierarchical</option>
                </select>
              </div>

              {/* Agent Management */}
              <div className="section-title">Agent Management</div>
              
              <div className="agent-controls">
                <button className="control-btn" onClick={() => handleAddAgent('single')}>
                  Add Single Agent
                </button>
                <button className="control-btn" onClick={() => handleAddAgent('pair')}>
                  Add Role-Playing Pair
                </button>
              </div>

              {/* Agent List */}
              <div className="agent-list">
                {agents.map((agent, index) => (
                  <div key={index} className="agent-item">
                    <div className="agent-header">
                      <span>{agent.type === 'single' ? 'Single Agent' : 'Role-Playing Pair'}</span>
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveAgent(index)}
                      >
                        Remove
                      </button>
                    </div>
                    {/* Agent Configuration Form */}
                    {/* ... */}
                  </div>
                ))}
              </div>

              {/* Progress Monitoring */}
              <div className="section-title">Progress Monitoring</div>
              <div className="progress-section">
                <div className="progress-bar">
                  <div className="progress" style={{ width: '0%' }}></div>
                </div>
                <div className="status-text">Ready to start</div>
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
      
      default:
        return getModuleCode(activeModule);
    }
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
          {renderModuleContent()}
        </div>

        {/* 右侧代码和响应区域 */}
        <div className="response-panel">
          <div className="code-container">
            <div className="copy-button-container">
              <button
                className={`copy-button ${copySuccess ? 'success' : ''}`}
                onClick={copyCode}
              >
                {copySuccess ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre><code>{codeExample}</code></pre>
          </div>

          {/* Send Request 按钮 */}
          <button 
            className="submit-btn" 
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? "Processing..." : "Send Request"}
          </button>

          {/* 响应区域 */}
          <div className="response-section">
            <label htmlFor="response">AI Response</label>
            <textarea
              id="response"
              value={response}
              readOnly
              placeholder="AI response will appear here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPlayground;