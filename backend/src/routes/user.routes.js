"use strict";
import { Router } from "express";
import { getUser, getUsers, updateUser, deleteUser } from "../controllers/user.controller.js";
import { getCorreos, enviarCorreos } from "../controllers/correos.controller.js";
import { createForm, updateForm, deleteForm, mostrarVotacion } from "../controllers/form.controller.js";
import { crearAsamblea, asambleasActivas, obtenerAsamblea, obtenerAsambleaPorFecha, cerrarAsambleaID, agregarAnotacion } from '../controllers/asamblea.controller.js';
import { isAdmin } from "../middlewares/auth.middleware.js";
import { firmarLista } from "../controllers/lista.controller.js";
import { emitirVoto, cerrarVotacion } from "../controllers/voto.controller.js";

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
router.delete('/form:id', isAdmin, deleteForm);

// Ruta para ingresar usuario verificado a la lista de asistencia
router.post('/Lista', firmarLista);

// Rutas de asamblea
router.post('/crearAsamblea', isAdmin, crearAsamblea);
router.get('/obtenerAsamblea/:id', obtenerAsamblea);
router.get('/obtenerAsambleaPorFecha/:fecha', obtenerAsambleaPorFecha);
router.post('/cerrarAsamblea', isAdmin, cerrarAsambleaID);
router.get('/asambleasActivas', isAdmin, asambleasActivas);
router.post('/agregarAnotacion', isAdmin, agregarAnotacion);

// Rutas de votacion
router.post('/emitirVoto', emitirVoto);
router.get('/mostrarVotacion', mostrarVotacion);
router.post('/cerrarVotacion', isAdmin, cerrarVotacion);

export default router;
