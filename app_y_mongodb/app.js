var espress = require("express");
var mongoose = require("mongoose");

var path = require("path");
var bodyParser= require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash= require("connect-flash");

var routes= require("./routes");
var passport= require("passport");
var passportsetup = require("./passportsetup");
var app= espress();

mongoose.connect("mongodb://localhost:27017/zombie_nest");

passportsetup();

app.set("port",process.env.PORT || 3000);
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret:"qwertyuiop",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(routes);
app.use(passport.initialize({
    userProperty:"zombie"
}));

app.use(passport.session());
app.listen(app.get("port"),function(){
    console.log("la aplicacion  inicio por el puerto: " +app.get("port"));
});