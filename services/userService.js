const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  const user = new User({ username, password: hashedPassword, fullName, role });
  await user.save();
  return user;
};

const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    role: user.role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Ensure JWT_SECRET is correctly set
};

// Σύνδεση χρήστη
exports.login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('User not found');
  }
  
  
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Password does not match');
  }

  return generateToken(user);
};



// Ενημέρωση πληροφοριών χρήστη
exports.updateUser = async (userId, data) => {
  const user = await User.findById(userId);
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
  console.log(userId);
  const user = await User.findById(userId);
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
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  user.isActive = status;
  await user.save();
  return user;
};

// Διαγραφή λογαριασμού χρήστη
exports.deleteUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  await user.deleteOne();
};
