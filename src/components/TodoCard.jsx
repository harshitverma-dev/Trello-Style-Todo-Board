import { useState } from "react"
import { useTodos } from "../context/TodoContext"
import { Trash2, Edit3, GripVertical, ArrowRight } from "lucide-react"

const TodoCard = ({ todo }) => {
  const { deleteTodo, setEditingTodo, updateTodo } = useTodos()
  const [isDragging, setIsDragging] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)


  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", todo.id.toString())
    e.dataTransfer.effectAllowed = "move"
    setIsDragging(true)
    e.target.style.opacity = "0.5"
  }

  const handleDragEnd = (e) => {
    setIsDragging(false)
    e.target.style.opacity = "1"
  }

  
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTodo(todo.id)
      } catch (error) {
        console.error("Failed to delete todo:", error)
        alert("Failed to delete task. Please try again.")
      }
    }
  }

  const handleEdit = () => {
    setEditingTodo(todo)
  }

  const handleQuickStatusChange = async () => {
    const statusFlow = {
      pending: "inprogress",
      inprogress: "completed",
      completed: "pending",
    }

    const newStatus = statusFlow[todo.status]
    setIsUpdating(true)

    try {
      await updateTodo(todo.id, { status: newStatus })
    } catch (error) {
      console.error("Failed to update status:", error)
      alert("Failed to update status. Please try again.")
    } finally {
      setIsUpdating(false)
    }
  }


  const getStatusColor = () => {
    switch (todo.status) {
      case "pending":
        return "border-l-gray-400"
      case "inprogress":
        return "border-l-blue-400"
      case "completed":
        return "border-l-green-400"
      default:
        return "border-l-gray-400"
    }
  }

  const getNextStatus = () => {
    const statusFlow = {
      pending: "In Progress",
      inprogress: "Completed",
      completed: "Pending",
    }
    return statusFlow[todo.status]
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`bg-white rounded-lg p-4 shadow-md border-l-4 ${getStatusColor()} 
                 hover:shadow-lg transition-all duration-200 cursor-move group
                 ${isDragging ? "rotate-2 scale-105" : ""}
                 ${isUpdating ? "opacity-50" : ""}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2 flex-1">
          <GripVertical className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          <h3 className="font-medium text-gray-800 line-clamp-2">{todo.todo}</h3>
        </div>
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
          <button
            onClick={handleQuickStatusChange}
            disabled={isUpdating}
            className="p-1 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded"
            title={`Move to ${getNextStatus()}`}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleEdit}
            className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
            title="Edit task"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      {todo.description && <p className="text-sm text-gray-600 mb-3 line-clamp-3">{todo.description}</p>}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>ID: {todo.id}</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleQuickStatusChange}
            disabled={isUpdating}
            className="text-xs text-gray-500 hover:text-blue-600 transition-colors"
            title={`Move to ${getNextStatus()}`}
          >
            → {getNextStatus()}
          </button>

          <span
            className={`px-2 py-1 rounded-full text-xs font-medium
            ${todo.status === "pending" ? "bg-gray-100 text-gray-700" : ""}
            ${todo.status === "inprogress" ? "bg-blue-100 text-blue-700" : ""}
            ${todo.status === "completed" ? "bg-green-100 text-green-700" : ""}
          `}
          >
            {todo.status === "inprogress" ? "In Progress" : todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
          </span>
        </div>
      </div>

      {isUpdating && (
        <div className="absolute inset-0 bg-white bg-opacity-75 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}

export default TodoCard
