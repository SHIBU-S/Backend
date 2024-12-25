const express = require('express');
const app = express();
const multer = require('multer');
const Image = require('./Models/Image');

const upload = multer({ dest: './uploads/' });

app.post('/upload', upload.single('image'), (req, res) => {
  const image = new Image({
    name: req.file.originalname,
    data: req.file.buffer,
    contentType: req.file.mimetype
  });

  image.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error uploading image' });
    } else {
      res.send({ message: 'Image uploaded successfully' });
    }
  });
});

app.listen(3322,()=>{console.log("Server is listening on port 3322")});

