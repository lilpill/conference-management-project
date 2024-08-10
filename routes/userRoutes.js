const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const userController = require('../controllers/userController');
const router = express.Router();

// Δημόσια routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Προστατευόμενα routes
router.put('/update', authenticate, userController.updateUser);
router.put('/update-password', authenticate, userController.updatePassword);
router.put('/update-status/:id', authenticate, authorize('ADMIN'), userController.updateAccountStatus);
router.delete('/delete/:id', authenticate, authorize(['ADMIN', 'USER']), userController.deleteUser);

module.exports = router;
