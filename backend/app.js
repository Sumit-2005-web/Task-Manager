require('dotenv').config();
const express = require('express');
const app = express();
const port = 8080;
const methodOverride = require("method-override");
const cors = require("cors");
const mongoose = require('mongoose');
const Task = require('./models/task'); // Assuming your schema is in models/task.js

// DB connection
mongoose.connect('mongodb://127.0.0.1:27017/tasksDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("DB connected"))
  .catch(err => console.error(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Routes

// Get all tasks
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Create new task
app.post("/tasks", async (req, res) => {
    const { title, desc, assignedTo, taskStatus } = req.body;
    const task = new Task({ title, desc, assignedTo, taskStatus });
    await task.save();
    res.status(201).json(task);
});

// Get one task
app.get("/tasks/:id", async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

// Update task
app.patch("/tasks/:id", async (req, res) => {
    const { title, desc, assignedTo, taskStatus } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
        title, desc, assignedTo, taskStatus
    }, { new: true });
    res.json(updatedTask);
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
