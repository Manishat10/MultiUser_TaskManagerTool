const TaskRepository = require('../../repositories/TaskRepository');

exports.createTask = async (userId, data) => {
    const taskData = { ...data, created_by: userId };
    if(!taskData.assigned_to){
        taskData.assigned_to=userId;
    }
    return await TaskRepository.createTask(taskData);
};

exports.getTask = async (id) => {
    const task = await TaskRepository.findTaskById(id);
    // You should probably handle the case where the task is not found here.
    return task;
};

exports.updateTask = async (userId, updates) => {
    return await TaskRepository.updateTask(userId, updates);
};

exports.deleteTask = async (id) => {
    return await TaskRepository.deleteTask(id);
};

exports.getFilteredTasks = async (userId, filters) => {
    // Note: The logic for this is slightly more complex, as you need to build the query correctly.
    // Your repository function `findFiltered` is already set up to handle this.
    const finalFilters={...filters};
    if(finalFilters.assigned_to){
        finalFilters.assigned_to=parseInt(finalFilters.assigned_to,10);
    }
    return await TaskRepository.findFiltered(userId, finalFilters);
};