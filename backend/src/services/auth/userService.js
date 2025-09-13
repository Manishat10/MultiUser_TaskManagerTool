const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../../repositories/UserRepository');

exports.register = async ({ name, email, password }) => {
  const existing = await UserRepository.findByEmail(email);
  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserRepository.createUser({ name, email, password: hashedPassword });

  // Optional: Don't return password on API
  delete user.password;
  return user;
};

exports.login = async ({ email, password }) => {
  const user = await UserRepository.findByEmail(email);
  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};