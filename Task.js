// let http = require('http');
// let url = require('url');
// let fs = require('fs');


// let readjsonfile = fs.readFile('jsondatas.json');
// let storedData = [];

// let server = http.createServer((req,res)=>{
//     let parsedURL = url.parse(req.url);
//         console.log("Parsed URL :",parsedURL);
//     let split_parsedURL = parsedURL.pathname.split('/');
//         console.log("Splited Parsed URL :",split_parsedURL);
//     let value = split_parsedURL[split_parsedURL.length-1];
//         console.log("Value is :",value);


//     //Changing into Object Values..
//     let to_objectvalues = {
//         URL : parsedURL.href,
//         Path : parsedURL.path,
//         Value : value
//     }
//     console.log("Changed Object values :" + to_objectvalues);


//     //Changing Object Values to store as JSON Data..
//     let jsonstorage = JSON.stringify(to_objectvalues);
//     res.writeHead(200,{"content-type":"application/json"});
//     res.write("JSON DATAS :" + jsonstorage + "\n");
//     res.end();
//     console.log("JSON Datas :" + jsonstorage);
// });

// server.listen(5555);









// let http = require('http');
// let url = require('url');
// let fs = require('fs');  
// let path = require('path');

// const jsonFilePath = path.join('jsondatas.json');

// let storedData = [];

// const rawData = fs.readFile(jsonFilePath);
// storedData = JSON.parse(rawData);
//         console.log("Stored Data :",storedData);

// let server = http.createServer((req, res) => {
//     let parsedURL = url.parse(req.url);
    
//     let split_parsedURL = parsedURL.pathname.split('/');
    
//     let value = split_parsedURL[split_parsedURL.length - 1];
    
//     // Create the object to be stored
//     let newData = {
//         URL: parsedURL.pathname,
//         Path: parsedURL.path,
//         Value: value
//     };

//     // Add new data to the array
//     storedData.push(newData);
    
//     // Write the updated array back to the JSON file
//     fs.writeFile(jsonFilePath, JSON.stringify(storedData));

//     // Respond with the JSON data
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.write(JSON.stringify({ message: "Data added successfully", data: storedData }, null, 2));
//     res.end();

//     console.log("Response Data:", storedData);
// });

// server.listen(5555, () => {
//     console.log('Server running on http://localhost:5555');
// });



let http=require('http')
let fs=require('fs')
let url=require('url')

let server=http.createServer(function(req,res){
    var q = url.parse(req.url,true).query;
   
    if (q.name && q.age) {
        let newData = { name: q.name, age: q.age };
        fs.readFile('jsondatas.json', function (err, data) {
            let  obj = { data: [] };

            if (err) 
                throw err;

            obj = JSON.parse(data);
            obj.data.forEach(val=>{
                if(val.name===q.name){
                    res.write("data already exists")
                    res.end()
                }
                
            })
            obj.data.push(newData);
            res.write("data pushed sucessfully...")
            let json=JSON.stringify(obj,null,2);
            
    
            fs.writeFile('jsondatas.json', json, 'utf8', function (err) { 
                if (err)
                    console.log(err);
                // res.end();
        })


        fs.readFile('jsondatas.json', function (err, data) {
            if (err) 
                throw err;
            // console.log(data)
          
            res.write(data)
            return res.end(); ;
    
            
        })
       
    })
   
    }

})


server.listen(5555);