// GLOBAL VARIABLES

const express = require('express');
const path = require('path');

//PORT ACTIVE
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));




// INITIATE SERVER
app.listen(PORT, () => { console.log(`App listening at  http://localhost:${PORT} 🚀`);  // http://localhost:3001 in broswer for project testing
});