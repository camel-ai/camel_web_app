import React, { useState } from 'react';

const CAMELWebApp: React.FC = () => {
  const [activePage, setActivePage] = useState<'home' | 'models' | 'agentsCreate' | 'agentsInteract' | 'history'>('home');
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const handleNavigation = (page: 'home' | 'models' | 'agentsCreate' | 'agentsInteract' | 'history') => {
    setActivePage(page);
  };

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };


  return (
    <div className="min-h-screen bg-gray-900 text-gray-50">
      {/* Header */}
      <header className="bg-gray-800 p-4 flex justify-between items-center">
          <button onClick={toggleSidebar} className="text-gray-100 focus:outline-none md:hidden">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
          <h1 className="text-2xl font-bold">CAMEL Web App</h1>
      </header>

      <div className="flex">
      {/* Sidebar */}
      <aside
          className={`bg-gray-800 w-64 p-4 space-y-4 transition-all duration-300  ${isSideBarOpen ? 'block' : 'hidden md:block'}`}
      >
        <nav>
          <NavItem
            label="首页"
            icon="🏠"
            active={activePage === 'home'}
            onClick={() => handleNavigation('home')}
            color="blue-500"
          />
          <NavItem
            label="模型管理"
            icon="🤖"
            active={activePage === 'models'}
            onClick={() => handleNavigation('models')}
            color="green-500"
          />
          <NavItem
            label="智能体创建"
            icon="🧠"
            active={activePage === 'agentsCreate'}
            onClick={() => handleNavigation('agentsCreate')}
            color="indigo-500"
          />
          <NavItem
            label="多智能体交互"
            icon="🤝"
            active={activePage === 'agentsInteract'}
            onClick={() => handleNavigation('agentsInteract')}
            color="purple-500"
          />
          <NavItem
            label="历史记录"
            icon="📜"
            active={activePage === 'history'}
            onClick={() => handleNavigation('history')}
            color="red-500"
          />
        </nav>
      </aside>

          {/* Main Content */}
          <main className={`flex-1 p-8 transition-all duration-300 ${isSideBarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
            {activePage === 'home' && <HomePage />}
            {activePage === 'models' && <ModelManagementPage />}
            {activePage === 'agentsCreate' && <AgentCreationPage />}
            {activePage === 'agentsInteract' && <MultiAgentInteractionPage />}
            {activePage === 'history' && <HistoryPage />}
          </main>
      </div>
    </div>
  );
};

interface NavItemProps {
    label: string;
    icon: string;
    active: boolean;
    onClick: () => void;
    color: string;
}


const NavItem: React.FC<NavItemProps> = ({ label, icon, active, onClick, color }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center p-2 rounded-md hover:bg-gray-700 focus:outline-none w-full text-left ${active ? `bg-gray-700` : ''}`}
        >
            <span className={`text-xl mr-2 text-${color}`}>{icon}</span>
            <span>{label}</span>
        </button>
    );
};

const HomePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold mb-4">欢迎来到 CAMEL Web App</h2>
      <p className="text-lg">
        CAMEL (Communicative Agents for “Mind” Exploration of Large Scale Language Models)
        是一个用于探索大型语言模型能力的框架。
      </p>
      <div className="flex space-x-4 mt-8">
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors">
          开始创建智能体
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors">
          查看示例
        </button>
      </div>
    </div>
  );
};

const ModelManagementPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold mb-4">模型管理</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ModelCard name="Model A" description="This is model A." />
        <ModelCard name="Model B" description="This is model B." />
        <ModelCard name="Model C" description="This is model C." />
        <ModelCard name="Model D" description="This is model D." />

      </div>
      <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">
        添加模型
      </button>
    </div>
  );
};

interface ModelCardProps {
    name: string;
    description: string;
}

const ModelCard: React.FC<ModelCardProps> = ({name, description}) => {
    return (
        <div className="bg-gray-800 p-4 rounded-md border border-gray-700 hover:border-blue-500 transition-colors">
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <p className="text-gray-400">{description}</p>
            <div className="mt-4 flex justify-end space-x-2">
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-2 rounded-md text-sm">配置</button>
                <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md text-sm">删除</button>
            </div>
        </div>
    )
}



const AgentCreationPage: React.FC = () => {
    const [step, setStep] = useState(1)
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold mb-4">智能体创建</h2>
        <div className="bg-gray-800 p-6 rounded-md border border-gray-700">
            <div className="mb-4">
                <div className="flex space-x-4 mb-4">
                    <span className={`inline-block w-10 h-10 rounded-full flex justify-center items-center text-white font-semibold ${step === 1 ? 'bg-blue-500' : 'bg-gray-600'}`}>1</span>
                     <span className={`inline-block w-10 h-10 rounded-full flex justify-center items-center text-white font-semibold ${step === 2 ? 'bg-blue-500' : 'bg-gray-600'}`}>2</span>
                      <span className={`inline-block w-10 h-10 rounded-full flex justify-center items-center text-white font-semibold ${step === 3 ? 'bg-blue-500' : 'bg-gray-600'}`}>3</span>
                 </div>

                {step === 1 && (
                    <div className="space-y-4">
                       <h3 className="text-xl font-semibold">角色配置</h3>
                        <div>
                           <label className="block text-gray-300 mb-2">智能体名称</label>
                           <input type="text" className="bg-gray-700 border border-gray-600 rounded-md p-2 w-full text-gray-50"/>
                        </div>
                        <div>
                             <label className="block text-gray-300 mb-2">角色描述</label>
                            <textarea className="bg-gray-700 border border-gray-600 rounded-md p-2 w-full text-gray-50" />
                        </div>
                        <button onClick={() => setStep(2)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">下一步</button>
                    </div>
                )}

                  {step === 2 && (
                    <div className="space-y-4">
                       <h3 className="text-xl font-semibold">模型选择</h3>
                        <div>
                           <label className="block text-gray-300 mb-2">选择模型</label>
                           <select className="bg-gray-700 border border-gray-600 rounded-md p-2 w-full text-gray-50">
                              <option value="modelA">Model A</option>
                               <option value="modelB">Model B</option>
                           </select>
                        </div>
                        <button onClick={() => setStep(3)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">下一步</button>
                        <button onClick={() => setStep(1)} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md">上一步</button>

                    </div>
                )}


                {step === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">工具集成</h3>
                        <div>
                           <label className="block text-gray-300 mb-2">选择工具</label>
                           <div className="flex space-x-4">
                                <button className="bg-gray-700 border border-gray-600 rounded-md p-2">工具 1</button>
                                <button className="bg-gray-700 border border-gray-600 rounded-md p-2">工具 2</button>

                           </div>
                        </div>
                         <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">保存智能体</button>
                       <button onClick={() => setStep(2)} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md">上一步</button>
                    </div>
                )}


            </div>
        </div>
    </div>
  );
};



const MultiAgentInteractionPage: React.FC = () => {
    const [messages, setMessages] = useState([
       {sender: 'user', content: 'Hello, AI!'},
       {sender: 'ai', content: 'Hello, User! How can I help you today?'}
    ])

    const [newMessage, setNewMessage] = useState('')

    const handleSendMessage = () => {
        setMessages([...messages, { sender: 'user', content: newMessage}])
        setNewMessage('')

         // Simulate AI response
        setTimeout(() => {
            setMessages(prevMessages => [
                ...prevMessages,
                {sender: 'ai', content: `I received your message: ${newMessage}!`}
            ])
        }, 1000)
    }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold mb-4">多智能体交互</h2>
      <div className="bg-gray-800 p-6 rounded-md border border-gray-700 h-[500px] overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
             <div key={index} className={`p-3 rounded-md w-fit max-w-[80%] ${message.sender === 'user' ? 'bg-blue-700 ml-auto' : 'bg-green-700'}`}>
               {message.content}
            </div>
          ))}
        </div>
      </div>
       <div className="flex mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="输入消息..."
          className="flex-1 bg-gray-700 border border-gray-600 rounded-l-md p-2 text-gray-50"
        />
        <button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r-md">发送</button>
      </div>
        <div className="flex justify-end mt-4 space-x-2">
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">重置会话</button>
           <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">导出对话</button>
        </div>
    </div>
  );
};



const HistoryPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold mb-4">历史记录</h2>
        <div className="space-y-4">
        <HistoryCard title="Conversation 1" date="2024-05-17" />
          <HistoryCard title="Conversation 2" date="2024-05-16" />
            <HistoryCard title="Conversation 3" date="2024-05-15" />
         </div>
    </div>
  );
};

interface HistoryCardProps {
    title: string;
    date: string;
}

const HistoryCard: React.FC<HistoryCardProps> = ({title, date}) => {
    return (
        <div className="bg-gray-800 p-4 rounded-md border border-gray-700 hover:border-blue-500 transition-colors flex justify-between items-center">
            <div>
               <h3 className="text-xl font-semibold mb-2">{title}</h3>
               <p className="text-gray-400">{date}</p>
            </div>
            <div className="space-x-2">
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-1 px-2 rounded-md text-sm">查看详情</button>
                <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md text-sm">删除</button>
            </div>
        </div>
    )
}

export default CAMELWebApp;