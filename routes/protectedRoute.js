// ใน routes/protectedRoute.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authJwt');

router.get('/profile', verifyToken, (req, res) => {
  // req.user มาจาก payload ใน JWT
  res.json({
    message: `Welcome, ${req.user.username}!`,
    data: req.user
  });
});

module.exports = router;