import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { api } from "../api";
import { Container, TextField, Button, Typography, Box, Link, Paper } from "@mui/material";
import {Link} from 'react-router-dom';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      const token = res.data.token;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      setUser(decoded.username);
      navigate("/");
    } catch (err) {
      alert("Login failed: " + err.response.data.error);
    }
  };

  return (
    <Container maxWidth="sm" className="mt-5">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Username"
            name="username"
            margin="normal"
            value={form.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={form.password}
            onChange={handleChange}
            required
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>Login</Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account? <Link to="/register">Sign up here</Link>
        </Typography>
      </Paper>
    </Container>
  );
}
