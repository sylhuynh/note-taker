// requirements 
const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notes = [];

//Routes

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/notes", (req, res) => {
    const filePath = path.join(__dirname, "/db/db.json");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) throw err;

        let savedNotes = JSON.parse(data);
        res.json(savedNotes);
    });

    let newNote = req.body;
    newNote.id = notes.length;
    console.log("newNoteId:" + newNote.id);
    console.log(newNote);
    notes.push(newNote);

    fs.writeFileSync(filePath, JSON.stringify(notes), function (err) {
        if (err) throw err;
        res.json(newNote);
    });

});

app.delete("/api/notes/:id", (req, res) => {
    const filePath = path.join(__dirname, "/db/db.json");

    notes = notes.filter(note => {
        return note.id.toString() !== req.params.id
     });

    console.log(notes)
    fs.writeFileSync(filePath, JSON.stringify(notes), function (err) {
        if (err) throw err;
    });
    return res.sendStatus(200);

});


//starts the server to start listening
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});