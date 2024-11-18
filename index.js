let http = require('http');             // Import
let fs = require('fs');
let jsondata = [
  {
    "Name": "Shibu",
    "Age": "21",
    "Phno": "7358918945"
  },
  {
    "Name": "Vivek",
    "Age": "27",
    "Phno": "9874563210"
  },
  {
    "Name": "Vinoth",
    "Age": "45",
    "Phno": "4563219870"
  }
]; 

//Write File..
const content = 'This is the content line which is to be written into the file.';
fs.writeFile('example.txt', content, (err) => {
  if (err) {
    console.error(err);
  }
  else{
  console.log('File written successfully.');
  }
});

//Append File..
const appendline = 'This is the append line which is to be written next to the file.';
fs.appendFile('example.txt', appendline, (err) => {
  if (err) {
    console.error(err);
  }
  else{
  console.log('File appended successfully.');
  }
});


let server = http.createServer((req, res) =>                      // Create Server
{ 
    if (req.url === "/Home")                                      // Handling incoming request & gives the desired response
    {
        //Read File..
        fs.readFile('index.html',(err,data)=>{                    
            if(data)
            {
              res.writeHead(200, { "Content-Type": "text/html" });
              res.write(data);
              res.end();
              console.log("Home Page..");
            }
            else
            {
              res.writeHead(200, { "Content-Type": "text/html" });
              res.write("Error Page..");
              res.end();
              console.log(err);
            }
        })
    } 
    else if (req.url === "/Contact") 
    {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h2>Welcome Contact Page</h2>");
        res.end();
        console.log("Contact Page");
    } 
    else if (req.url === "/jsondata") 
    {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(jsondata)); 
        res.end();
        console.log("JSON Data", jsondata);
    } 
    else 
    {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write("<h4>Error: Page Not Found</h4>");
        res.end();
        console.log("Error Page");
    }
});

server.listen(5000);

