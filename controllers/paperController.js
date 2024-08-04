const paperService = require('../services/paperService');

exports.createPaper = async (req, res) => {
  try {
    const paper = await paperService.createPaper({ ...req.body, authorId: req.user.id });
    res.status(201).json(paper);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPapers = async (req, res) => {
  try {
    const papers = await paperService.getPapers();
    res.status(200).json(papers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

