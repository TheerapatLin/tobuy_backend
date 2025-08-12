const jwt = require('jsonwebtoken');
const config = require('../config');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token is incorrect or unidentify token' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, config.jwt_secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token Expired or Incorrect.' });
    }
    // เก็บข้อมูลผู้ใช้ที่ decode ไว้ให้ route ต่อไปเรียกใช้
    req.user = decoded;
    next();
  });
};