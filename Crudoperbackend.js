const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { type } = require("os");
const port = 9978;

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/CrudOperation")
.then(()=>console.log("Connected successfully"))
.catch((err)=>console.log("Connection error :",err));

const CrudDatas_Schema = new mongoose.Schema({
    name : {type : String},
    age  : {type : Number}
});
const CrudDatas = mongoose.model("CrudDatas",CrudDatas_Schema);

// ------Add
app.post("/Add",async(req,res)=>{
    const {name,age} = req.body;
    try{
        const newDatas = new CrudDatas({name,age});
        await newDatas.save();
        console.log(newDatas);
        res.send("Successfully datas submitted");
    }
    catch(err){
        res.send("Error occurs for submission",err);
    }
});

// ------Fetch
app.get("/Get",async(req,res)=>{
    try{
        const totaldatas = await CrudDatas.find();
        res.send({totaldatas});
    }
    catch(err){
        res.send("Error occurs for fetching datas",err);
    }
});

// ------Edit
app.put("/Edit",async(req,res)=>{
    const {name,age} = req.body;
    
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });