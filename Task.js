let http = require('http');
let url = require('url');

let server = http.createServer((req,res)=>{
    let parsedURL = url.parse(req.url);
        console.log("Parsed URL :",parsedURL);
    let split_parsedURL = parsedURL.pathname.split('/');
        console.log("Splited Parsed URL :",split_parsedURL);
    let value = split_parsedURL[split_parsedURL.length-1];
        console.log("Value is :",value);
});

server.listen(5555);