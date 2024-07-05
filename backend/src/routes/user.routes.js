"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Controlador de usuarios */
import {getUser, getUsers, updateUser, deleteUser} from "../controllers/user.controller.js";
//Importa lo de crear formulario 
import { createForm,updateForm,deleteForm, mostrarVotacion } from "../controllers/form.controller.js";
//asamblea 
import { crearAsamblea, asambleasActivas,obtenerAsamblea,obtenerAsambleaPorFecha,cerrarAsambleaID,cerrarAsambleaFecha } from '../controllers/asamblea.controller.js';
/** Middlewares de autorización */
import { isAdmin } from "../middlewares/auth.middleware.js";
import { firmarLista } from "../controllers/lista.controller.js";
import { emitirVoto } from "../controllers/voto.controller.js";

// Se realiza una instancia de express
const router = Router();

// Define las rutas para los usuarios  http://localhost:3000/api/user/
router.get("/", isAdmin, getUsers);
router.get("/1", isAdmin, getUser);
router.put("/", isAdmin, updateUser);
router.delete("/", isAdmin, deleteUser);


//ruta para formularios, ´pueden cambiar si es que quiero que se accedan desde la asamblea
router.post('/formulario',isAdmin,createForm);
router.get('/Mostrar votacion',mostrarVotacion);

router.put('/form:id',isAdmin,updateForm);

router.delete('/form:id',isAdmin,deleteForm);


//ruta para ingresar usuario verificado a la lista de asistencia
router.post('/Lista',firmarLista);


//rutas asamblea
router.post('/crearAsamblea', isAdmin, crearAsamblea);

/// aca ingreso a a la asamblea, despues de esto creo votacion
router.get('/obtenerAsamblea/:id', obtenerAsamblea);
router.get('/obtenerAsambleaPorFecha/:fecha', obtenerAsambleaPorFecha);
router.post('/cerrarAsamblea', isAdmin, cerrarAsambleaID);
router.post('/cerrarAsambleaFecha/:fecha', isAdmin, cerrarAsambleaFecha);

router.get('/asambleasActivas', isAdmin, asambleasActivas);

router.post ('/emitirVoto', emitirVoto);

export default router;