"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Controlador de usuarios */
import {getUser, getUsers, updateUser, deleteUser} from "../controllers/user.controller.js";
//Importa lo de crear formulario 
import { createForm,getForm,updateForm,deleteForm } from "../controllers/form.controller.js";

/** Middlewares de autorización */
import { isAdmin } from "../middlewares/auth.middleware.js";

// Se realiza una instancia de express
const router = Router();

// Define las rutas para los usuarios  http://localhost:3000/api/user/
router.get("/", isAdmin, getUsers);
router.get("/1", isAdmin, getUser);
router.put("/", isAdmin, updateUser);
router.delete("/", isAdmin, deleteUser);


//ruta para formularios, ´pueden cambiar si es que quiero que se accedan desde la asamblea
router.post('/formulario',isAdmin,createForm);

router.get('/form',getForm);

router.put('/form:id',isAdmin,updateForm);

router.delete('/form:id',isAdmin,deleteForm);


export default router;