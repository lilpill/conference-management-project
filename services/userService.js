const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/auth');

// Εγγραφή νέου χρήστη
exports.register = async (data) => {
  const { username, password, fullName, role } = data;

  // Επαλήθευση του κωδικού πρόσβασης
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)) {
    throw new Error('Password must be at least 8 characters long and include both capital and lowercase letters, digits, and special characters.');
  }

  // Επαλήθευση του ονόματος χρήστη
  if (!/^[a-zA-Z][a-zA-Z0-9_]{4,}$/.test(username)) {
    throw new Error('Username must start with a letter and be at least 5 characters long, consisting of alphanumeric characters or underscores.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword, fullName, role });
  return user;
};

// Σύνδεση χρήστη
exports.login = async ({ username, password }) => {
  const user = await User.findOne({ where: { username } });
  if (user && await bcrypt.compare(password, user.password)) {
    return generateToken(user);
  }
  throw new Error('Invalid credentials');
};

// Ενημέρωση πληροφοριών χρήστη
exports.updateUser = async (userId, data) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const { username, fullName, role } = data;

  // Επαλήθευση του ονόματος χρήστη
  if (username && !/^[a-zA-Z][a-zA-Z0-9_]{4,}$/.test(username)) {
    throw new Error('Username must start with a letter and be at least 5 characters long, consisting of alphanumeric characters or underscores.');
  }

  user.username = username || user.username;
  user.fullName = fullName || user.fullName;
  user.role = role || user.role;

  await user.save();
  return user;
};

// Ενημέρωση κωδικού πρόσβασης χρήστη
exports.updatePassword = async (userId, { oldPassword, newPassword }) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (!await bcrypt.compare(oldPassword, user.password)) {
    throw new Error('Old password is incorrect');
  }

  // Επαλήθευση του νέου κωδικού πρόσβασης
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(newPassword)) {
    throw new Error('New password must be at least 8 characters long and include both capital and lowercase letters, digits, and special characters.');
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  return user;
};

// Ενημέρωση κατάστασης λογαριασμού χρήστη
exports.updateAccountStatus = async (userId, status) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  user.isActive = status;
  await user.save();
  return user;
};

// Διαγραφή λογαριασμού χρήστη
exports.deleteUser = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  await user.destroy();
};
