const express = require('express');
const rutas = express.Router();
const TareaModel = require('../models/Llamada');

rutas.get('/', async (req, res) =>{
    try {
        const tareas = await TareaModel.find();
        
        res.json(tareas);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

rutas.post('/agregar', async (req, res) =>{
    
    const nuevaTarea = new TareaModel({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        descripcion: req.body.descripcion,
        telefono: req.body.telefono,
        prioridad: req.body.prioridad
    });
    try {
        const guardarTarea = await nuevaTarea.save();
        res.status(201).json({Mensaje:'Llamada agregada correctamente'});
       // res.json({mensaje: 'Llamada agregada correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.put('/editar/:id', async (req, res) =>{
    try {
        const actualizarTarea = await TareaModel.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(201).json(actualizarTarea);
 
       // res.json({mensaje: 'Llamada actualizado correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});

rutas.delete('/eliminar/:id', async (req, res) =>{
    try {
        const eliminarTarea = await TareaModel.findByIdAndDelete(req.params.id);
        res.json({mensaje: 'Tarea eliminada correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
//consultas ----------ANAZADAS------------
// - Listar todas las llamadas con prioridad 5
rutas.get('/tarea-prioridad/:id', async (req, res) =>{
    try {
        console.log(req.params.id);
        const tareasPrioridad = await TareaModel.find({ prioridad: req.params.id});
        res.json(tareasPrioridad);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

// - Ordenar las tareas por prioridad de forma ascendente
rutas.get('/ordenar-tarea', async (req, res) =>{
    try {
        const tareasASC = await TareaModel.find().sort({prioridad: 1});
        res.json(tareasASC);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
// - Consultar una tarea especifica por Id
rutas.get('/tarea/:id', async (req, res) =>{
    try {
        console.log(req.params.id);
        const tarea = await TareaModel.findById(req.params.id);
        res.json(tarea);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});
// - Eliminar todas las tareas con una prioridad determinada
rutas.delete('/eliminar-prioridad/:prioridad', async (req, res) =>{
    try {
        console.log(req.params.prioridad);
        const prioridad = req.params.prioridad
        const eliminarTareas = await TareaModel.deleteMany({prioridad});
        res.json({mensaje: 'Tareas eliminada correctamente'});
        
    } catch(error){
        res.status(400).json({mensaje: error.message});
    }
});
// - Consultar la tarea mas reciente anadida a la base de datos
rutas.get('/tarea-reciente', async (req, res) =>{
    try {
        const tarea = await TareaModel.findOne().sort({_id: -1});
        res.json(tarea);
    }
    catch(error){
        res.status(404).json({mensaje: error.message});
    }
});

// contar el total de llamdas ------------------------------
rutas.get('/contar', async (req, res) => {
    try {
        const countTareas = await TareaModel.countDocuments();
        res.json({cantidad: countTareas, message: 'total llamadas diarias'});
    } catch(error) {
        res.status(500).json({ mensaje: 'Error al contar las tareas' });
        console.error('Error al contar las tareas:', error);
    }
});

// contar por llamadas por descripcion
rutas.get('/contar/:descripcion', async (req, res) => {
    try {
        const descripcion = req.params.descripcion; // Obtiene la descripción de los parámetros de la ruta
        const countTareas = await TareaModel.countDocuments({ descripcion }); // Usa la descripción en la consulta
        res.json({ descripcion, cantidad: countTareas });
    } catch(error) {
        res.status(500).json({ mensaje: 'Error al contar las tareas para la descripción' });
        console.error('Error al contar las tareas para la descripción:', error);
    }
});

module.exports = rutas;
