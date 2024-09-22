const { Paper, User, Conference, PaperCoAuthor, PaperReviewer, PaperReview, PcMember } = require('../models');

// Δημιουργία paper
exports.createPaper = async (data) => {
  const { title, abstract, content, conferenceId, authorId } = data;

  // Έλεγχος αν υπάρχει η συνεδρία
  const conference = await Conference.findById(conferenceId);
  if (!conference) {
    throw new Error('Conference not found');
  }

  // Έλεγχος αν υπάρχει ο συγγραφέας
  const user = await User.findById(authorId);
  if (!user) {
    throw new Error('Author not found');
  }

  // Δημιουργία του paper
  const paper = new Paper({ title, abstract, content, conference: conference._id, author: user._id });
  await paper.save();
  return paper;
};

// Λήψη όλων των papers
exports.getPapers = async () => {
  return await Paper.find().populate('author conference coAuthors');
};

// Λήψη paper με βάση το ID
exports.getPaperById = async (paperId) => {
  const paper = await Paper.findById(paperId).populate('author conference coAuthors');
  if (!paper) {
    throw new Error('Paper not found');
  }
  return paper;
};

// Ενημέρωση paper
exports.updatePaper = async (paperId, data) => {
  const paper = await Paper.findById(paperId);
  if (!paper) {
    throw new Error('Paper not found');
  }

  const { title, abstract, content } = data;
  paper.title = title || paper.title;
  paper.abstract = abstract || paper.abstract;
  paper.content = content || paper.content;

  await paper.save();
  return paper;
};

// Προσθήκη συν-συγγραφέων σε ένα paper
exports.addCoAuthor = async (paperId, userId) => {
  const paper = await Paper.findById(paperId);
  if (!paper) {
    throw new Error('Paper not found');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Προσθήκη του συγγραφέα ως συν-συγγραφέας
  const coAuthorExists = await PaperCoAuthor.findOne({ paper: paper._id, user: user._id });
  if (!coAuthorExists) {
    const coAuthor = new PaperCoAuthor({ paper: paper._id, user: user._id });
    await coAuthor.save();
  }

  return paper;
};

// Υποβολή paper σε μια συνεδρία
exports.submitPaper = async (paperId) => {
  const paper = await Paper.findById(paperId);
  if (!paper) {
    throw new Error('Paper not found');
  }

  // Έλεγχος αν η συνεδρία είναι σε κατάσταση υποβολής
  const conference = await Conference.findById(paper.conference);
  if (conference.state !== 'SUBMISSION') {
    throw new Error('Conference is not in SUBMISSION state');
  }

  if (!paper.content) {
    throw new Error('Paper content is empty');
  }

  paper.state = 'SUBMITTED';
  await paper.save();
  return paper;
};

// Ανάθεση reviewer σε ένα paper
exports.assignReviewer = async (paperId, reviewerId) => {
  const paper = await Paper.findById(paperId);
  if (!paper) {
    throw new Error('Paper not found');
  }

  const user = await User.findById(reviewerId);
  if (!user) {
    throw new Error('Reviewer not found');
  }

  // Ελέγχουμε αν ο reviewer είναι PC member της συνεδρίας
  const pcMember = await PcMember.findOne({ user: user._id, conference: paper.conference });
  if (!pcMember) {
    throw new Error('Reviewer is not a PC member of this conference');
  }

  // Ελέγχουμε αν η συνεδρία είναι σε κατάσταση ανάθεσης
  const conference = await Conference.findById(paper.conference);
  if (conference.state !== 'ASSIGNMENT') {
    throw new Error('Conference is not in ASSIGNMENT state');
  }

  // Προσθήκη του reviewer στο paper
  const reviewerExists = await PaperReviewer.findOne({ paper: paper._id, user: user._id });
  if (!reviewerExists) {
    const reviewer = new PaperReviewer({ paper: paper._id, user: user._id });
    await reviewer.save();
  }

  return paper;
};

// Κριτική ενός paper
exports.reviewPaper = async (paperId, reviewData) => {
  const paper = await Paper.findById(paperId);
  if (!paper) {
    throw new Error('Paper not found');
  }

  const { reviewerId, review, score } = reviewData;

  // Έλεγχος αν η συνεδρία είναι σε κατάσταση κριτικής
  const conference = await Conference.findById(paper.conference);
  if (conference.state !== 'REVIEW') {
    throw new Error('Conference is not in REVIEW state');
  }

  // Έλεγχος αν ο reviewer είναι PC member της συνεδρίας
  const paperReview = new PaperReview({
    paper: paper._id,
    reviewer: reviewerId,
    review,
    score,
  });
  await paperReview.save();

  return paper;
};

// Εγκρίση ενός paper
exports.approvePaper = async (paperId) => {
  const paper = await Paper.findById(paperId);
  if (!paper) {
    throw new Error('Paper not found');
  }

  // Έλεγχος αν η συνεδρία είναι σε κατάσταση απόφασης
  const conference = await Conference.findById(paper.conference);
  if (conference.state !== 'DECISION') {
    throw new Error('Conference is not in DECISION state');
  }

  paper.state = 'APPROVED';
  await paper.save();
  return paper;
};

// Απόρριψη ενός paper
exports.rejectPaper = async (paperId) => {
  const paper = await Paper.findById(paperId);
  if (!paper) {
    throw new Error('Paper not found');
  }

  // Έλεγχος αν η συνεδρία είναι σε κατάσταση απόφασης
  const conference = await Conference.findById(paper.conference);
  if (conference.state !== 'DECISION') {
    throw new Error('Conference is not in DECISION state');
  }

  paper.state = 'REJECTED';
  await paper.save();
  return paper;
};

// Τελική υποβολή ενός paper
exports.finalSubmitPaper = async (paperId) => {
  const paper = await Paper.findById(paperId);
  if (!paper) {
    throw new Error('Paper not found');
  }

  // Έλεγχος αν η συνεδρία είναι σε τελική υποβολή
  const conference = await Conference.findById(paper.conference);
  if (conference.state !== 'FINAL_SUBMISSION') {
    throw new Error('Conference is not in FINAL_SUBMISSION state');
  }

  if (!paper.content) {
    throw new Error('Paper content is empty');
  }

  paper.state = 'FINAL_SUBMITTED';
  await paper.save();
  return paper;
};

// Εγκρίση ενός paper για παρουσίαση
exports.acceptPaper = async (paperId) => {
  const paper = await Paper.findById(paperId);
  if (!paper) {
    throw new Error('Paper not found');
  }

  // Ελέγχουμε αν η συνεδρία είναι σε τελική κατάσταση
  const conference = await Conference.findById(paper.conference);
  if (conference.state !== 'FINAL') {
    throw new Error('Conference is not in FINAL state');
  }

  paper.state = 'ACCEPTED';
  await paper.save();
  return paper;
};

// Αναζήτηση papers
exports.searchPapers = async (criteria) => {
  const query = {};

  if (criteria.title) {
    query.title = { $regex: criteria.title, $options: 'i' };
  }
  if (criteria.authorId) {
    query.author = criteria.authorId;
  }
  if (criteria.conferenceId) {
    query.conference = criteria.conferenceId;
  }
  if (criteria.state) {
    query.state = criteria.state;
  }

  return await Paper.find(query).sort('title');
};

// Λήψη λεπτομερειών paper
exports.viewPaper = async (paperId) => {
  return await this.getPaperById(paperId);
};

// Διαγραφή ενός paper από μια συνεδρία
exports.withdrawPaper = async (paperId) => {
  const paper = await Paper.findById(paperId);
  if (!paper) {
    throw new Error('Paper not found');
  }

  await paper.deleteOne();
};
