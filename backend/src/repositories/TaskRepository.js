const Task = require('../entities/Task');
const AppDataSource = require('../config/ormconfig');
async function findTaskById(id) {
    const repo = AppDataSource.getRepository(Task);
    return await repo.findOne({
        where:{id:id},
        relations:['created_by','assigned_to']
    });
}

async function createTask(data) {
    const repo = AppDataSource.getRepository(Task);
    const task = repo.create(data);
    await repo.save(task);
    return task;
}

async function updateTask(id, updates) {
    const repo = AppDataSource.getRepository(Task);
    await repo.update({id:id}, updates);
    return await repo.findOne({where:{id:id}});
}

async function deleteTask(id) {
    const repo = AppDataSource.getRepository(Task);
    return await repo.delete(id);
}


async function findFiltered(userId, filters) {
    const repo = AppDataSource.getRepository(Task);
    const query= repo.createQueryBuilder('task')
    .leftJoinAndSelect('task.created_by','created_by')
    .leftJoinAndSelect('task.assigned_to','assigned_to');

    query.where(
        'task.created_by.id =:userId OR task.assigned_to.id=:userId',
        {userId:userId}
    );
    if (filters.status) {
        query.andWhere('task.status = :status', { status: filters.status });
    }
    if (filters.assigned_to) {
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
