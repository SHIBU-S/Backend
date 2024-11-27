const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");

const port = 4444;

app.use(express.static(__dirname));

storage_field = multer.diskStorage(
    {
        destination : (req,file,cb)=>{
            cb(null,path.join(__dirname,"Images"));
        },

        filename : (req,file,cb)=>{
            cb(null,file.filename + Date.now() + file.originalname)
        }
    }
)

const upload = multer({storage : storage_field});

app.post("/Images",upload.single("image"),(req,res)=>{
    if(req.url==="/Images")
    {
        res.send("File successfully uploaded..");
    }
});

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`)
})

