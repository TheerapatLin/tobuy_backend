const express = require('express');
const router = express.Router();
const { signinController, signupController, logoutController, refreshTokenController } = require('../controllers/authController');
const { 
  signinValidation, 
  signupValidation, 
  handleValidationErrors 
} = require('../middlewares/validation');
const { loginLimiter, signupLimiter } = require('../middlewares/rateLimiter');

router.post('/signin', loginLimiter, signinValidation, handleValidationErrors, signinController);
router.post('/signup', signupLimiter, signupValidation, handleValidationErrors, signupController);
router.post('/logout', logoutController);
router.post('/refresh', refreshTokenController);

module.exports = router;