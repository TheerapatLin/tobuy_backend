const rateLimit = require('express-rate-limit');

// Rate limiter สำหรับ login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 นาที
  max: 100, // จำกัด 5 ครั้งต่อ 15 นาที
  message: {
    message: 'Too many login attempts, please try again after 15 minutes.',
    error: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      message: 'Too many login attempts, please try again after 15 minutes.',
      error: 'RATE_LIMIT_EXCEEDED',
      retryAfter: Math.ceil(1 * 60 / 1000) // 1 นาทีในวินาที
    });
  }
});

// Rate limiter สำหรับ signup
const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 ชั่วโมง
  max: 100, // จำกัด 3 ครั้งต่อ 1 ชั่วโมง
  message: {
    message: 'Too many signup attempts, please try again after 1 hour.',
    error: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      message: 'Too many signup attempts, please try again after 1 hour.',
      error: 'RATE_LIMIT_EXCEEDED',
      retryAfter: Math.ceil(1 * 60 / 1000) // 1 นาทีในวินาที
    });
  }
});

// Rate limiter ทั่วไปสำหรับ API
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 นาที
  max: 1000, // จำกัด 1000 ครั้งต่อ 15 นาที
  message: {
    message: 'Too many requests, please try again later.',
    error: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      message: 'Too many requests, please try again later.',
      error: 'RATE_LIMIT_EXCEEDED'
    });
  }
});

// Rate limiter สำหรับ protected routes
const protectedRouteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 นาที
  max: 1000, // จำกัด 1000 ครั้งต่อ 15 นาที
  message: {
    message: 'Too many requests to protected routes, please try again later.',
    error: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      message: 'Too many requests to protected routes, please try again later.',
      error: 'RATE_LIMIT_EXCEEDED'
    });
  }
});

module.exports = {
  loginLimiter,
  signupLimiter,
  generalLimiter,
  protectedRouteLimiter
};
