var express = require("express");

var app = express();

app.get("/",(require,Response)=>{
    Response.send("Utilizaznte el verbo get")
});
app.post("/",(require,Response)=>{
    Response.send("Utilizaznte el verbo post")
});
app.put("/",(require,Response)=>{
    Response.status(400).send("Utilizaznte el verbo put")
});
app.delete("/",(require,Response)=>{
    Response.status(500).send("Utilizaznte el verbo delete")
});
app.listen(3000);