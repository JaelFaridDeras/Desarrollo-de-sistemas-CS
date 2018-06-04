var express = require('express');
var path = require('path');
var http = require('http');

var app = express();
var IP_MALVADA = '128.95.40.1';
app.use((Request,Response,next)=>{

    if(Request.ip===IP_MALVADA){
        Response.status(401).send("intento de acceso no autorizado");
    }else{
        next();
    }

});

var publicPath = path.join(__dirname,'public');
app.use('recursos',express.static(publicPath));
app.get('/',(Request,Response)=>{
    Response.end('bienbenido');
});
app.get('/about',(Request,Response)=>{
    Response.end('Bienvenido a mi pagina acera de');
});
app.get('/waether',(Request,Response)=>{
    Response.end('hola habra un clima soleado');
});
app.get('/bienvenida/:nombre',(Request,Response)=>{
    Response.end('Bienvenid@'+Request.params.nombre+'.');
});
app.use((Request,Response)=>{
    Response.writeHead(404,{"Content-type":"text/html"});
    Response.end('<h2>404 not found</h2>')
});
http.createServer(app).listen(3000);

