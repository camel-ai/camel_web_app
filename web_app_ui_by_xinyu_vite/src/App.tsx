import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AIPlayground from './AIPlayground'
import './AIPlayground.css'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    
      <div className="App">
        <AIPlayground />
      </div>
  );
}

export default App
