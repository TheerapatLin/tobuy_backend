const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../DB/configDb');
const { CHECKUSER, SIGNUPUSER } = require('../schemas/signUpUser');
const config = require('../config');

exports.signinController = async (req, res) => {
    // body ใน req ต้องมีค่าเป็น {"username": "username","password":"password"}
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

        // ถ้าใน table ไม่มี username ที่ตรงกัน
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Not found this user or password is incorrect.' });
        }

        const user = result.rows[0];

        // ตรวจ password
        const match = await bcrypt.compare(password, user.password);
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

exports.signupController = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'complete your profile. (username, email ,password)' });
    }
    try {
        // ตรวจสอบว่ามี username, email ซ้ำกันมั้ย
        const userExist = await pool.query(
            CHECKUSER,
            [username, email]
        );
        if (userExist.rows.length > 0) {
            return res.status(400).json({ message: 'Username or Email already existed.' });
        }

        // salt ยิ่งสูงยิ่งปลอดภัย แต่ยิ่งใช้เวลามากขึ้น, saltRounds เป็นจำนวนรอบในการสร้าง salt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await pool.query(
            SIGNUPUSER,
            [username, email, hashedPassword]
        );
        res.status(200).json({ message: `Signup successful.` })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}