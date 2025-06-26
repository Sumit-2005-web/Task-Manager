import { Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskEdit from "./components/TaskEdit";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Signup from "./pages/Signup"; // 👈 import it

function App() {
  const { setUser } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/signup" element={<Signup />} />

      {/* ✅ Protect all routes behind PrivateRoute */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <TaskList />
          </PrivateRoute>
        }
      />
      <Route
        path="/new"
        element={
          <PrivateRoute>
            <TaskForm />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <PrivateRoute>
            <TaskEdit />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
