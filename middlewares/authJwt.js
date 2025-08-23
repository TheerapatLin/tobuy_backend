const jwt = require('jsonwebtoken');
const config = require('../config');
const { getAuthCookie, clearAuthCookie } = require('./cookieAuth');

exports.verifyToken = (req, res, next) => {
  // ตรวจสอบ token จาก cookie ก่อน
  const cookieToken = getAuthCookie(req);
  
  // ถ้าไม่มี cookie token ให้ตรวจสอบจาก Authorization header (backward compatibility)
  const authHeader = req.headers.authorization;
  const headerToken = authHeader ? authHeader.split(' ')[1] : null;
  
  const token = cookieToken || headerToken;
  
  if (!token) {
    return res.status(401).json({ 
      message: 'Access token not found',
      error: 'NO_TOKEN'
    });
  }

  jwt.verify(token, config.jwt_secret, (err, decoded) => {
    if (err) {
      // ลบ cookie ที่ไม่ถูกต้อง
      if (cookieToken) {
        clearAuthCookie(res);
      }
      return res.status(401).json({ 
        message: 'Token expired or invalid',
        error: 'INVALID_TOKEN'
      });
    }
    
    // เก็บข้อมูลผู้ใช้ที่ decode ไว้ให้ route ต่อไปเรียกใช้
    req.user = decoded;
    next();
  });
};