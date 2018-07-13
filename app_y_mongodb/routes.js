var express = require("express");
var Zombie = require("./models/zombie");
var Arma = require("./models/armas");

var passport = require("passport");
var acl = require("express-acl");
var router = express.Router();

acl.config({

    baseUrl:'/',
    defaulRole:'zombie',
    decodeObjectName:'zombie',
    roleSearchPath:'zombie.role',
    

});
router.use(acl.authorize);

router.use(function (require, Response, next) {
    Response.locals.currentZombie = require.zombie;
    Response.locals.errors = require.flash("error");
    Response.locals.info = require.flash("info");
    if(require.isAuthenticated()){
        require.session.role = require.zombie.role;
    }
    console.log(require.zombie);
    next();
});

router.get("/", function (require, Response, next) {
    Zombie.find()
        .sort({
            createdAt: "descending"
        })
        .exec(function (error, zombies) {
            if (error) {
                return next(error);
            }
            Response.render("index", {
                zombies: zombies
            });
        });
});

router.get("/arma", function (require, Response, next) {
    Arma.find()
        .sort({
            createdAt: "descending"
        })
        .exec(function (error, armas) {
            if (error) {
                return next(error);
            }
            Response.render("arma", {
                armas: armas
            });
        });
});

router.get("/zombies/:username", function (require, Response, next) {
    Zombie.findOne({
        username: require.params.username
    }, function (err, zombie) {
        if (err) {
            return next(err);
        }
        if (!zombie) {
            return next(404);
        }
        Response.render("profile", {
            zombie: zombie
        });
    });
});

router.get("/armas/:descripcion", function (require, Response, next) {
    Arma.findOne({
        descripcion: require.params.descripcion
    }, function (err, arma) {
        if (err) {
            return next(err);
        }
        if (!arma) {
            return next(404);
        }
        Response.render("perfilArma", {
            arma: arma
        });
    });
});

router.get("/armas", function (require, Response) {
    Response.render("armas");
});
router.post("/armas", function (require, Response, next) {
    var descripcion = require.body.descripcion;
    var fuerza = require.body.fuerza;
    var categoria = require.body.categoria;
    var municion = require.body.municion;

    
    var newArma = new Arma({
        descripcion: descripcion,
        fuerza: fuerza,
        categoria: categoria,
        municion: municion
    });

    newArma.save(next);
    return Response.redirect("/arma");

});

router.get("/signup", function (require, Response) {
    Response.render("signup");
});

router.post("/signup", function (require, Response, next) {
    var username = require.body.username;
    var password = require.body.password;
    var role = require.body.role;
    Zombie.findOne({
        username: username
    }, function (err, zombie) {
        if (err) {
            return next(err);
        }
        if (zombie) {
            require.flash("error", "el nombre de usuario ya lo ha tomado otro zombie");
            return Response.redirect("/signup");
        }
        var newZombie = new Zombie({
            username: username,
            password: password,
            role:role
        });
        newZombie.save(next);
        return Response.redirect("/");
    });
});

router.get("/login",function(require,Response){
    Response.render("login");
});

router.post("/login",passport.authenticate("login",{
    successRedirect:"/",
    failureRedirect:"/login",
    failureFlash: true
}));

router.get("/logout",function(require,Response){
    require.logout();
    Response.redirect("/");
});

router.get("/edit",ensureAuthenticated, function(require,Response){
    Response.render("edit");
});

router.post("/edit", ensureAuthenticated,function(require,Response,next){
    require.zombie.displayName = require.body.displayName;
        require.zombie.bio = require.body.bio;
        require.zombie.save(function(err){
            if(err){
                next(err);
                return;
            }
            Response.flash("info","Perfil Actualizado");
            Response.redirect("/edit");
        });
});




function ensureAuthenticated(require,Response,next){
    if(require.isAuthenticated()){
        next();
    }else{
        require.flash("info","Necesitas iniciar sesión para poder ver esta sección");
        Response.redirect("/login");
    }
}

module.exports = router;
