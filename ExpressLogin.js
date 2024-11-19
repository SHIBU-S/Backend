let express = require('express');
let fs = require('fs');

let app = express();

app.get('/Login',(req,res)=>{
    const {name,email,password} = req.query;

    fs.readFile('Loginvalues.json',(err,data)=>{
        if(err)
        {
            res.send("Error :" + err);
            res.end();
        }
        else
        {
            let json_toobject = JSON.parse(data);
                console.log(json_toobject);
            let searchedvalue = json_toobject.find(a => a.Name === name && a.Email === email && a.Password === password);
            if(searchedvalue)
            {
                res.status(200).send("Logined successfully!!");
            }
            else if(searchedvalue === "")
            {
                res.status(200).send("Please enter a details fully..");
            }
            else
            {
                res.status(401).send("Invalid username,email & password...");
            }
        }
    })
})

app.listen(4000,()=>{console.log("Server is listening on port 4000")});

