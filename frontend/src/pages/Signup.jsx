import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { Container, TextField, Button, Typography, Box, Paper} from "@mui/material";

export default function Signup() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("✅ Signup successful! Please log in.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed: " + err.response.data);
    }
  };

  return (
    <Container maxWidth="sm" className="mt-5">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>Signup</Typography>
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
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Create Account
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
