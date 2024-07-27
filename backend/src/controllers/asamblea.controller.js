import Asamblea from '../models/asamblea.model.js';
import Form from '../models/form.model.js';

// Crear una nueva asamblea
export async function crearAsamblea(req, res) {
    try {
        const asambleaActiva = await Asamblea.findOne({ activa: true });
        if (asambleaActiva) {
            return res.status(400).json({
                message: "Ya existe una asamblea activa. Debe cerrar la asamblea activa antes de crear una nueva."
            });
        }
        const { fecha, puntos, resolutiva } = req.body;
        const nuevaAsamblea = new Asamblea({ fecha, puntos, resolutiva, lista: { alumnos: [] } });
        await nuevaAsamblea.save();

        res.status(201).json({
            message: "Asamblea creada exitosamente",
            data: nuevaAsamblea
        });
    } catch (error) {
        console.log("Error en asamblea.controller.js -> crearAsamblea():", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

// Obtener una asamblea por su ID
export async function obtenerAsamblea(req, res) {
    try {
        const asamblea = await Asamblea.findById(req.params.id);
        if (!asamblea) {
            return res.status(404).json({
                message: "Asamblea no encontrada",
                data: null
            });
        }

        res.status(200).json({
            message: "Asamblea obtenida correctamente",
            data: asamblea
        });
    } catch (error) {
        console.log("Error en asamblea.controller.js -> obtenerAsamblea():", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

// Obtener asamblea por fecha
export async function obtenerAsambleaPorFecha(req, res) {
    try {
        const { fecha } = req.params;
        const asamblea = await Asamblea.find({ fecha: new Date(fecha) }).populate('lista');
        if (!asamblea) {
            return res.status(404).json({
                message: "Asamblea no encontrada",
                data: null
            });
        }

        res.status(200).json({
            message: "Asamblea obtenida correctamente",
            data: asamblea
        });
    } catch (error) {
        console.log("Error en asamblea.controller.js -> obtenerAsambleaPorFecha():", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

// Cerrar asamblea por ID
export async function cerrarAsambleaID(req, res) {
    try {
        const { asambleaId } = req.body; // ID de la asamblea que se va a cerrar

        // Log para verificar el estado de req.user
        console.log("Estado de req.user:", req.user);

        // Verificar que el usuario es un administrador
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({
                message: "Acceso denegado: solo los administradores pueden cerrar una asamblea."
            });
        }

        // Buscar la asamblea
        let asamblea = await Asamblea.findById(asambleaId);

        //linea para comprobar que la votacion este cerrada
        const idvotacion=asamblea.votacion;
        const votacion = await Form.findById(idvotacion);

        if (votacion!= null && votacion.activa==true){
            return res.status(404).json({
                message: "Primero debes cerrar la votación"
            });
        }
        if (!asamblea) {
            return res.status(404).json({
                message: "Asamblea no encontrada"
            });
        }

        // Actualizar el estado de la asamblea a inactiva
        asamblea.activa = false;
        asamblea.fechaCierre = new Date();
        asamblea.cerradaPor = req.user.id; // Asumiendo que el ID del usuario está en req.user
        await asamblea.save();

        res.status(200).json({
            message: "Asamblea cerrada exitosamente",
            data: asamblea
        });
    } catch (error) {
        console.log("Error en asamblea.controller.js -> cerrarAsambleaID():", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}
//Cerrar asamblea activa 

export async function cerrarAsambleaActiva(req, res) {
    try {
           // Log para verificar el estado de req.user
        console.log("Estado de req.user:", req.user);

        // Verificar que el usuario es un administrador
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({
                message: "Acceso denegado: solo los administradores pueden cerrar una asamblea."
            });
        }

        let asamblea = await Asamblea.findOne({ activa: true });
        //linea para comprobar que la votacion este cerrada
        const idvotacion=asamblea.votacion;
        const votacion = await Form.findById(idvotacion);

        if (!asamblea) {
            return res.status(404).json({
                message: "No hay una asamblea activa en este momento"
            });
        }

        if (votacion!= null && votacion.activa==true){
            return res.status(404).json({
                message: "Primero debes cerrar la votación"
            });
        }
     
        // Actualizar el estado de la asamblea a inactiva
        asamblea.activa = false;
        
        
        asamblea.fechaCierre = new Date();
        asamblea.cerradaPor = req.user.id; // Asumiendo que el ID del usuario está en req.user
        await asamblea.save();

        res.status(200).json({
            message: "Asamblea cerrada exitosamente",
            data: asamblea
        });
    } catch (error) {
        console.log("Error en asamblea.controller.js -> cerrarAsambleaID():", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}
// Obtener asambleas activas
export async function asambleasActivas(req, res) {
    try {
        let asamblea = await Asamblea.findOne({ activa: true }).lean();
        if (!asamblea) {
            return res.status(404).json({
                message: "No hay una asamblea activa en este momento"
            });
        }

        console.log('Asamblea activa encontrada:', asamblea);

        res.status(200).json({
            message: "Asamblea activa encontrada",
            data: asamblea
        });
    } catch (error) {
        console.log("Error en asamblea.controller.js -> asambleasActivas():", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

// Agregar anotaciones a la asamblea activa
export async function agregarAnotacion(req, res) {
    try {
        const { anotacion } = req.body;

        // Verificar que el usuario es un administrador
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({
                message: "Acceso denegado: solo los administradores pueden agregar anotaciones."
            });
        }

        // Buscar la asamblea activa
        let asamblea = await Asamblea.findOne({ activa: true });
        if (!asamblea) {
            return res.status(404).json({
                message: "No hay una asamblea activa en este momento"
            });
        }

        // Agregar la anotación
        asamblea.anotaciones.push(anotacion);
        await asamblea.save();

        res.status(200).json({
            message: "Anotación agregada exitosamente",
            data: asamblea
        });
    } catch (error) {
        console.log("Error en asamblea.controller.js -> agregarAnotacion():", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}
