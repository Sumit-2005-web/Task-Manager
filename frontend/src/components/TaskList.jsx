import { useEffect, useState, useContext } from "react";
import { api } from "../api";
import TaskModal from "./TaskModal";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [assignedFilter, setAssignedFilter] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ title: "", desc: "", assignedTo: "", taskStatus: "To Do" });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const { user, logout } = useContext(AuthContext);

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
    setFilteredTasks(res.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleAdd = () => {
    setForm({ title: "", desc: "", assignedTo: "", taskStatus: "To Do" });
    setIsEdit(false);
    setModalOpen(true);
  };

  const handleEdit = (task) => {
    setForm(task);
    setEditId(task._id);
    setIsEdit(true);
    setModalOpen(true);
  };

const handleSubmit = async () => {
  try {
    if (isEdit) {
      await api.patch(`/tasks/${editId}`, form);
    } else {
      await api.post("/tasks", form);
    }
    setModalOpen(false);
    fetchTasks();
  } catch (err) {
    console.error(" Task save failed:", err);
    alert("Failed to save task: " + (err.response?.data || err.message));
  }
};


  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    let filtered = [...tasks];
    if (statusFilter !== "All") filtered = filtered.filter(t => t.taskStatus === statusFilter);
    if (assignedFilter !== "All") filtered = filtered.filter(t => t.assignedTo === assignedFilter);
    setFilteredTasks(filtered);
  }, [statusFilter, assignedFilter, tasks]);

  const uniqueAssignees = [...new Set(tasks.map((t) => t.assignedTo))];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Task List</h2>
        {user && (
          <div>
            <Button variant="contained" onClick={handleAdd} sx={{ mr: 1 }}>Add Task</Button>
            <Button variant="outlined" color="error" onClick={logout}>Logout</Button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-6">
          <label>Status:</label>
          <select className="form-control" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option>All</option><option>To Do</option><option>In Progress</option><option>Done</option>
          </select>
        </div>
        <div className="col-md-6">
          <label>Assigned To:</label>
          <select className="form-control" value={assignedFilter} onChange={e => setAssignedFilter(e.target.value)}>
            <option>All</option>
            {uniqueAssignees.map(name => <option key={name}>{name}</option>)}
          </select>
        </div>
      </div>

      {/* Task Cards */}
      <div className="row">
        {filteredTasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          filteredTasks.map(task => (
            <div key={task._id} className="col-md-6 mb-3">
              <div className="card p-3 shadow-sm">
                <h5>{task.title}</h5>
                <p>{task.desc}</p>
                <p><strong>Assigned:</strong> {task.assignedTo}</p>
                <p><strong>Status:</strong> {task.taskStatus}</p>
                {user && (
                  <>
                    <Button size="small" variant="outlined" sx={{ mr: 1 }} onClick={() => handleEdit(task)}>Edit</Button>
                    <Button size="small" variant="contained" color="error" onClick={() => handleDelete(task._id)}>Delete</Button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Task Form Modal */}
      <TaskModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        isEdit={isEdit}
      />
    </div>
  );
}
