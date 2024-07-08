"use strict";
// Importa el modulo 'express' para crear las rutas
import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";

/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";

/// enrutador para vocalias
import { createDirectiva, getDirectiva, updateDirectiva, deleteDirectiva } from '../controllers/directiva.controller.js';
import { createVocalia, getVocalias, updateVocalia, deleteVocalia } from '../controllers/vocalia.controller.js';


// Se realiza una instancia de express
const router = Router();

// Define las rutas para los usuarios /api/users
router.use("/user",  userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

router.use("/directivas",getDirectiva);

router.use("/vocalias",getVocalias);


export default router;
