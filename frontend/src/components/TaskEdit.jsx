import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function TaskEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    desc: "",
    assignedTo: "",
    taskStatus: "To Do",
  });

  useEffect(() => {
    api.get(`/tasks/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.patch(`/tasks/${id}`, form);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} required />
      <input name="desc" value={form.desc} onChange={handleChange} required />
      <input name="assignedTo" value={form.assignedTo} onChange={handleChange} required />
      <select name="taskStatus" value={form.taskStatus} onChange={handleChange}>
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <button type="submit">Update</button>
    </form>
  );
}
