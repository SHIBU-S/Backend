
const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");

const port = 4444;

const storage_field = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, path.join(__dirname,"Images"));
    },
    filename : (req,file,cb)=>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

function fileFilter_field(req,file,cb){
    const filetype = ["image/jpg","image/jpeg","image/png"];
    if(filetype.includes(file.mimetype))
    {
        cb(null,true);
    }
    else
    {
        cb(new Error("It's not allowed to upload"),false);
    }
}

const upload = multer({
    storage : storage_field,
    fileFilter : fileFilter_field
});


app.post("/Image",upload.single("imageupload"),(req,res,next)=>{
    if(req.file)
    {
        res.send(`File successfully uploaded..`);
    }
    else
    {
        res.send("No File uploaded..");
    }
});

app.use((err,req,res,next)=>{
    if(err.message === "It's not allowed to upload")
    {
        res.send("It's not allowed to upload");
    }
    else
    {
        res.send("Someting went wrong");
    }
})

app.listen(port,()=>{
    console.log(`Server is listening on the port ${port}`)
});

