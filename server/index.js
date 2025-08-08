const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let id = 0;
let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Task title is required" });
  }

  const newTask = {
    id: id++,
    title,
    completed: completed || false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.delete('/tasks/:id', (req, res) => {
    const idToRemove = parseInt(req.params.id);

    if (isNaN(idToRemove)) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    tasks = tasks.filter(task => task.id !== idToRemove);

    res.json({ message: "Deleted successfully" });
});

app.patch('/tasks/:id', (req, res) => {
    const idToUpdate = parseInt(req.params.id);

    const updateTask = tasks.find(task => task.id === idToUpdate);

    updateTask.completed = !updateTask.completed;

    res.json(updateTask);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));