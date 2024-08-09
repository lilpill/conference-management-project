const conferenceService = require('../services/conferenceService');

exports.createConference = async (req, res) => {
  try {
    const conference = await conferenceService.createConference({ ...req.body, userId: req.user.id });
    res.status(201).json(conference);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getConferences = async (req, res) => {
  try {
    const conferences = await conferenceService.getConferences();
    res.status(200).json(conferences);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getConferenceById = async (req, res) => {
  try {
    const conference = await conferenceService.getConferenceById(req.params.id);
    res.status(200).json(conference);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateConference = async (req, res) => {
  try {
    const conference = await conferenceService.updateConference(req.params.id, req.body);
    res.status(200).json(conference);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addPcChairs = async (req, res) => {
  try {
    const conference = await conferenceService.addPcChairs(req.params.id, req.body.userIds);
    res.status(200).json(conference);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addPcMembers = async (req, res) => {
  try {
    const conference = await conferenceService.addPcMembers(req.params.id, req.body.userIds);
    res.status(200).json(conference);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.searchConferences = async (req, res) => {
  try {
    const conferences = await conferenceService.searchConferences(req.query);
    res.status(200).json(conferences);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.viewConference = async (req, res) => {
  try {
    const conference = await conferenceService.viewConference(req.params.id);
    res.status(200).json(conference);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteConference = async (req, res) => {
  try {
    await conferenceService.deleteConference(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateConferenceState = async (req, res) => {
  try {
    const conference = await conferenceService.updateConferenceState(req.params.id, req.body.state);
    res.status(200).json(conference);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
