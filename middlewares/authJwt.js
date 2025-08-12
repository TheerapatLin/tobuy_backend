const jwt = require('jsonwebtoken');
const config = require('../config');

exports.verifyToken = (req, res, next) => { // next คือเรียกใช้งาน func ถัดไป
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token is incorrect or unidentify token' });
  }

  // filter `bearer` out
  const token = authHeader.split(' ')[1];
  
  /*
  callback (err, decoded)
  ฟังก์ชันที่จะถูกเรียกหลัง verify จบ | err: เกิดเมื่อ verify ล้มเหลว (หมดอายุหรือเซ็นไม่ตรงกัน) | decoded: payload ที่ถูกถอดรหัสแล้ว
  */
  jwt.verify(token, config.jwt_secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token Expired or Incorrect.' });
    }
    // เก็บข้อมูลผู้ใช้ที่ decode ไว้ให้ route ต่อไปเรียกใช้
    req.user = decoded;
    next(); // เรียกใช้งาน func ถัดไป
  });
};