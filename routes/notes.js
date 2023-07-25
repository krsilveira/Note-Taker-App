//GLOBAL VARIABLES

const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile, } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');


// notes.get retirves ALL notes
notes.get('/', (req, res) => { readFromFile('./db/db.json').then((data) => {
    // console.log(`Raw data in db is: ${data}`); 
     res.json(JSON.parse(data));
  })
});

// specific note gets retrieved 
notes.get('/:id', (req, res) => { const noteId = req.params.id;
  readFromFile('./db/db.json') .then((data) => JSON.parse(data)) .then((json) => {

      const result = json.filter((note) => note.id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID'); }); // error message when note does not exist
});



// notes.deleted function responds to a specific note the User selects for deletion when clicking the trashcan icon

notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {

      // New array is created with all notes 
      // without ID provided 
      const result = json.filter((note) => note.id !== noteId);
      writeToFile('./db/db.json', result); //array is assigned to file
      res.json(`Item ${noteId} has been deleted 🗑️`);  // res.json is responding to note being deleted
    });
});

notes.post('/', (req, res) => { console.log(req.body);

  const { title, text } = req.body; if (req.body) { const newNote = { title, text, id: uuidv4(),
     };

     //response is recorded on db.json file
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`); // response to successful note addidtion
  } else {
    res.error('Error in adding note'); // response Error message indicating in unsuccessful note addition 
  }
});



//module export
module.exports = notes;