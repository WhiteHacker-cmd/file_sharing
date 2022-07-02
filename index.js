require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer")
const bcrypt = require("bcrypt")

mongoose.connect(process.env.DATABASE_URL)

const File = require("./models/File");

const app = express();

const router = express.Router()


const upload = multer({ dest: 'uploads/' })

app.use(express.urlencoded({extended: true}))




app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render("index")
})



app.post("/upload", upload.single("file"), async(req, res) => {

    if(req.file == null){
        res.render("index", {error: true})
        return
    }

    const fileData = {
        path: req.file.path,
        orgin_name: req.file.originalname,
    }

    if(req.body.password != null && req.body.password != ""){
        fileData.password = await bcrypt.hash(req.body.password, 10)
    }

    const file = File.create(fileData)

    console.log(req.headers.origin);
    
    res.render("index", {link: `${req.headers.origin}/download/${(await file).id}`})
})




app.route('/download/:id').get(hadleFunction)
.post(hadleFunction)


async function hadleFunction(req, res) {
    

    const file = await File.findById(req.params.id)
    
    

    if(file.password != null){
        if(req.body.password == null){
        res.render("password")
        return
        }

        
        if(!(await bcrypt.compare(req.body.password, file.password))){
            res.render("password", {error: true})
        }
    }


    file.download_count++
    await file.save()

    console.log(file);
    res.download(file.path, file.orgin_name)
}


app.listen(process.env.PORT, ()=> console.log("running"));