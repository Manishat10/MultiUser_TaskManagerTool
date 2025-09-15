const Comment = require('../entities/Comment');
const AppDataSource = require('../config/ormconfig');

async function addComment(task_id, user_id, text) {
    const repo = AppDataSource.getRepository(Comment);
    const comment = repo.create({ 
        text, 
        task: { id: task_id }, 
        user: { id: user_id } 
    });
    await repo.save(comment);
    return comment;
}

async function getByTaskId(task_id) {
    const repo = AppDataSource.getRepository(Comment);
    return await repo.find({ 
        where: { task: { id: task_id } }, 
        order: { created_at: "ASC" } 
    });
}

module.exports = {
    addComment,
    getByTaskId,
};