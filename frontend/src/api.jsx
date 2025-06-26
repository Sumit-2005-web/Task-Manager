import axios from "axios";

export const api = axios.create({
  baseURL: "https://task-manager-backend-ti6q.onrender.com", // your API base
});

const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
