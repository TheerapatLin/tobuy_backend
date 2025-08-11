const express = require('express');
const morgan = require('morgan');
const {initDB} = require('./DB/config')
const cors = require('cors');
const {signupController} = require('./controllers/signUpControllers')

const app = express();
app.use(cors({
  origin: 'http://localhost:5173'
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

app.post('/api/signup', signupController)

const PORT = 8080;
app.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}`);
    await initDB();
});
