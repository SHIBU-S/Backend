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
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
app.use(cors());
const port = 5432;

mongoose.connect('mongodb://localhost:27017/Images')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.use(bodyParser.json());

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Define the schema for image storage
const imgSchema = new mongoose.Schema({
  image: { data: Buffer, contentType: String },
});

const Image = mongoose.model('Image', imgSchema);

// Upload route
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const img = fs.readFileSync(req.file.path);
  const encode_img = img.toString('base64');
  const final_img = {
    contentType: req.file.mimetype,
    image: Buffer.from(encode_img, 'base64'),
  };

  // Save image to MongoDB
  Image.create(final_img)
    .then((result) => {
      // Optionally delete the file after saving it to MongoDB
      fs.unlinkSync(req.file.path);

      res.status(200).json({
        message: 'Image uploaded and saved to MongoDB',
        imageId: result._id,  // Send the image ID to use in the frontend
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error uploading image');
    });
});

// Route to get the uploaded image by its ID
app.get('/image/:id', (req, res) => {
  const imageId = req.params.id;

  // Find the image by ID from MongoDB
  Image.findById(imageId)
    .then((image) => {
      if (!image) {
        return res.status(404).send('Image not found');
      }
      // Set the content type for the image and send it
      res.contentType(image.contentType);
      res.send(image.image);  // Send the image data as binary
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error retrieving image');
    });
});

// New route to fetch all uploaded images
app.get('/images', (req, res) => {
  Image.find({})
    .then((images) => {
      const imageUrls = images.map((image) => ({
        id: image._id,
        url: `http://localhost:${port}/image/${image._id}`,
        contentType: image.contentType
      }));
      res.status(200).json(imageUrls); // Return an array of image URLs
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error fetching images');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
