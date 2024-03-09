const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.post('/user_signup',authController.userSignup);
router.post('/user_login', authController.userLogin);

module.exports = router;


