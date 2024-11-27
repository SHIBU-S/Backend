// const express = require("express");
// const app = express();
// const multer = require("multer");
// const path = require("path");

// const port = 4444;

// app.use(express.static(__dirname));

// storage_field = multer.diskStorage(
//     {
//         destination : (req,file,cb)=>{
//             cb(null,path.join(__dirname,"Images"));
//         },

//         filename : (req,file,cb)=>{
//             cb(null,file.filename + Date.now() + file.originalname)
//         }
//     }
// )

// const upload = multer({storage : storage_field});

// app.post("/Images",upload.single("image"),(req,res)=>{
//     if(req.url==="/Images")
//     {
//         res.send("File successfully uploaded..");
//     }
// });

// app.listen(port,()=>{
//     console.log(`Server is listening on port ${port}`)
// })



const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const port = 4444;

// Ensure the 'Images' directory exists
const imagesDir = path.join(__dirname, "Images");
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

const storage_field = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imagesDir); // Save to 'Images' directory
    },
    filename: (req, file, cb) => {
        // Generate a unique filename with timestamp and original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Retain the original file extension
    }
});

const upload = multer({ storage: storage_field });

app.post("/Images", upload.single("Photo"), (req, res) => {
    // Respond with a success message
    res.send("File successfully uploaded..");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
