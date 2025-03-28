import { useState } from 'react'
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
