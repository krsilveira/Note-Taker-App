// GLOBAL VARIABLES

const express = require('express');
const path = require('path');
const generateUniqueId = require('generate-unique-id');
const app = express();
const {error} = require('console');
const fs = require('fs').promises;
// INSTALL PORT 
const PORT = process.env.PORT || 3000;


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// READ database for json file
const readCurrentDB = async () => {
  var data = await fs.readFile("./db/db.json", "utf-8")
  return JSON.parse(data)
}
// WRITE database for json file
const writeNewDB = (data) => { fs.writeFile("./db/db.json", JSON.stringify(data, null, 4), err => {
      err ? console.log(err) : console.log('Wrote new db file.')
  });
};


// MAIN MENNU/landing page 
// GET route
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

// NOTES page 
// GET route
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// db/db.json file 
//GET route 
app.get('/api/notes', async (req, res) => { let notes = await readCurrentDB()
  res.json(notes)
});

// New note addition to db/db.json file 
//POST route 
app.post('/api/notes', async (req, res) => { const { title, text } = req.body
  if (!title || !text) {
      res.json({ error: "Invalid, emtpy field" })
      return
  }

  let newNote = { title, text, id: generateUniqueId() }

  let currentNotes = await readCurrentDB()
  console.log(currentNotes);
  currentNotes.push(newNote)
  writeNewDB(currentNotes);
  res.json({ message: "Processing post" })
});



// Remove specific note in db/db.json file 
// DELETE route 
app.delete('/api/notes/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!id) {
      res.json({ error: "Cannot complete request. Object id required." })
  }

  let currentNotes = await readCurrentDB();
  const filteredNotes = currentNotes.filter(note => note.id != id);
  writeNewDB(filteredNotes);
  res.json({ message: "Processing deletion." })
})



// INITIATE SERVER
app.listen(PORT, () => { console.log(`App listening at http://localhost:${PORT} 🚀`);  // http://localhost:3001 in broswer for project testing
});