const paperService = require('../services/paperService');

exports.createPaper = async (req, res) => {
  try {
    const paper = await paperService.createPaper({ ...req.body, authorId: req.user.id });
    res.status(201).json(paper);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPapers = async (req, res) => {
  try {
    const papers = await paperService.getPapers();
    res.status(200).json(papers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPaperById = async (req, res) => {
  try {
    const paper = await paperService.getPaperById(req.params.id);
    res.status(200).json(paper);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePaper = async (req, res) => {
  try {
    const paper = await paperService.updatePaper(req.params.id, req.body);
    res.status(200).json(paper);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addCoAuthor = async (req, res) => {
  try {
    const paper = await paperService.addCoAuthor(req.params.id, req.body.userId);
    res.status(200).json(paper);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.submitPaper = async (req, res) => {
  try {
    const paper = await paperService.submitPaper(req.params.id);
    res.status(200).json(paper);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.assignReviewer = async (req, res) => {
  try {
    const paper = await paperService.assignReviewer(req.params.id, req.body.reviewerId);
    res.status(200).json(paper);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.reviewPaper = async (req, res) => {
  try {
    const paper = await paperService.reviewPaper(req.params.id, req.body);
    res.status(200).json(paper);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.approvePaper = async (req, res) => {
  try {
    const paper = await paperService.approvePaper(req.params.id);
    res.status(200).json(paper);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.rejectPaper = async (req, res) => {
  try {
    const paper = await paperService.rejectPaper(req.params.id);
    res.status(200).json(paper);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.finalSubmitPaper = async (req, res) => {
  try {
    const paper = await paperService.finalSubmitPaper(req.params.id);
    res.status(200).json(paper);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.acceptPaper = async (req, res) => {
  try {
    const paper = await paperService.acceptPaper(req.params.id);
    res.status(200).json(paper);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.searchPapers = async (req, res) => {
  try {
    const papers = await paperService.searchPapers(req.query);
    res.status(200).json(papers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.viewPaper = async (req, res) => {
  try {
    const paper = await paperService.viewPaper(req.params.id);
    res.status(200).json(paper);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.withdrawPaper = async (req, res) => {
  try {
    await paperService.withdrawPaper(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
