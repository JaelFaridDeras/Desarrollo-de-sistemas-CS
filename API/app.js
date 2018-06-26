var express = require("express");
var app = express();

var api = require("./routes/api");
var api2 = require("./routes/api2");

app.use("/api",api);
app.use("/apiV2",api2);

app.get("/",(require,Response)=>{

    Response.send("<h1> Pagina principal del usuario</h!>")
});

app.listen(3000,()=>{
    console.log("La aplicacion esta escuchando por el puesto 3000")
    
});