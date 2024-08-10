const mongoose = require('mongoose');

const pcChairSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  conference: { type: mongoose.Schema.Types.ObjectId, ref: 'Conference' },
}, { timestamps: true });

module.exports = mongoose.model('PcChair', pcChairSchema);
