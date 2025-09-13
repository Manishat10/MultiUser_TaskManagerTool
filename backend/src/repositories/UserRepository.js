const AppDataSource = require('../config/ormconfig');
const User = require('../entities/User');
// Find a user by email (used for login and registration)
async function findByEmail(email) {
    const repo = AppDataSource.getRepository(User);
    return await repo.findOne({ where: { email } });
}

// Create and save a new user
async function createUser({ name, email, password }) {
    const repo = AppDataSource.getRepository(User);
    const user = repo.create({ name, email, password });
    await repo.save(user);
    return user;
}

// Find user by ID
async function findById(id) {
    return await repo.findOne(id);
}

module.exports = {
    findByEmail,
    createUser,
    findById,
};
