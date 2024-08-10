const mongoose = require('mongoose');

const paperCoAuthorSchema = new mongoose.Schema({
  paper: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('PaperCoAuthor', paperCoAuthorSchema);