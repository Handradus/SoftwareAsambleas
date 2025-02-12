"use strict";
import { Router } from "express";
import { getUser, getUsers, updateUser, deleteUser } from "../controllers/user.controller.js";
import { getCorreos, enviarCorreos } from "../controllers/correos.controller.js";
import { createForm, updateForm, deleteForm, mostrarVotacion } from "../controllers/form.controller.js";
import { crearAsamblea, asambleasActivas, obtenerAsamblea, obtenerAsambleaPorFecha, cerrarAsambleaID,cerrarAsambleaActiva, agregarAnotacion } from '../controllers/asamblea.controller.js';
import { isAdmin } from "../middlewares/auth.middleware.js";
import { firmarLista } from "../controllers/lista.controller.js";
import { emitirVoto, cerrarVotacion } from "../controllers/voto.controller.js";
import { createDirectiva, getDirectiva, updateDirectiva, deleteDirectiva } from '../controllers/directiva.controller.js';
import { createVocalia, getVocalias, updateVocalia, deleteVocalia } from '../controllers/vocalia.controller.js';
import { obtenerActa } from "../controllers/acta.controller.js";

const router = Router();

// Define las rutas para los usuarios  http://localhost:3000/api/user/
router.get("/", isAdmin, getUsers);
router.get("/1", isAdmin, getUser);
router.put("/", isAdmin, updateUser);
router.delete("/", isAdmin, deleteUser);

router.get("/correos", isAdmin, getCorreos);
router.get("/enviarCorreos", isAdmin, enviarCorreos);

// Ruta para formularios
router.post('/formulario', isAdmin, createForm);
router.put('/form:id', isAdmin, updateForm);
router.delete('/BorrarForm', isAdmin, deleteForm);

// Ruta para ingresar usuario verificado a la lista de asistencia
router.post('/Lista', firmarLista);

// Rutas de asamblea
router.post('/crearAsamblea', isAdmin, crearAsamblea);
router.get('/obtenerAsamblea/:id', isAdmin, obtenerAsamblea);
router.get('/obtenerAsambleaPorFecha/:fecha', isAdmin, obtenerAsambleaPorFecha);
router.post('/cerrarAsamblea', isAdmin, cerrarAsambleaID);
router.post('/cerrarAsambleaActiva', isAdmin, cerrarAsambleaActiva);
router.get('/asambleasActivas', isAdmin, asambleasActivas);
router.post('/agregarAnotacion', isAdmin, agregarAnotacion);

// Rutas de votacion
router.post('/emitirVoto', emitirVoto);
router.get('/mostrarVotacion', mostrarVotacion);
router.post('/cerrarVotacion', isAdmin, cerrarVotacion);

//Ruta de directiva
router.post('/crearDirectiva',isAdmin, createDirectiva);
router.get('/getDirectiva', getDirectiva);
router.put('/directiva:id', isAdmin,updateDirectiva);
router.delete('/directiva:id', isAdmin,deleteDirectiva);
//obtener acta y guardarla
router.get("/acta", isAdmin, obtenerActa);
//Ruta de vocalia
router.post('/crearVocalia',isAdmin, createVocalia);
router.get('/getVocalia', getVocalias);
router.put('/vocalia:id',isAdmin, updateVocalia);
router.delete('/borrar:id',isAdmin, deleteVocalia);

export default router;
