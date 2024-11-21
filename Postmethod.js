const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());                 // Middleware to parse JSON data      //Parser-Which type that we want to convert it(ex:json,url etc..)
                                                        //If we use app.use(bodyParser.json()),it will apply to all api


app.post('/submit', (req, res) => {             // POST route to accept data
  const data = req.body;

    res.json({                                  // Send a response back
        message: 'Data received successfully',
        receivedData: data
        });
    });


app.listen(1000, () => {
  console.log(`Server is listening on port 1000`);
});
