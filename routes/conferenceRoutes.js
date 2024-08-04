const express = require('express');
const { authenticate } = require('../middleware/auth');
const conferenceController = require('../controllers/conferenceController');
const router = express.Router();

router.post('/', authenticate, conferenceController.createConference);
router.get('/', authenticate, conferenceController.getConferences);

module.exports = router;
