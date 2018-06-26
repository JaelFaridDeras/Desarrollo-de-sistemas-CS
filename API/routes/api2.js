var express= require("express");
var api = express.Router();

api.get("/users",(require,Response)=>{
    Response.send("<h1> estoy en el api</h1>")
});

api.get("/numeros/:min/:max",(require,Response)=>{
    var min = parseInt(require.params.min);
    var max = parseInt(require.params.max);

    if(isNaN(min)|| isNaN(max)){

            Response.status(400);
            Response.set("Content-Type","text/html");
        return;
    }
    var result =Math.round((Math.random()*(max-min))+min);
    Response.set("Content-Type","text/html");
    Response.send("<h1>Esta api es ma chida :)</h1><h2>el numero a leatorio : "+ result+"</h2>");
});
 
module.exports= api;