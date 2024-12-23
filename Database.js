// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// app.use(express.json());
// app.use(cors());

// mongoose.connect("mongodb://localhost:27017/KeralaTourism")
//   .then(() => console.log("Successfully connected to MongoDB.."))
//   .catch((err) => console.log("MongoDB connection error:", err));


// const studendatas_Schema = new mongoose.Schema({
//   name: { type : String , required : true },
//   age: { type : Number , required : true },
//   coursename: { type : String , required : true }
// });

// const Data = mongoose.model("StudentDatalist", studendatas_Schema);

// app.post("/insertdatas", async (req, res) => {
//   const { name, age, coursename } = req.body;

//   try {
//     const newData = new Data({ name, age, coursename });
//     await newData.save();
//     res.status(201).json({ message: "Data inserted successfully!" });
//   } 
//   catch (error) {
//     res.status(400).json({ error: "Error inserting data" });
//   }
// });


// app.get("/getdatas", async (req, res) => {
//     try {
//       const data = await Data.find(); 
//       res.status(200).json(data); 
//     } catch (error) {
//       res.status(400).json({ error: "Error fetching data" });
//     }
//   });
  
// app.delete("/deletedata/:id", async (req, res) => {
//     const { id } = req.params;
  
//     try {
//       await Data.findByIdAndDelete(id);
//       res.status(200).json({ message: "Data deleted successfully!" });
//     } catch (error) {
//       res.status(400).json({ error: "Error deleting data" });
//     }
// });
  

// app.put("/updatedata/:id", async (req, res) => {
//     const { id } = req.params;
//     const { name, age, coursename } = req.body;
  
//     try 
//     {
//       await Data.findByIdAndUpdate(id, { name, age, coursename });
//       res.status(200).json({ message: "Data updated successfully!" });
//     } 
//     catch (error) 
//     {
//       res.status(400).json({ error: "Error updating data" });
//     }
// });


// app.listen(1000, () => { console.log(`Server is running on http://localhost:1000`); });








const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Lfmsians")
  .then(() => console.log("Successfully connected to MongoDB.."))
  .catch((err) => console.log("MongoDB connection error:", err));

const studentDataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true }
});

const Data = mongoose.model("Studentnamelist", studentDataSchema);

app.post("/insertdatas", (req, res) => {
    const { name, age } = req.body;
    try {
        const newData = new Data({ name, age });
        newData.save();
        res.status(200).json({ message: "Data inserted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error inserting data", error });
    }
});

app.get("/getdatas", async (req, res) => {
    try {
        const totalData = await Data.find();
        res.status(200).json({ totaldatas: totalData });
    } catch (err) {
        res.status(500).json({ message: "Fetching error", error: err });
    }
});

app.delete("/deletedatas/:val", async (req,res) => {
    try{
        const {val} = req.params;
        await Data.findByIdAndDelete(val);
        res.status(200).json({message : "Datas deleted.."});
    }
    catch(err){
        res.status(500).json({message : "Error occured for deletion"});
    }
});

app.put("/updatedatas/:updval",async (req,res)=>{
    try{
        const {updval} = req.params;
        const {name,age} = req.body;
        await Data.findByIdAndUpdate(updval,{name,age});
        res.status(200).json({message:"Datas updated"});
    }
    catch{
        res.status(500).json({message:"Error occured for updation"});
    }
});
  

app.listen(1122, () => {
    console.log(`Server is running on http://localhost:1122`);
});
