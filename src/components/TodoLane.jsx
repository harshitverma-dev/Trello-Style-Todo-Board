import { useState } from "react"
import { useTodos } from "../context/TodoContext"
import TodoCard from "./TodoCard"

const TodoLane = ({ title, status, todos, bgColor }) => {
  const { updateTodo, todos: allTodos } = useTodos()
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)


  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false)
    }
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    setIsDragOver(false)

    const todoId = Number.parseInt(e.dataTransfer.getData("text/plain"))
    const draggedTodo = allTodos.find((todo) => todo.id === todoId)


    if (draggedTodo && draggedTodo.status !== status) {
      setIsUpdating(true)
      try {
        await updateTodo(todoId, { status })
        console.log(`Todo ${todoId} moved to ${status}`)
      } catch (error) {
        console.error("Failed to update todo status:", error)
        alert("Failed to move task. Please try again.")
      } finally {
        setIsUpdating(false)
      }
    }
  }

  return (
    <div
      className={`${bgColor} rounded-lg p-4 min-h-96 shadow-lg transition-all duration-200 
                 ${isDragOver ? "ring-2 ring-blue-400 ring-opacity-50 scale-105 shadow-xl" : ""}
                 ${isUpdating ? "opacity-75" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium transition-colors
                        ${isDragOver ? "bg-blue-100 text-blue-700" : "bg-white text-gray-600"}`}
        >
          {todos.length}
        </span>
      </div>

      {isDragOver && (
        <div className="border-2 border-dashed border-blue-400 rounded-lg p-4 mb-4 bg-blue-50">
          <div className="text-center text-blue-600">
            <div className="text-2xl mb-2">📋</div>
            <p className="font-medium">Drop task here</p>
            <p className="text-sm">Move to {title.toLowerCase()}</p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {todos.length === 0 && !isDragOver ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📝</div>
            <p>No tasks in {title.toLowerCase()}</p>
            <p className="text-sm">Drag tasks here or create new ones</p>
          </div>
        ) : (
          todos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
        )}
      </div>

  
      {isUpdating && (
        <div className="absolute inset-0 bg-white bg-opacity-75 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-2 mx-auto"></div>
            <p className="text-sm text-gray-600">Updating...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default TodoLane
