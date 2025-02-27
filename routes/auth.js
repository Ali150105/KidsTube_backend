const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Ruta de registro
router.post('/register', authController.register);

module.exports = router;