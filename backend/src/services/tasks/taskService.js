const TaskRepository = require("../../repositories/TaskRepository");

exports.createTask = async (userId, data) => {
  const taskData = { ...data, created_by: userId };
  if (!taskData.assigned_to) {
    taskData.assigned_to = userId;
  }
  return await TaskRepository.createTask(taskData);
};

exports.getTask = async (id) => {
  const task = await TaskRepository.findTaskById(id);
  return task;
};

exports.updateTask = async (userId, updates) => {
  return await TaskRepository.updateTask(userId, updates);
};

exports.deleteTask = async (id) => {
  return await TaskRepository.deleteTask(id);
};

exports.getFilteredTasks = async (userId, filters = {}) => {
  const finalFilters = { ...filters };
  if (finalFilters.assigned_to) finalFilters.assigned_to = parseInt(finalFilters.assigned_to, 10);
  return await TaskRepository.findFiltered(userId, finalFilters);
};
