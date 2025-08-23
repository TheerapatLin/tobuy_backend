const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../DB/configDb');
const { CHECKUSER, SIGNUPUSER } = require('../schemas/signUpUser');
const config = require('../config');

exports.signinController = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // ตรวจว่ามี user หรือไม่
        const result = await pool.query(
            CHECKUSER,
            [username, username]
        );

        // ถ้าใน table ไม่มี username ที่ตรงกัน
        if (result.rows.length === 0) {
            return res.status(401).json({ 
                message: 'Username or Password is incorrect.',
                error: 'INVALID_CREDENTIALS'
            });
        }

        const user = result.rows[0];

        // ตรวจ password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ 
                message: 'Username or Password is incorrect.',
                error: 'INVALID_CREDENTIALS'
            });
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
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                roleId: user.role_id
            }
        });
    } catch (error) {
        console.error('Signin error:', error);
        return res.status(500).json({ 
            message: 'Internal Server Error',
            error: 'INTERNAL_SERVER_ERROR'
        });
    }
};

exports.signupController = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        // ตรวจสอบว่ามี username, email ซ้ำกันมั้ย
        const userExist = await pool.query(
            CHECKUSER,
            [username, email]
        );
        
        if (userExist.rows.length > 0) {
            // ตรวจสอบว่าเป็น username หรือ email ที่ซ้ำ
            const existingUser = userExist.rows[0];
            if (existingUser.username === username) {
                return res.status(400).json({ 
                    message: 'Username already existed.',
                    error: 'USERNAME_EXISTS',
                    field: 'username'
                });
            } else if (existingUser.email === email) {
                return res.status(400).json({ 
                    message: 'Email already existed.',
                    error: 'EMAIL_EXISTS',
                    field: 'email'
                });
            }
        }

        // salt ยิ่งสูงยิ่งปลอดภัย แต่ยิ่งใช้เวลามากขึ้น, saltRounds เป็นจำนวนรอบในการสร้าง salt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const result = await pool.query(
            SIGNUPUSER,
            [username, email, hashedPassword]
        );

        res.status(201).json({ 
            message: 'Signup Complete',
            user: {
                id: result.rows[0].id,
                username,
                email
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ 
            message: 'Internal Server Error.',
            error: 'INTERNAL_SERVER_ERROR'
        });
    }
};