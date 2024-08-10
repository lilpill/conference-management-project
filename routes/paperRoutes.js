const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const paperController = require('../controllers/paperController');
const router = express.Router();

// Routes για τους Authors
router.post('/', authenticate, authorize('AUTHOR'), paperController.createPaper);
router.put('/:id', authenticate, authorize('AUTHOR'), paperController.updatePaper);
router.put('/:id/submit', authenticate, authorize('AUTHOR'), paperController.submitPaper);
router.put('/:id/final-submit', authenticate, authorize('AUTHOR'), paperController.finalSubmitPaper);
router.put('/:id/add-coauthor', authenticate, authorize('AUTHOR'), paperController.addCoAuthor);
router.delete('/:id', authenticate, authorize('AUTHOR'), paperController.withdrawPaper);

// Routes για τους PC Members
router.put('/:id/review', authenticate, authorize(['PC_MEMBER', 'PC_CHAIR']), paperController.reviewPaper);
router.put('/:id/assign-reviewer', authenticate, authorize('PC_CHAIR'), paperController.assignReviewer);

// Routes για τους PC Chairs
router.put('/:id/approve', authenticate, authorize('PC_CHAIR'), paperController.approvePaper);
router.put('/:id/reject', authenticate, authorize('PC_CHAIR'), paperController.rejectPaper);
router.put('/:id/accept', authenticate, authorize('PC_CHAIR'), paperController.acceptPaper);

// Δημόσια routes
router.get('/', authenticate, paperController.getPapers);
router.get('/:id', authenticate, paperController.getPaperById);
router.get('/search', authenticate, paperController.searchPapers);

module.exports = router;
