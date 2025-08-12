const express = require('express');
const morgan = require('morgan');
const { initDB } = require('./DB/configDb')
const cors = require('cors');
const config = require('./config');
const signupRoute = require('./routes/signupRoute')

const app = express()
app.use(cors({
    origin: `${config.host}${config.port_f}`
}));
app.use(express.json());
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send('Hello Node.js Backend!');
});

app.post('/echo', (req, res) => {
    res.json({
        message: 'You sent:',
        data: req.body
    });
});

app.use('/api', signupRoute)

const PORT = config.port_b;
app.listen(PORT, async () => {
    console.log(`Server running at http://${config.host_b}${PORT}`);
    await initDB();
});
