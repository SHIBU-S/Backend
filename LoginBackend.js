const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 2050;

mongoose.connect("mongodb://localhost:27017/SampleLogin")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

app.use('/LoginImage', express.static(path.join(__dirname, 'LoginImage')));
const storage_field = multer.diskStorage({
    destination: (req,file,cb)=> { cb(null,"./LoginImage") },
    filename : (req,file,cb)=> { cb(null,Date.now() + "---" + file.originalname) }
});
const upload = multer({storage : storage_field});

const LoginSchema = new mongoose.Schema({
    name : {type : String},
    image : {type : String}
})
const Datas = mongoose.model("LoginDatas",LoginSchema);

app.post("/LoginInsert",upload.single("image"),async(req,res)=>{
  const {name} = req.body;
  const ImageUrl = req.file ? `http://localhost:${PORT}/LoginImage/${req.file.filename}` : "";
  try{
    const newDatas = new Datas({name,image:ImageUrl});
    await newDatas.save();
    res.send("Datas inserted successfully..");
  }
  catch(err){
    res.send("Error inserting datas",err);
  }
});

app.put("/LoginEdit/:id",upload.single("image"),async(req,res)=>{
  try{
    const {id} = req.params;
    const {name} = req.body;
    const existingdatas = await Datas.findById(id);
    if(name) existingdatas.name = name;
    if(req.file){
      const imgurl = `http://localhost:${PORT}/LoginImage/${req.file.filename}`;
      existingdatas.image = imgurl;
    }
    await existingdatas.save();
  }
  catch(err){
    res.send("Error edit datas",err);
  }
})

app.get("/GetLoginDatas",async(req,res)=>{
  try{
    const totaldatas = await Datas.find();
    res.send({totaldatas});
  }
  catch(err){
    res.send("Error fetch datas",err);
  }
});


app.listen(PORT,()=>{console.log(`Server is listening on port ${PORT}`)});