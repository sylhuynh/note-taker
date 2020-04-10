// requirements 
const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notes = [];

//Routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });


app.get("/api/notes", (req, res) => {
    const filePath = path.join(__dirname, "/db/db.json");

    fs.readFile(filePath, "utf8", (err,data)=>{
        if (err) throw err;

        const parsedData = JSON.parse(data);
        return res.json(parsedData);
    });
  });

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    console.log(newNote);
    
    notes.push(newNote);
    
    fs.writeFile("/db/db.json", JSON.stringify(notes), function(err){
        if (err) throw err;
    
    });

    res.json(newNote);
  });









app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});


//starts the server to start listening
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});