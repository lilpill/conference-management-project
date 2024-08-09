const express = require('express');
const { authenticate } = require('../middleware/auth');
const conferenceController = require('../controllers/conferenceController');
const router = express.Router();

router.post('/', authenticate, conferenceController.createConference);
router.get('/', authenticate, conferenceController.getConferences);
router.get('/:id', authenticate, conferenceController.getConferenceById);
router.put('/:id', authenticate, conferenceController.updateConference);
router.put('/:id/state', authenticate, conferenceController.updateConferenceState);
router.post('/:id/pcc', authenticate, conferenceController.addPcChairs);
router.post('/:id/pcm', authenticate, conferenceController.addPcMembers);
router.get('/search', authenticate, conferenceController.searchConferences);
router.delete('/:id', authenticate, conferenceController.deleteConference);

module.exports = router;
