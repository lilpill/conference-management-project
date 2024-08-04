const conferenceService = require('../services/conferenceService');

exports.createConference = async (req, res) => {
  try {
    const conference = await conferenceService.createConference(req.body);
    res.status(201).json(conference);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getConferences = async (req, res) => {
  try {
    const conferences = await conferenceService.getConferences();
    res.status(200).json(conferences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

