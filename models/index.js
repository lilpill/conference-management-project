const mongoose = require('mongoose');
const User = require('./user');
const Conference = require('./conference');
const Paper = require('./paper');
const PaperCoAuthor = require('./paperCoAuthor');
const PaperReview = require('./paperReview');
const PaperReviewer = require('./paperReviewer');
const PcChair = require('./pcChair');
const PcMember = require('./pcMember');

module.exports = {
  User,
  Conference,
  Paper,
  PaperCoAuthor,
  PaperReview,
  PaperReviewer,
  PcChair,
  PcMember,
};
