const express = require('express');
const cookieParser = require('cookie-parser');

// import log morgan
const morgan = require('morgan');
const { initDB } = require('./DB/configDb')
const cors = require('cors');
const { generalLimiter } = require('./middlewares/rateLimiter');

// import env config
const config = require('./config');

const app = express()

// config cors (frontend) - ต้องเพิ่ม credentials: true สำหรับ cookies
const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001'
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());

// เพิ่ม cookie parser middleware
app.use(cookieParser());

// use log morgan
app.use(morgan('combined'));

// CORS error handling
app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        console.error('CORS Error:', err.message);
        console.error('Origin:', req.headers.origin);
        return res.status(403).json({
            message: 'CORS Error: Origin not allowed',
            error: 'CORS_ERROR',
            origin: req.headers.origin
        });
    }
    next(err);
});

// Apply general rate limiting to all routes
app.use(generalLimiter);

// Get / api test
app.get('/', (req, res) => {
    res.send('Hello Node.js Backend!');
});

// Post /echo api test
app.post('/echo', (req, res) => {
    res.json({
        message: 'You sent:',
        data: req.body
    });
});

// signin & signup 
const authRoute = require('./routes/authRoute')
app.use('/api/auth', authRoute)

// test access with jwt
const protectedRoute = require('./routes/protectedRoute');
app.use('/api', protectedRoute);

// run server
const PORT = config.port_b;
app.listen(PORT, async () => {
    console.log(`Server running at ${config.host_b}${PORT}`);

    // connect DB, check table in DB
    await initDB();
});
