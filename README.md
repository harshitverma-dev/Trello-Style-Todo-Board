# Trello-Style Todo Board

A visually intuitive, Kanban-inspired Todo board built with React, Vite, and Tailwind CSS. This project demonstrates modular component architecture, state management with React Context, and seamless integration with the DummyJSON Todos API. Users can create, edit, delete, and drag-and-drop tasks between status lanes ("Pending", "In Progress", "Completed").

---

## 🚀 How to Run the Project Locally

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd Trello-todo-board
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the development server**
   ```sh
   npm run dev
   ```

4. **Open your browser**  
   Visit [http://localhost:5173](http://localhost:5173) or the URL shown in your terminal.

---

## 🛠️ Approach & Architecture

### Component Structure

- **TodoBoard**: The main Kanban board, responsible for rendering columns and managing drag-and-drop logic.
- **Column**: Represents a status lane (e.g., Pending, In Progress, Completed). Receives filtered todos as props.
- **TodoCard**: Displays individual todo details, with options to edit or delete.
- **AddTodoForm**: Handles creation of new todos.
- **Context (`TodoContext`)**: Centralizes todo state and API interactions, making state and actions available throughout the app.

### State Management

- **React Context** is used for global state (todos, loading/error states, and actions).
- **Local state** is used for UI-specific interactions (e.g., form inputs, drag state).

### API Integration

- **DummyJSON Todos API** is used for all CRUD operations.
- API logic is abstracted into a dedicated module for maintainability and separation of concerns.

### Drag-and-Drop

- Implemented using React’s built-in state and event handlers for simplicity and minimal dependencies.
- Visual feedback is provided during drag operations for better UX.

### Styling & Responsiveness

- **Tailwind CSS** is used for rapid, utility-first styling.
- Responsive design is achieved using Tailwind’s breakpoint utilities, ensuring usability on both desktop and mobile devices.
- Custom CSS is layered for scrollbar aesthetics, focus states, and subtle animations.

---

## ⚖️ Trade-offs & Potential Improvements

### Trade-offs

- **Drag-and-Drop Simplicity**:  
  The current drag-and-drop logic is lightweight and dependency-free, but lacks advanced features like keyboard accessibility and complex drop targets. Libraries like `react-beautiful-dnd` could provide a more robust solution.
- **API Limitations**:  
  The DummyJSON API is used for demonstration and does not persist data between sessions. For production, a real backend with authentication and persistent storage is recommended.
- **Minimal Styling**:  
  The UI is intentionally simple for clarity and maintainability. More advanced theming or design systems could be integrated for a richer experience.

### Potential Improvements

- **Accessibility**:  
  Enhance keyboard navigation and ARIA roles, especially for drag-and-drop interactions.
- **Testing**:  
  Add unit and integration tests for critical components and business logic.
- **Feature Expansion**:  
  Add user authentication, due dates, labels, or task assignment for a more complete Kanban experience.



##harshit
