let express = require('express');
let fs = require('fs');

let app = express();            //While using express,we need to initialize it

app.get('/',(req,res)=>{        //In this,we need to use 2 parameters as routing and arrowfunc     //Its alternate of If condition
    res.send("The Page is Empty..");
});

app.get('/Home',(req,res)=>{
    res.send("Its Home Page..");
});

app.get('/About',(req,res)=>{
    res.send("Its About Page..")
});


//Read File..
fs.readFile('Express.json',(err,datas)=>{
    if(err)
    {
        console.log("Error :",err);
    }
    else
    {
        let to_objectvalues = JSON.parse(datas);
        console.log("Object Values : ",to_objectvalues);
        app.get('/jsondatas',(req,res)=>{
            res.json(to_objectvalues);
            res.write(datas);
            res.end();
        });
    }
});



app.listen(9000);
