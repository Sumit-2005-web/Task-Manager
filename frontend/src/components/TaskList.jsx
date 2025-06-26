import { useEffect, useState } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [assignedFilter, setAssignedFilter] = useState("All");

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
    setFilteredTasks(res.data); // default show all
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [statusFilter, assignedFilter, tasks]);

  const filterTasks = () => {
    let filtered = [...tasks];

    if (statusFilter !== "All") {
      filtered = filtered.filter((task) => task.taskStatus === statusFilter);
    }

    if (assignedFilter !== "All") {
      filtered = filtered.filter((task) => task.assignedTo === assignedFilter);
    }

    setFilteredTasks(filtered);
  };

  const uniqueAssignees = [...new Set(tasks.map((t) => t.assignedTo))];

  return (
    <div>
      <h1> Task List</h1>
      <Link to="/new"> Add Task</Link>

      {/* Filters */}
      <div style={{ margin: "20px 0" }}>
        <label>Status: </label>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All</option>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <label style={{ marginLeft: "10px" }}>Assigned To: </label>
        <select value={assignedFilter} onChange={(e) => setAssignedFilter(e.target.value)}>
          <option>All</option>
          {uniqueAssignees.map((person) => (
            <option key={person}>{person}</option>
          ))}
        </select>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        filteredTasks.map((task) => (
          <div key={task._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <h2>{task.title}</h2>
            <p>{task.desc}</p>
            <p><strong>Assigned:</strong> {task.assignedTo}</p>
            <p><strong>Status:</strong> {task.taskStatus}</p>
            <Link to={`/edit/${task._id}`} style={{ marginRight: "10px" }}> Edit</Link>
            <button onClick={() => handleDelete(task._id)}> Delete</button>
          </div>
        ))
      )}
    </div>
  );
}
