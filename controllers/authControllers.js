const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../DB/configDb');
const { CHECKUSER } = require('../schemas/signUpUser');
const config = require('../config');

exports.signinController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'identify your username/email and paswword' });
  }

  try {
    // ตรวจว่ามี user หรือไม่
    const result = await pool.query(
      CHECKUSER,
      [username, username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Not found this user or password is incorrect.' });
    }

    const user = result.rows[0];
    // ตรวจ password
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: 'Not found this user or password is incorrect.' });
    }

    // สร้าง JWT
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      roleId: user.role_id
    };
    const token = jwt.sign(payload, config.jwt_secret, {
      expiresIn: config.jwtExpiresIn
    });

    // ส่งกลับ token
    return res.status(200).json({
      message: 'Signin Complete',
      token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};