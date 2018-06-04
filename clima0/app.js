
var path = require('path');
var express = require('express');
var zipdb = require('zippity-do-dah');
var Forecastlo = require('forecastio');

var app = express();
//aqui va la llave 
var weather = new Forecastlo('6a28bc8b587eaf5ce3109c74cfff827b');
app.use(express.static(path.resolve(__dirname,'public')));
app.set('views',path.resolve(__dirname,'views'));
app.set('views engine','ejs');
app.get('/',function(req,res){

});

app.get(/^\/(\d{5})$/,function(req,res,next){
    var zipcode = req.params[0];
    var location = zipdb.zipcode(zipcode);
    if(!location.zipcode){
        next();
        return;
    }
    var latitude = location.latitude;
    var longitude = location.longitude;

    weather.forecast(latitude, longitude, function(err,data){
        if(err){
            next();
            return;
        }
        res.json({
            zipcode:zipcode,
            temperature:data.currently.temperature
            
        });
    });
});
app.use(function(req,res){
    res.status(404);
});
app.listen(3000);
