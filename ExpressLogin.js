// let express = require('express');
// let fs = require('fs');
// let cors = require('cors');

// let app = express();

// app.use(cors());

// app.get('/Login',(req,res)=>{
//     const {name,email,password} = req.query;

//     fs.readFile('Loginvalues.json',(err,data)=>{
//         if(err)
//         {
//             res.send("Error :" + err);
//             res.end();
//         }
//         else
//         {
//             let json_toobject = JSON.parse(data);
//                 console.log(json_toobject);
//             let searchedvalue = json_toobject.find(a => a.Name === name && a.Email === email && a.Password === password);
//             if(searchedvalue)
//             {
//                 res.status(200).send(req.query);
//             }
//             else
//             {
//                 res.status(401).send("Invalid username,email & password...");
//             }
//         }
//     })
// })

// app.listen(4000,()=>{console.log("Server is listening on port 4000")});



let express = require('express');
let app = express();

let cors = require('cors');
app.use(cors());

app.get("/login", (req, res) => {
    const { name, age } = req.query;

    res.status(200).json(
            {
                datas : {
                    name: name,
                    age: age,
                    password: "dummyPassword123" 
                }
            }
        );

});

app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});
