const mongoose = require('mongoose');

const pcMemberSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  conference: { type: mongoose.Schema.Types.ObjectId, ref: 'Conference' },
}, { timestamps: true });

module.exports = mongoose.model('PcMember', pcMemberSchema);
