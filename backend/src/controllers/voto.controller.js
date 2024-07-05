import Asamblea from"../models/asamblea.model.js";
import Form from "../models/form.model.js";


export async function emitirVoto(req, res) {
    
        try {

            // recibe opcion desde el cuerpo
            const { elegido } = req.body;

            //verifico si hay un usuario logeado

            if (!req.session.user) {
                return res.status(401).json({ message: 'Usuario no autenticado' });
            }
    
            const rut = req.session.user.rut;
              
            // Buscar la asamblea por estado activa
            const asamblea = await Asamblea.findOne({ activa: true });
            if (!asamblea) {
                return res.status(404).json({ message: 'Asamblea no encontrada' });
            }

            
             // Buscar la lista que contiene al alumno
             const alumnoExistente = asamblea.lista.alumnos.find(alumno => alumno.rut === rut); 
             //ta weno
             
              if (!alumnoExistente) {
                 return res.status(400).json({ message: 'Alumno no encontrado en la lista' });
              }
             if (alumnoExistente.voto === true) {
                 return res.status(400).json({ message: 'El alumno ya ha votado' });
             }
    
            // Obtener el ID del formulario de votación
            const idForm = asamblea.votacion;
            if (!idForm) {
                return res.status(404).json({ message: 'Formulario no encontrado' });
            }
    
            // Buscar el formulario por ID
            const form = await Form.findById(idForm);
            if (!form) {
                return res.status(404).json({ message: 'Formulario no encontrado' });
            }
    
            // Verificar que el índice elegido esté dentro del rango válido
            if (elegido >= form.opciones.length || elegido < 0) {
                return res.status(400).json({ message: 'Opción inválida' });
            }
    
            // Incrementar el contador de votos en la opción elegida
            form.opciones[elegido].votos++;
    
            // Guardar los cambios en la base de datos
            await form.save();
            alumnoExistente.voto = true;
            await asamblea.save();
    
            
            return res.status(400).json({ message: 'Voto registrado correctamente' });

        } catch (error) {
            console.error('Error al registrar el voto:', error);
            return res.status(500).json({ message: 'Error al registrar el voto', error });
        }
    };

    export async function cerrarVotacion(req, res) {
        try {
            console.log("Buscando asamblea activa...");
            let asamblea = await Asamblea.findOne({ activa: true });
            if (!asamblea) {
                return res.status(404).json({
                    message: "No hay una asamblea activa en este momento"
                });
            }
    
            console.log("Asamblea activa encontrada: ", asamblea);
    
            const idForm = asamblea.votacion;
            if (!idForm) {
                return res.status(404).json({ message: 'Formulario no encontrado' });
            }

            const busqueda = await Form.findOne({ _id: idForm });
            if (busqueda.activa === false) {
                return res.status(400).json({ message: 'Votación ya cerrada' });
            }
    
            console.log("Actualizando formulario con ID: ", idForm);
    
            // Actualizar el formulario directamente
            const result = await Form.updateOne({ _id: idForm }, { activa: false });
            if (result.nModified === 0) {
                return res.status(404).json({ message: 'Formulario no encontrado o no actualizado' });
            }
    
            console.log("Formulario actualizado correctamente");
    
            const updatedForm = await Form.findById(idForm);
            console.log("Formulario después de actualizar: ", updatedForm);
    
            res.status(200).json({ message: 'Votación cerrada exitosamente' });
        } catch (error) {
            console.error("Error al cerrar la votación: ", error);
            res.status(500).json({ message: 'Error al cerrar la votación', error });
        }
    }