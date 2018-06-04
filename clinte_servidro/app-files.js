var express = require('express');
var path = require('path');
var http = require('http');

var app = express(); //se inicia el express

var publicPath = path.join(__dirname,'public');
app.use('/recursos', express.static(publicPath));

app.use((Request,Response)=>{
    Response.writeHead(200,{'Conten-Type':'text/plain'});
    Response.end('no se encuentra la imagen');

});

http.createServer(app).listen(3000);
