const Task = require('../entities/Task');
const AppDataSource = require('../config/ormconfig');
// Find task by ID
async function findTaskById(id) {
    const repo = AppDataSource.getRepository(Task);
    return await repo.findOne({
        where:{id:id},
        relations:['created_by','assigned_to']
    });
}

// Create new task
async function createTask(data) {
    const repo = AppDataSource.getRepository(Task);
    const task = repo.create(data);
    await repo.save(task);
    return task;
}

// Update task data
async function updateTask(id, updates) {
    const repo = AppDataSource.getRepository(Task);
    await repo.update({id:id}, updates);
    return await repo.findOne({where:{id:id}});
}

// Delete a task
async function deleteTask(id) {
    const repo = AppDataSource.getRepository(Task);
    return await repo.delete(id);
}


async function findFiltered(userId, filters) {
    const repo = AppDataSource.getRepository(Task);

    // Create a clean set of conditions for the OR query
    const query= repo.createQueryBuilder('task')
    .leftJoinAndSelect('task.created_by','created_by')
    .leftJoinAndSelect('task.assigned_to','assigned_to');

    query.where(
        'task.created_by.id =:userId AND task.assigned_to.id=:userId',
        {userId:userId}
    );
    if (filters.status) {
        query.andWhere('task.status = :status', { status: filters.status });
    }
    if (filters.assigned_to) {
        // This is the correct way to filter by the assigned_to user
        query.andWhere('task.assigned_to.id = :assignedToId', { assignedToId: filters.assigned_to });
    }
    return await query.getMany();
}
module.exports = {
    findTaskById,
    createTask,
    updateTask,
    deleteTask,
    findFiltered,
};
