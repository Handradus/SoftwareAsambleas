import Asamblea from "../models/asamblea.model.js";
import Form from "../models/form.model.js";

// Función para emitir un voto
export async function emitirVoto(req, res) {
    try {
        // Recibe la opción elegida desde el cuerpo de la solicitud
        const { elegido } = req.body;

        // Verifica si hay un usuario logeado
        if (!req.session.user) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }

        // Obtiene el RUT del usuario logeado
        const rut = req.session.user.rut;

        // Busca una asamblea que esté activa en la base de datos
        const asamblea = await Asamblea.findOne({ activa: true });
        if (!asamblea) {
            return res.status(404).json({ message: 'Asamblea no encontrada' });
        }

        // Busca en la lista de alumnos de la asamblea al alumno que coincide con el RUT del usuario
        const alumnoExistente = asamblea.lista.alumnos.find(alumno => alumno.rut === rut);
        if (!alumnoExistente) {
            return res.status(400).json({ message: 'Alumno no encontrado en la lista' });
        }
        if (alumnoExistente.voto === true) {
            return res.status(400).json({ message: 'El alumno ya ha votado' });
        }

        // Obtiene el ID del formulario de votación desde la asamblea
        const idForm = asamblea.votacion;
        if (!idForm) {
            return res.status(404).json({ message: 'Formulario no encontrado' }); 
        }

        // Busca el formulario de votación en la base de datos usando el ID obtenido
        const form = await Form.findById(idForm);
        if (!form) {
            return res.status(404).json({ message: 'Formulario no encontrado' });
        }

        // Verifica que la opción elegida esté dentro del rango válido de opciones del formulario
        if (elegido >= form.opciones.length || elegido < 0) {
            return res.status(400).json({ message: 'Opción inválida' });
        }

        // Incrementa el contador de votos de la opción elegida en el formulario
        form.opciones[elegido-1].votos++;

        // Guarda los cambios en el formulario
        await form.save();
        // Marca que el alumno ha votado
        alumnoExistente.voto = true;
        // Guarda los cambios en la asamblea
        await asamblea.save();

        // Responde con un estado 200 (OK) y un mensaje indicando que el voto ha sido registrado correctamente
        return res.status(200).json({ message: 'Voto registrado correctamente' });
    } catch (error) {
        // Captura cualquier error que ocurra en el bloque try, lo registra en la consola y responde con un estado 500 (Error Interno del Servidor) y un mensaje de error
        console.error('Error al registrar el voto:', error);
        return res.status(500).json({ message: 'Error al registrar el voto', error });
    }
}

// Función para cerrar la votación
export async function cerrarVotacion(req, res) {
    try {
        // Busca una asamblea que esté activa en la base de datos
        let asamblea = await Asamblea.findOne({ activa: true });
        if (!asamblea) {
            return res.status(404).json({ message: "No hay una asamblea activa en este momento" });
        }

        // Obtiene el ID del formulario de votación desde la asamblea
        const idForm = asamblea.votacion;
        if (!idForm) {
            return res.status(404).json({ message: 'Formulario no encontrado' });
        }

        // Verifica si la votación ya está cerrada
        const busqueda = await Form.findOne({ _id: idForm });
        if (busqueda.activa === false) {
            return res.status(400).json({ message: 'Votación ya cerrada' });
        }

        // Actualiza el formulario para marcarlo como no activo
        const result = await Form.updateOne({ _id: idForm }, { activa: false });
        if (result.nModified === 0) {
            return res.status(404).json({ message: 'Formulario no encontrado o no actualizado' });
        }

        // Responde con un estado 200 (OK) y un mensaje indicando que la votación ha sido cerrada exitosamente
        res.status(200).json({ message: 'Votación cerrada exitosamente' });
    } catch (error) {
        // Captura cualquier error que ocurra en el bloque try, lo registra en la consola y responde con un estado 500 (Error Interno del Servidor) y un mensaje de error
        console.error("Error al cerrar la votación: ", error);
        res.status(500).json({ message: 'Error al cerrar la votación', error });
    }
}
