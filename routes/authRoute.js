const express = require('express');
const router = express.Router();
const { signinController } = require('../controllers/authControllers');

router.post('/signin', signinController);

module.exports = router;