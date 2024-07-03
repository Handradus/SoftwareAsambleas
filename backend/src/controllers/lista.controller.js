import Asamblea from '../models/asamblea.model.js';

export async function firmarLista(req, res) {
    try {
        if (!req.session || !req.session.user) {
            return res.status(400).json({
                message: "Se debe iniciar sesión!"
            });
        }

        const email = req.session.user.email;
        const rut = req.session.user.rut;

        // Buscar la asamblea activa
        let asamblea = await Asamblea.findOne({ activa: true });
        if (!asamblea) {
            return res.status(404).json({
                message: "No hay una asamblea activa en este momento"
            });
        }

        // Verificar si el alumno ya existe en la lista de la asamblea
        const alumnoExistente = asamblea.lista.alumnos.find(alumno => alumno.email === email);
        if (alumnoExistente) {
            return res.status(400).json({
                message: "El alumno ya está en la lista!"
            });
        }

        // Agregar el nuevo alumno a la lista de la asamblea
        asamblea.lista.alumnos.push({ email, rut });

        // Guardar la asamblea actualizada
        await asamblea.save();

        res.status(200).json({
            message: "Alumno agregado a la lista de la asamblea exitosamente",
            data: { email, rut }
        });
    } catch (error) {
        console.log("Error en lista.controller.js -> firmarLista():", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}
