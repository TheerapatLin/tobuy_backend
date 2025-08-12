const express = require('express');

// import log morgan
const morgan = require('morgan');
const { initDB } = require('./DB/configDb')
const cors = require('cors');

// import env config
const config = require('./config');

const app = express()

// config cors (frontend)
app.use(cors({
    origin: `${config.host}${config.port_f}`
}));
app.use(express.json());

// use log morgan
app.use(morgan('combined'));


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
app.use('/api/auth', authRoute);

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
