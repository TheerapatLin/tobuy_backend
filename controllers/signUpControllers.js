const bcrypt = require('bcrypt');
const {pool} = require('../DB/configDb')
const { CHECKUSER, SIGNUPUSER } = require('../Schemas/signUpUser')

exports.signupController = async (req, res) => {
    const { username, email, password_hash } = req.body;
    if (!username || !email || !password_hash) {
        return res.status(400).json({ message: 'complete your profile. (username, email ,password)' });
    }
    try {
        const userExist = await pool.query(
            CHECKUSER,
            [username, email]
        );
        if (userExist.rows.length > 0) {
            return res.status(400).json({ message: 'Username or Email already existed.' });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password_hash, saltRounds);
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