const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const secret = 'your_jwt_secret';

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, secret, { expiresIn: '1h' });
};

const authenticate = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], secret); 
    req.user = await User.findByPk(decoded.id);
    if (!req.user) {
      return res.status(401).send('Invalid token.');
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = { generateToken, authenticate };
