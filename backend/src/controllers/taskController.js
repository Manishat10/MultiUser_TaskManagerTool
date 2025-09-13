const TaskService = require('../services/tasks/taskService');

exports.createTask = async (req, res) => {
  try {
    const newTask = await TaskService.createTask(req.user.id, req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await TaskService.getTask(req.params.id, req.user.id);
    if (!task) return res.status(404).json({ message: "task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updated = await TaskService.updateTask(req.params.id, req.body, req.user.id);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await TaskService.deleteTask(req.params.id, req.user.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getFilteredTasks = async (req, res) => {
  try {
    const tasks = await TaskService.getFilteredTasks(req.user.id, req.query);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
