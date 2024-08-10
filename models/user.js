const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['USER', 'AUTHOR', 'PC_CHAIR', 'PC_MEMBER', 'ADMIN'],
    default: 'USER',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
