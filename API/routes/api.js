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
        Response.json({
            error: "bad request."
        })

        return;
    }
    var result =Math.round((Math.random()*(max-min))+min);
    Response.json({
        result:result
    });
});
 
module.exports= api;
