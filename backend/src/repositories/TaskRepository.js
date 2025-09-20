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

async function findFiltered(userId, filters = {}) {
  const repo = AppDataSource.getRepository(Task);
  const query = repo.createQueryBuilder('task')
    .leftJoinAndSelect('task.created_by', 'created_by')
    .leftJoinAndSelect('task.assigned_to', 'assigned_to');
  if (userId) {
    query.where('(created_by.id = :userId OR assigned_to.id = :userId)', { userId });
  }

  if (filters.status) {
    query.andWhere('task.status = :status', { status: filters.status });
  }

  if (filters.assigned_to !== undefined && filters.assigned_to !== null && filters.assigned_to !== '') {
    const assignedToId = typeof filters.assigned_to === 'string'
      ? parseInt(filters.assigned_to, 10)
      : filters.assigned_to;
    query.andWhere('assigned_to.id = :assignedToId', { assignedToId });
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
