import TODO_ACTIONS from "./Actions"
const todoReducer = (state, action) => {
  switch (action.type) {
    case TODO_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }

    case TODO_ACTIONS.SET_TODOS:
      return { ...state, todos: action.payload, loading: false }

    case TODO_ACTIONS.ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] }

    case TODO_ACTIONS.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => (todo.id === action.payload.id ? action.payload : todo)),
      }

    case TODO_ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      }

    case TODO_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false }

    case TODO_ACTIONS.SET_EDITING_TODO:
      return { ...state, editingTodo: action.payload }

    default:
      return state
  }
}


export default todoReducer;