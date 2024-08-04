const userService = require('../services/userService');
const { generateToken } = require('../middleware/auth');

// Register a new user
exports.register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({ user, token: generateToken(user) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const token = await userService.login(req.body);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// Update user information
exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.user.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update user password
exports.updatePassword = async (req, res) => {
  try {
    const user = await userService.updatePassword(req.user.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update user account status
exports.updateAccountStatus = async (req, res) => {
  try {
    const user = await userService.updateAccountStatus(req.params.id, req.body.status);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete user account
exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
