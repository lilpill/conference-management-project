const { Paper } = require('../models');

exports.createPaper = async (data) => {
  try {
    const paper = await Paper.create(data);
    return paper;
  } catch (error) {
    throw new Error('Error creating paper');
  }
};

exports.getPapers = async () => {
  try {
    const papers = await Paper.findAll();
    return papers;
  } catch (error) {
    throw new Error('Error fetching papers');
  }
};
