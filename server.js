// requirements 
const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});


//starts the server to start listening
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});