import { useEffect } from "react"
import { useTodos } from "../context/TodoContext"
import TodoLane from "./TodoLane"
import TodoForm from "./TodoForm"
import LoadingSpinner from "./LoadingSpinner"
import ShowError from "./ShowError"

const TodoBoard = () => {
  const { todos, loading, error, fetchTodos } = useTodos()
  const lanes = [
    {
      id: "pending",
      title: "Pending",
      status: "pending",
      bgColor: "bg-gray-100",
      description: "Tasks waiting to be started",
    },
    {
      id: "inprogress",
      title: "In Progress",
      status: "inprogress",
      bgColor: "bg-blue-100",
      description: "Tasks currently being worked on",
    },
    {
      id: "completed",
      title: "Completed",
      status: "completed",
      bgColor: "bg-green-100",
      description: "Finished tasks",
    },
  ]

  const getTodosByStatus = (status) => {
    return todos.filter((todo) => todo.status === status)
  }

  const handleError = () => {
    window.history.go(0); 
    fetchTodos()
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "r" || e.key === "R") {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          fetchTodos()
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [fetchTodos])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
    <ShowError error={error} handleError={handleError}/>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Trello-style Todo Board</h1>
          <p className="text-gray-600 mb-4">Manage your tasks</p>
          <div className="bg-white rounded-lg p-4 shadow-sm max-w-2xl mx-auto">
            <h3 className="font-semibold text-gray-700 mb-2">How to move tasks:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                • <strong>Drag & Drop:</strong> Click and drag any task to a different column
              </p>
              <p>
                • <strong>Quick Move:</strong> Click the arrow (→) button on any task
              </p>
              <p>
                • <strong>Edit Form:</strong> Click edit and change the status dropdown
              </p>
              <p>
                • <strong>Keyboard:</strong> Press Ctrl+R to refresh data
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <TodoForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lanes.map((lane) => (
            <div key={lane.id} className="space-y-2">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-700">{lane.title}</h2>
                <p className="text-xs text-gray-500">{lane.description}</p>
              </div>
              <TodoLane
                title={lane.title}
                status={lane.status}
                todos={getTodosByStatus(lane.status)}
                bgColor={lane.bgColor}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {lanes.map((lane) => {
            const count = getTodosByStatus(lane.status).length
            const percentage = todos.length > 0 ? Math.round((count / todos.length) * 100) : 0

            return (
              <div key={lane.id} className="bg-white rounded-lg p-4 shadow-md">
                <h3 className="font-semibold text-gray-700">{lane.title}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                  <p className="text-sm text-gray-500">{percentage}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      lane.status === "pending"
                        ? "bg-gray-400"
                        : lane.status === "inprogress"
                          ? "bg-blue-400"
                          : "bg-green-400"
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 text-center">
          <div className="bg-white rounded-lg p-4 shadow-md inline-block">
            <h3 className="font-semibold text-gray-700 mb-2">Total Tasks: {todos.length}</h3>
            <div className="flex space-x-4 text-sm">
              <span className="text-gray-600">Pending: {getTodosByStatus("pending").length}</span>
              <span className="text-blue-600">In Progress: {getTodosByStatus("inprogress").length}</span>
              <span className="text-green-600">Completed: {getTodosByStatus("completed").length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoBoard
