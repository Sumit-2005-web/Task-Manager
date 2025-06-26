import { Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskEdit from "./components/TaskEdit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/new" element={<TaskForm />} />
      <Route path="/edit/:id" element={<TaskEdit />} />
    </Routes>
  );
}

export default App;

