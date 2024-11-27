
// const express = require('express');
// const multer = require('multer');
// const app = express();

// const {mongoose} = require('mongodb');

// const upload = multer({storage : multer.memoryStorage()});      // Store files in memory

// app.post('/Upload',upload.single('myFile'),async(req,res)=>{
//     mongoose.connect("mongodb://localhost:27017/");
// })

// app.listen(2000,()=>{console.log("Server is listening on port 2000")});




// const express = require('express');
// const multer = require('multer');
// const mongoose = require('mongoose');
// const app = express();

// // Setting up memory storage for multer
// const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

// // MongoDB connection URI
// const mongoURI = 'mongodb://localhost:27017/'; // Replace 'your_database_name' with your actual DB name

// // Connect to MongoDB with Mongoose
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Connected to MongoDB successfully");
//   })
//   .catch((err) => {
//     console.log("Error connecting to MongoDB:", err);
//   });

// app.post('/Upload', upload.single('myFile'), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   try {
//     // Example: Store the file data in MongoDB (you can define your own schema)
//     const FileSchema = new mongoose.Schema({
//       originalName: String,
//       mimetype: String,
//       size: Number,
//       buffer: Buffer
//     });

//     const FileModel = mongoose.model('File', FileSchema);

//     const newFile = new FileModel({
//       originalName: req.file.originalname,
//       mimetype: req.file.mimetype,
//       size: req.file.size,
//       buffer: req.file.buffer
//     });

//     // Save the file to the database
//     await newFile.save();
//     res.status(200).send('File uploaded and saved to database!');
//   } catch (error) {
//     res.status(500).send('Error saving the file to the database.');
//   }
// });

// app.listen(2000, () => {
//   console.log("Server is listening on port 2000");
// });




// const cors = require('cors');
// const express = require('express');
// const bodyParser = require('body-parser'); 
// const db = require('mongoose'); 
// const app = express();

// db.connect("mongodb://localhost:27017/MyDatabase").then(()=>{
//     console.log("db connected")
// })

// const schema = new db.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     age:{type:Number,required:true}
// });

// const contact=new db.model("Demo",schema)

// app.use(cors()); 
// app.use(bodyParser.json());

// app.post('/register', async(req, res) => {
//     const { name, email, password,age} = req.body;
    
//     console.log('User Registered:', { name, email, password,age});
//     await contact.create({
//         name:name,
//         email:email,
//         password:password,
//         age:age
//    })
//     res.send({ message: 'User registered successfully!', data: { name, email } });

// })

// app.listen(8000, () => {
//     console.log('Server is running on http://localhost:8000');
// });



const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();

mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('DB connected');
}).catch((err) => {
  console.error('DB connection error:', err);
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
});

const User = mongoose.model('User', userSchema);

app.use(cors());
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
  const { name, email, password, age } = req.body;

  if (!name || !email || !password || !age) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      age,
    });

    await user.save();
    res.send({ message: 'User registered successfully!', data: { name, email } });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send({ message: 'Server error' });
  }
});

app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});
