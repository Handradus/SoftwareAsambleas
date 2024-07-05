import Asamblea from"../models/asamblea.model.js";
import Form from "../models/form.model.js";
import { createForm,mostrarVotacion,updateForm,deleteForm } from "../controllers/form.controller.js";
//permite importar formulario por id

export async function emitirVoto(req, res) {
    
        try {
            const { elegido } = req.body;
            
            if (!req.session.user) {
                return res.status(401).json({ message: 'Usuario no autenticado' });
            }
    
            const rut = req.session.user.rut;
              
            // Buscar la asamblea por ID
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