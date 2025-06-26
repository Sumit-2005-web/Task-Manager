import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080", // your API base
});

const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
