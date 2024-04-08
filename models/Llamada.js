const mongoose = require('mongoose');

const llamadaEsquema = new mongoose.Schema({
    nombre : String,
    direccion : String,
    descripcion : String,
    telefono : Number,
    prioridad : Number
},{ versionKey: false })

const LlamadaModel = mongoose.model('Llamada',llamadaEsquema,'llamada');
module.exports = LlamadaModel;