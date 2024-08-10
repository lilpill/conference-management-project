const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  abstract: String,
  content: String,
  conference: { type: mongoose.Schema.Types.ObjectId, ref: 'Conference' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  coAuthors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  state: {
    type: String,
    enum: ['CREATED', 'SUBMITTED', 'REVIEWED', 'APPROVED', 'REJECTED', 'ACCEPTED', 'FINAL_SUBMITTED'],
    default: 'CREATED',
  },
}, { timestamps: true });

module.exports = mongoose.model('Paper', paperSchema);
