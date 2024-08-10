const mongoose = require('mongoose');

const paperReviewSchema = new mongoose.Schema({
  paper: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper' },
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  review: String,
  score: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('PaperReview', paperReviewSchema);
