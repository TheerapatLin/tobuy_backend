const { body, validationResult } = require('express-validator');

// Validation rules สำหรับ signup
exports.signupValidation = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be 3-30 characters long.')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username must contain only letters, numbers, or underscores.')
    .notEmpty()
    .withMessage('Username cannot be empty.'),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .normalizeEmail()
    .notEmpty()
    .withMessage('Email cannot be empty.'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;':",.<>?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{}|;':",.<>?]/)
    .withMessage('Your password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.')
    .notEmpty()
    .withMessage('Password cannot be empty.')
];

// Validation rules สำหรับ signin
exports.signinValidation = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username or Email cannot be empty.'),
  
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty.')
];

// Middleware สำหรับตรวจสอบ validation errors
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Incorrect data.',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg
      }))
    });
  }
  next();
};
