const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('./models');

const secret = 'your_jwt_secret';

const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });
};

const authenticate = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = { generateToken, authenticate };
