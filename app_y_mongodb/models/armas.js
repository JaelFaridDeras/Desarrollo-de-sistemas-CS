var mongoose = require("mongoose");

var armasSchema = mongoose.Schema({
    descripcion: {
        type: String,
        require: true,
        unique: true
    },
    fuerza: {
        type: Number,
        require: true
    },
    categoria: {
        type: String,
        require: true
    },
    municion: {
        type: Boolean
    }

});
var Arma = mongoose.model("Arma", armasSchema);
module.exports = Arma;
