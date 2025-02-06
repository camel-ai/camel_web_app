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

  const modules = ['Module1', 'Module2', 'Module3', 'Module4', 'Module5', 'Module6'];

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

  const updateCodeExample = useCallback(() => {
    const newCode = `
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
    setCodeExample(newCode);
  }, [platformType, modelType, systemMessage, userMessage]);

  useEffect(() => {
    updateCodeExample();
  }, [platformType, modelType, systemMessage, userMessage, updateCodeExample]);

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

  return (
    <div className="ai-playground-container">
      <h1 className="title">CAMEL Agent Playground</h1>
      
      <div className="layout">
        {/* 左侧模块切换按钮 */}
        <div className="module-buttons">
          {modules.map((module) => (
            <button
              key={module}
              className={`module-button ${activeModule === module ? 'active' : ''}`}
              onClick={() => handleModuleChange(module)}
            >
              {module}
            </button>
          ))}
        </div>

        {/* 左侧参数栏 */}
        <div className="parameter-panel">
          <div className="card">
            <p>Configure your AI agent with the following parameters:</p>
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