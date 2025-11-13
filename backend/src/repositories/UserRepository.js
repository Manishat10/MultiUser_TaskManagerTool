const AppDataSource = require('../config/ormconfig');
const User = require('../entities/User');
async function findByEmail(email) {
    const repo = AppDataSource.getRepository(User);
    return await repo.findOne({ 
        where: { email },
        select: ['id', 'name', 'email', 'password', 'isAdmin']
    });
}

async function createUser({ name, email, password }) {
    const repo = AppDataSource.getRepository(User);
    const user = repo.create({ name, email, password });
    await repo.save(user);
    return user;
}

async function findAll() {
    const repo = AppDataSource.getRepository(User);
    return await repo.find({
        select: ['id', 'name', 'email', 'isAdmin']
    });
}

async function findById(id) {
    const repo = AppDataSource.getRepository(User);
    return await repo.findOne({ 
        where: { id },
        select: ['id', 'name', 'email', 'isAdmin']
    });
}

module.exports = {
    findByEmail,
    createUser,
    findById,
    findAll,
};