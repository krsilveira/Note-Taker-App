//Global Variable

const express = require('express');
const notesRouter = require('./notes');
const app = express();
// set up middleware for application
app.use('/notes', notesRouter);


//module export
module.exports = app;