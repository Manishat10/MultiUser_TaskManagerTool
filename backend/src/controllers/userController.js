const e = require("express");
const UserService = require("../services/auth/userService");
exports.registerUser = async (req, res) => {
  try {
    const user = await UserService.register(req.body);
    const token = await UserService.login(req.body);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1 * 60 * 60 * 1000,
    });
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { token, user } = await UserService.login(req.body);
    // console.log("Generated Token:", token);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1 * 60 * 60 * 1000,
    });
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    await UserService.logout(req.token);
    res.status(200).json({ message: "Logout Successful" });
  } catch (err) {
    res.status(500).json({ message: "Failed to log out" });
  }
};
exports.checkAuthUser = (req, res) => {
  res.status(200).json({
    isAuthenticated: true,
    userId: req.user.id,
  });
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    // Return only essential user data (e.g., id and name)
    const publicUsers = users.map((user) => ({ id: user.id, name: user.name }));
    res.json(publicUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
