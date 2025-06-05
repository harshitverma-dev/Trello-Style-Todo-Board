

import { createContext, useContext, useReducer, useEffect } from "react"
import todoReducer from "./Reducers"
import TODO_ACTIONS from "./Actions"

const initialState = {
  todos: [],
  loading: false,
  error: null,
  editingTodo: null,
}

const TodoContext = createContext()

export const useTodos = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider")
  }
  return context
}

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const API_BASE_URL = "https://dummyjson.com/todos"


  const fetchTodos = async () => {
    dispatch({ type: TODO_ACTIONS.SET_LOADING, payload: true })
    try {
      const response = await fetch(`${API_BASE_URL}?limit=20`)
      const data = await response.json()

   
      const todosWithStatus = data.todos.map((todo) => ({
        ...todo,
        status: todo.completed ? "completed" : "pending",
        description: `Task ${todo.id} description`, 
      }))

      dispatch({ type: TODO_ACTIONS.SET_TODOS, payload: todosWithStatus })
    } catch (error) {
      dispatch({ type: TODO_ACTIONS.SET_ERROR, payload: error.message })
    }
  }


  const createTodo = async (todoData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: todoData.todo,
          completed: false,
          userId: 1,
        }),
      })

      const newTodo = await response.json()
      const todoWithStatus = {
        ...newTodo,
        status: "pending",
        description: todoData.description || "",
      }

      dispatch({ type: TODO_ACTIONS.ADD_TODO, payload: todoWithStatus })
      return todoWithStatus
    } catch (error) {
      dispatch({ type: TODO_ACTIONS.SET_ERROR, payload: error.message })
      throw error
    }
  }


  const updateTodo = async (id, updates) => {
    try {
     
      if (updates.status && !["pending", "inprogress", "completed"].includes(updates.status)) {
        throw new Error("Invalid status provided")
      }

     
      const currentTodo = state.todos.find((todo) => todo.id === id)
      if (!currentTodo) {
        throw new Error("Todo not found")
      }

     
      const optimisticUpdate = {
        ...currentTodo,
        ...updates,
        completed: updates.status === "completed",
      }
      dispatch({ type: TODO_ACTIONS.UPDATE_TODO, payload: optimisticUpdate })

     
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed: updates.status === "completed",
          todo: updates.todo || currentTodo.todo,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const updatedTodo = await response.json()

      
      const finalUpdate = {
        ...currentTodo,
        ...updates,
        ...updatedTodo,
        completed: updates.status === "completed",
      }

      dispatch({ type: TODO_ACTIONS.UPDATE_TODO, payload: finalUpdate })
      return finalUpdate
    } catch (error) {
      
      const originalTodo = state.todos.find((todo) => todo.id === id)
      if (originalTodo) {
        dispatch({ type: TODO_ACTIONS.UPDATE_TODO, payload: originalTodo })
      }

      dispatch({ type: TODO_ACTIONS.SET_ERROR, payload: error.message })
      throw error
    }
  }


  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      })

      dispatch({ type: TODO_ACTIONS.DELETE_TODO, payload: id })
    } catch (error) {
      dispatch({ type: TODO_ACTIONS.SET_ERROR, payload: error.message })
      throw error
    }
  }


  const setEditingTodo = (todo) => {
    dispatch({ type: TODO_ACTIONS.SET_EDITING_TODO, payload: todo })
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const value = {
    ...state,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    setEditingTodo,
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}
