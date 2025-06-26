require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require("method-override");

const Task = require('./models/task');
const authRoutes = require('./routes/auth');
const verifyToken = require('./middlewares/auth');

const app = express();
const port = process.env.PORT || 8080;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("DB connected"))
.catch(err => console.error("DB connection error:", err));

// CORS Options for Dev & Prod
const corsOptions = {
  origin: process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL
    : "http://localhost:5173",
  credentials: true
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Auth Routes
app.use("/auth", authRoutes);

// Task Routes
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Protect the following with JWT middleware
app.post("/tasks", verifyToken, async (req, res) => {
  const { title, desc, assignedTo, taskStatus } = req.body;
  const task = new Task({ title, desc, assignedTo, taskStatus });
  await task.save();
  res.status(201).json(task);
});

app.get("/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

app.patch("/tasks/:id", verifyToken, async (req, res) => {
  const { title, desc, assignedTo, taskStatus } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { title, desc, assignedTo, taskStatus },
    { new: true }
  );
  res.json(updatedTask);
});

app.delete("/tasks/:id", verifyToken, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

// Server Start
app.listen(port, () => {
  console.log(`✅ Backend running on http://localhost:${port}`);
});
