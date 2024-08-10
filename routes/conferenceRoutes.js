const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const conferenceController = require('../controllers/conferenceController');
const router = express.Router();

// Δημόσια routes
router.get('/', conferenceController.getConferences);
router.get('/:id', conferenceController.getConferenceById);
router.get('/search', conferenceController.searchConferences);

// Προστατευόμενα routes
router.post('/', authenticate, authorize('USER'), conferenceController.createConference);
router.put('/:id', authenticate, authorize('PC_CHAIR'), conferenceController.updateConference);
router.put('/:id/state', authenticate, authorize('PC_CHAIR'), conferenceController.updateConferenceState);
router.delete('/:id', authenticate, authorize('PC_CHAIR'), conferenceController.deleteConference);
router.post('/:id/pcc', authenticate, authorize('PC_CHAIR'), conferenceController.addPcChairs);
router.post('/:id/pcm', authenticate, authorize('PC_CHAIR'), conferenceController.addPcMembers);

module.exports = router;
