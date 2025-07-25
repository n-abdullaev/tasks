const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json()); // 👈 THIS LINE IS CRUCIAL!

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

    if (!idToRemove) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    tasks = tasks.filter(task => task.id !== idToRemove);

    res.json({ message: "Deleted successfully" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
