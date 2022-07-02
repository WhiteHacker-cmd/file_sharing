const mongoose = require("mongoose")


const File = new mongoose.Schema({
    path:{
        type: String,
        required: true
    },
    orgin_name: String,
    password: String,
    download_count:{
        type: Number,
        required: true,
        default: 0
    }
})


module.exports = mongoose.model("File", File)