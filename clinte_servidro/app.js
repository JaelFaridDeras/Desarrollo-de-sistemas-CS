var express = require('express');
var app = express();

app.get('/',(requ,res)=> res.send('hola mundo'));
app.listen(3000, ()=> console.log('Escuchando desde el puerto 3000'));