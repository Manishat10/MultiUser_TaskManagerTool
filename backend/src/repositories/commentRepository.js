const Comment = require('../entities/Comment');
const AppDataSource = require('../config/ormconfig');

// Add (create) a comment
async function addComment(task_id, user_id, text) {
    const repo = AppDataSource.getRepository(Comment);
    const comment = repo.create({ task_id, user_id, text });
    await repo.save(comment);
    return comment;
}

// Get all comments by task
async function getByTaskId(task_id) {
    const repo = AppDataSource.getRepository(Comment);
    return await repo.find({ where: { task_id }, order: { created_at: "ASC" } });
}

module.exports = {
    addComment,
    getByTaskId,
};
