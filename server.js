// GLOBAL VARIABLES

const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
//PORT ACTIVE
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));


// GET route for Notes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html'))
);


// GET route for Homepage
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html'))
);


// INITIATE SERVER
app.listen(PORT, () => { console.log(`App listening at http://localhost:${PORT} 🚀`);  // http://localhost:3001 in broswer for project testing
});