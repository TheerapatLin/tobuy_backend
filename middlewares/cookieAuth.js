const jwt = require('jsonwebtoken');
const config = require('../config');

// ตั้งค่า cookie options
const cookieOptions = {
  httpOnly: true, // ป้องกันการเข้าถึงจาก JavaScript
  secure: process.env.NODE_ENV === 'production', // ใช้ HTTPS ใน production
  sameSite: 'strict', // ป้องกัน CSRF
  maxAge: 24 * 60 * 60 * 1000, // 24 ชั่วโมง
  path: '/' // ใช้ได้ทุก path
};

// สร้าง token และตั้งค่า cookie
exports.setAuthCookie = (res, payload) => {
  const token = jwt.sign(payload, config.jwt_secret, {
    expiresIn: config.jwtExpiresIn
  });

  // ตั้งค่า httpOnly cookie
  res.cookie('authToken', token, cookieOptions);
  
  return token;
};

// อ่าน token จาก cookie
exports.getAuthCookie = (req) => {
  return req.cookies?.authToken;
};

// ลบ cookie
exports.clearAuthCookie = (res) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  });
};

// ตรวจสอบ token จาก cookie
exports.verifyAuthCookie = (req, res, next) => {
  const token = this.getAuthCookie(req);
  
  if (!token) {
    return res.status(401).json({ 
      message: 'Access token not found',
      error: 'NO_TOKEN'
    });
  }

  jwt.verify(token, config.jwt_secret, (err, decoded) => {
    if (err) {
      // ลบ cookie ที่ไม่ถูกต้อง
      this.clearAuthCookie(res);
      return res.status(401).json({ 
        message: 'Token expired or invalid',
        error: 'INVALID_TOKEN'
      });
    }
    
    req.user = decoded;
    next();
  });
};

// สร้าง refresh token cookie
exports.setRefreshCookie = (res, userId) => {
  const refreshToken = jwt.sign(
    { id: userId, type: 'refresh' },
    config.jwt_secret,
    { expiresIn: '7d' }
  );

  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 วัน
  });

  return refreshToken;
};

// อ่าน refresh token จาก cookie
exports.getRefreshCookie = (req) => {
  return req.cookies?.refreshToken;
};

// ลบ refresh token cookie
exports.clearRefreshCookie = (res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  });
};

module.exports = {
  setAuthCookie: exports.setAuthCookie,
  getAuthCookie: exports.getAuthCookie,
  clearAuthCookie: exports.clearAuthCookie,
  verifyAuthCookie: exports.verifyAuthCookie,
  setRefreshCookie: exports.setRefreshCookie,
  getRefreshCookie: exports.getRefreshCookie,
  clearRefreshCookie: exports.clearRefreshCookie
};
