const UserService = require('../services/auth/userService');
exports.registerUser = async (req, res) => {
  try {
    const user = await UserService.register(req.body);
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const token = await UserService.login(req.body);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
