const Comment = require('../entities/Comment');
const User = require('../entities/User'); 
const AppDataSource = require('../config/ormconfig');

async function addComment(task_id, user_id, text) {
    const repo = AppDataSource.getRepository(Comment);
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { id: user_id } });
    if (!user) {
        throw new Error("User not found");
    }

    const comment = repo.create({
        text,
        task: { id: task_id },
        user: user 
    });
    
    await repo.save(comment);
    return comment;
}

async function getByTaskId(task_id) {
    const repo = AppDataSource.getRepository(Comment);
    return await repo.find({
        where: { task: { id: task_id } },
        relations: ['user'], 
        order: { created_at: "ASC" }
    });
}

module.exports = {
    addComment,
    getByTaskId,
};