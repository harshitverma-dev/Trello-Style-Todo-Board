import { useState, useEffect } from "react"
import { useTodos } from "../context/TodoContext"
import { Plus, X, Save } from "lucide-react"

const TodoForm = () => {
  const { createTodo, updateTodo, editingTodo, setEditingTodo } = useTodos()
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    todo: "",
    description: "",
    status: "pending",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (editingTodo) {
      setFormData({
        todo: editingTodo.todo || "",
        description: editingTodo.description || "",
        status: editingTodo.status || "pending",
      })
      setIsOpen(true)
    }
  }, [editingTodo])


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.todo.trim()) {
      alert("Please enter a task title")
      return
    }

    setIsSubmitting(true)

    try {
      if (editingTodo) {
        await updateTodo(editingTodo.id, formData)
        setEditingTodo(null)
      } else {
        await createTodo(formData)
      }

      setFormData({
        todo: "",
        description: "",
        status: "pending",
      })
      setIsOpen(false)
    } catch (error) {
      console.error("Failed to save todo:", error)
      alert("Failed to save task. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }


  const handleCancel = () => {
    setFormData({
      todo: "",
      description: "",
      status: "pending",
    })
    setIsOpen(false)
    setEditingTodo(null)
  }

  return (
    <>
      {!isOpen && (
        <div className="text-center">
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white 
                     rounded-lg hover:bg-blue-700 transition-colors duration-200 
                     shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Task
          </button>
        </div>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{editingTodo ? "Edit Task" : "Create New Task"}</h3>
            <button onClick={handleCancel} className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="todo" className="block text-sm font-medium text-gray-700 mb-1">
                Task Title *
              </label>
              <input
                type="text"
                id="todo"
                name="todo"
                value={formData.todo}
                onChange={handleChange}
                placeholder="Enter task title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter task description..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {editingTodo && (
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="inprogress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            )}

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 
                         bg-blue-600 text-white rounded-md hover:bg-blue-700 
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors duration-200"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {isSubmitting ? "Saving..." : editingTodo ? "Update Task" : "Create Task"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md 
                         hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default TodoForm
