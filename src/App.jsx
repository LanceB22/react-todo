import { useState } from 'react'
import { Footer } from './components/footer'
import { TodoItems } from './Components/TodoItems'
import { EmptyState } from './Components/EmptyState'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'

function todoFactory (text) {
  
  return {
    text,
    done: false,
    timestamp: new Date().toLocaleString(),
  }
}

function App() {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useLocalStorage('todos')

  const handleSubmit = (e) => {
    e.preventDefault()
    // const data = new FormData(e.target)
    setTodos(prev => ([...prev, todoFactory(input)])) // input <> data.get('todo')
    setInput('')
  }
  
  return (
    <div className="App">
      <article className="card" id="container">
      <h1 id="heading">My React To-do's list</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
          <label htmlFor="todo-input">Submit a to-do item:</label>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            name="todo"
            type="text" 
            id="todo-input" 
            placeholder="Enter a to-do item"
            title="Please fill out this field" 
            required />
        </form>
        <TodoItems todos={todos} setTodos={setTodos} />
        <EmptyState todos={todos}/>
        <Footer todos={todos} setTodos={setTodos}/>
      </article>
    </div>
  )
}

export default App