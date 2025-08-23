const express = require('express');
const router = express.Router();
const { signinController, signupController } = require('../controllers/authControllers');
const { 
  signinValidation, 
  signupValidation, 
  handleValidationErrors 
} = require('../middlewares/validation');

router.post('/signin', signinValidation, handleValidationErrors, signinController);
router.post('/signup', signupValidation, handleValidationErrors, signupController);

module.exports = router;