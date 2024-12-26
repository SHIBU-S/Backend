const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 1122;

app.use(cors());
app.use(bodyParser.json()); // To parse incoming JSON requests

mongoose.connect("mongodb://localhost:27017/Formpage")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Datas = mongoose.model("User", userSchema);


// 1. Insert new data
app.post("/insertdatas", async (req, res) => {
  const { name, age } = req.body;
  
  try {
    const newUser = new Datas({ name, age });
    await newUser.save();
    res.status(200).send({ message: "Data inserted successfully" });
  } catch (err) {
    res.status(500).send({ message: "Error inserting data", error: err.message });
  }
});

// 2. Get all data
app.get("/getdatas", async (req, res) => {
  try {
    const totaldatas = await Datas.find();
    res.status(200).send({ totaldatas });
  } catch (err) {
    res.status(500).send({ message: "Error fetching data", error: err.message });
  }
});

// 3. Delete data by ID
app.delete("/deletedatas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await Datas.findByIdAndDelete(id);
    if (deletedUser) {
      res.status(200).send({ message: "Data deleted successfully" });
    } else {
      res.status(404).send({ message: "Data not found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Error deleting data", error: err.message });
  }
});

// 4. Update data by ID
app.put("/updatedatas/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  
  try {
    const updatedUser = await Datas.findByIdAndUpdate(id, { name, age }, { new: true });
    if (updatedUser) {
      res.status(200).send({ message: "Data updated successfully", updatedUser });
    } else {
      res.status(404).send({ message: "Data not found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Error updating data", error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
