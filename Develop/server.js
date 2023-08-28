const express = require('express');
const path = require('path');
// const api = require('./routes/index.js');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.redirect('/notes.html');
});

app.get('*', (req, res) => {
    res.redirect('/index.html');
});

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);