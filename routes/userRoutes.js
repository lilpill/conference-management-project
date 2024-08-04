const express = require('express');
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/update', authenticate, userController.updateUser);
router.put('/update-password', authenticate, userController.updatePassword);
router.put('/update-status/:id', authenticate, userController.updateAccountStatus);
router.delete('/:id', authenticate, userController.deleteUser);

module.exports = router;
