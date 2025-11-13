const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../../repositories/UserRepository');
const tokenStore =require('../tokens/tokenStore');
const { use } = require('../../app');

exports.register = async ({ name, email, password }) => {
  const lowercaseEmail = email.toLowerCase();
  const existing = await UserRepository.findByEmail(lowercaseEmail);
  if (existing) {
    throw new Error("User already exists");
  }  
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserRepository.createUser({ name, email:lowercaseEmail, password: hashedPassword });
  // Remove password from response
  delete user.password;
  return user;
};

exports.login = async ({ email, password }) => {
  const lowercaseEmail = email.toLowerCase();
  const user = await UserRepository.findByEmail(lowercaseEmail);
  if (!user) {
    throw new Error("Invalid Credentials");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }
  // Include isAdmin in the token payload
  const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
  // Remove password from response
  delete user.password;
  return {token,user};
};

exports.logout= async(token)=>{
    tokenStore.blackListedToken(token);
};

exports.getAllUsers=async()=>{
    return await UserRepository.findAll();
};

// New admin functions
exports.getAllTasks = async () => {
    const TaskRepository = require('../../repositories/TaskRepository');
    return await TaskRepository.findAllTasks();
};

exports.getAllComments = async () => {
    const CommentRepository = require('../../repositories/commentRepository');
    return await CommentRepository.findAllComments();
};