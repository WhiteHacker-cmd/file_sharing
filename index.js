require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL)

const File = require("./models/File");

const app = express();

const router = express.Router()

const multer = require("multer")

const file = multer({ dest: 'uploads/' })



app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render("index")
})



app.post("/upload", file.single("file"), (req, res) => {
    
    res.send("hi")
})


app.listen(process.env.PORT, ()=> console.log("running"));