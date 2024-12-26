// const express = require('express');
// const multer = require('multer');
// const mongoose = require('mongoose');
// const fs = require('fs');
// const path = require('path');
// const bodyParser = require('body-parser');
// const cors = require("cors");

// const app = express();
// app.use(cors());
// const port = 5432;

// mongoose.connect('mongodb://localhost:27017/Images')
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.log('MongoDB connection error:', err));

// app.use(bodyParser.json());

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// const imgSchema = new mongoose.Schema({
//   image: { data: Buffer, contentType: String },
// });

// const Image = mongoose.model('Image', imgSchema);


// app.post('/upload', upload.single('image'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   const img = fs.readFileSync(req.file.path);
//   const encode_img = img.toString('base64');
//   const final_img = {
//     contentType: req.file.mimetype,
//     image: Buffer.from(encode_img, 'base64'),
//   };

//   // Save to MongoDB using .then()
//   Image.create(final_img)
//     .then((result) => {
//       // Optionally delete the file after saving it to MongoDB
//       fs.unlinkSync(req.file.path);

//       res.status(200).send('Image uploaded and saved to MongoDB');
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).send('Error uploading image');
//     });
// });
 

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });









const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5432;

app.use(cors());

app.use(express.json());


mongoose.connect('mongodb://localhost:27017/Images')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('MongoDB connection error:', err));



const imageSchema = new mongoose.Schema({
  url_format: String  
});
  const Image = mongoose.model('Image', imageSchema);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
  const upload = multer({ storage });
  

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const imageUrl = `http://localhost:${port}/uploads/${req.file.filename}`;

  // Save the image URL to MongoDB
  const newImage = new Image({  url_format: imageUrl });

  newImage.save()
    .then(() => {
      res.status(200).json({
        message: 'Image uploaded successfully',
        imageUrl: imageUrl,  // Send the URL to the frontend
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error saving image to database');
    });
});

// Serve the uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// (to fetch and display)
app.get('/images',async(req,res)=>{
  try{
    const storedimages =  await Image.find();
    res.json(storedimages);
  }
  catch(err){
    console.log("Error fetching images",err);
    res.status(400).send("Error Fetching Images");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

