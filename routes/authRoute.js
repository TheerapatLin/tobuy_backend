const express = require('express');
const router = express.Router();
const { signinController,signupController  } = require('../controllers/authControllers');

router.post('/signin', signinController);
router.post('/signup', signupController);

module.exports = router;