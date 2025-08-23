`yarn add jsonwebtoken bcrypt`
jsonwebtoken ใช้สร้างและตรวจสอบ JWT token
bcrypt ใช้สำหรับ hash รหัสผ่าน และตรวจสอบรหัสผ่านแบบปลอดภัย
Refresh Token คือ บัตรพิเศษที่มีอายุนานกว่า Access Token (เช่น 7 วัน – 30 วัน) ใช้เพื่อขอ Access Token ใหม่เมื่อหมดอายุ