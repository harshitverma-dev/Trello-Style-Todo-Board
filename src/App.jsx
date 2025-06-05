import './App.css'
import { TodoProvider } from './context/TodoContext'
import TodoBoard from './components/TodoBoard'

function App() {

  return (
     <TodoProvider>
      <div className="App">
        <TodoBoard />
      </div>
    </TodoProvider>
  )
}

export default App
