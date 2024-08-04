const userService = require('../services/userService');
const { generateToken } = require('../middleware/auth');

exports.register = async (req, res) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({ user, token: generateToken(user) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await userService.login(req.body);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

