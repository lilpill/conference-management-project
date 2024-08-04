const express = require('express');
const { authenticate } = require('../middleware/auth');
const paperController = require('../controllers/paperController');
const router = express.Router();

router.post('/', authenticate, paperController.createPaper);
router.get('/', authenticate, paperController.getPapers);

module.exports = router;
