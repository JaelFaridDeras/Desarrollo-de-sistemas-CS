var express = require("express");
var app = express();

var api = require("./routes/api");

app.use("/api",api);

app.get("/",(require,Response)=>{

    Response.send("<h1> Pagina principal</h!>")
});

app.listen(3000,()=>{
    console.log("La aplicacion esta escuchando por el puesto 3000")
    
});