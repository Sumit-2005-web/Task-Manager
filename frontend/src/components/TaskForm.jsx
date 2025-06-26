import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function TaskForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    desc: "",
    assignedTo: "",
    taskStatus: "To Do",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/tasks", form);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}  style={{margin: "20px"}}>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <br /><br />
      <input name="desc" placeholder="Description" onChange={handleChange} required />
      <br /><br />
      <input name="assignedTo" placeholder="Assigned To" onChange={handleChange} required />
      <br /><br />
      <select name="taskStatus" onChange={handleChange} value={form.taskStatus}>
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <br /><br />
      <button type="submit">Create</button>
    </form>
  );
}
