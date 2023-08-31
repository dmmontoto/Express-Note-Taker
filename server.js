const express = require('express');
const path = require('path');
const apiRoutes = require('./public/routes/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.use('/api', apiRoutes);

// Serve the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// Serve the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);