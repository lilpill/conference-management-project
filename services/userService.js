const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/auth');

exports.register = async (data) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({ ...data, password: hashedPassword });
    return user;
  } catch (error) {
    throw new Error('Error registering user');
  }
};

exports.login = async ({ username, password }) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      return generateToken(user);
    }
    throw new Error('Invalid credentials');
  } catch (error) {
    throw new Error('Error logging in');
  }
};
