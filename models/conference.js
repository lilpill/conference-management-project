const mongoose = require('mongoose');

const conferenceSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    enum: ['CREATED', 'SUBMISSION', 'ASSIGNMENT', 'REVIEW', 'DECISION', 'FINAL_SUBMISSION', 'FINAL'],
    default: 'CREATED',
  },
  pcChairs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  pcMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Conference', conferenceSchema);
