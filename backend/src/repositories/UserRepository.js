const AppDataSource = require('../config/ormconfig');
const User = require('../entities/User');
async function findByEmail(email) {
    const repo = AppDataSource.getRepository(User);
    return await repo.findOne({ where: { email } });
}

async function createUser({ name, email, password }) {
    const repo = AppDataSource.getRepository(User);
    const user = repo.create({ name, email, password });
    await repo.save(user);
    return user;
}

async function findById(id) {
    return await repo.findOne(id);
}

module.exports = {
    findByEmail,
    createUser,
    findById,
};
