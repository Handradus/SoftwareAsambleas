import Asamblea from '../models/asamblea.model.js';

// Crear una nueva asamblea
//fecha sera unica
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



// cerrar asamblea por id
export async function cerrarAsambleaID(req, res) {
    try {
        const { asambleaId } = req.body; // ID de la asamblea que se va a cerrar

        // Buscar la asamblea
        let asamblea = await Asamblea.findById(asambleaId);
        if (!asamblea) {
            return res.status(404).json({
                message: "Asamblea no encontrada"
            });
        }

        // Actualizar el estado de la asamblea a inactiva
        asamblea.activa = false;
        await asamblea.save();

        res.status(200).json({
            message: "Asamblea cerrada exitosamente",
            data: asamblea
        });
    } catch (error) {
        console.log("Error en asamblea.controller.js -> cerrarAsamblea():", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

// cerrar asamblea por fecha
export async function cerrarAsambleaFecha(req, res) {
    try {
        const { fecha } = req.params; // Obtener la fecha de los parámetros de la URL
        const asamblea = await Asamblea.findOne({ fecha: new Date(fecha) });

        // Verificar si la asamblea fue encontrada
        if (!asamblea) {
            return res.status(404).json({
                message: "Asamblea no encontrada"
            });
        }

        // Actualizar el estado de la asamblea a inactiva
        asamblea.activa = false;
        await asamblea.save();

        res.status(200).json({
            message: "Asamblea cerrada exitosamente",
            data: asamblea
        });
    } catch (error) {
        console.log("Error en asamblea.controller.js -> cerrarAsambleaFecha():", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}



export async function asambleasActivas( req,res) {
    try {
        let asamblea = await Asamblea.findOne({ activa: true });
        if (!asamblea) {
            return res.status(404).json({
                message: "No hay una asamblea activa en este momento"
            });
        }


        res.status(200).json({
            message: "Asambleas encontradas",
            data: asamblea
        });
    } catch (error) {
        console.log("Error en asamblea.controller.js -> cerrarAsambleaFecha():", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}



