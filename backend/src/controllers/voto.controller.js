import Asamblea from"../models/asamblea.model.js";
import Form from "../models/form.model.js";
import { createForm,mostrarVotacion,updateForm,deleteForm } from "../controllers/form.controller.js";
//permite importar formulario por id

export async function emitirVoto(req, res) {
    try {

        //tomo rut de la session activa
        const rut = req.session.user.rut;
        

        // Buscar la asamblea que esta activa, deberia haber solo 1 
        let asamblea = await Asamblea.findOne({ activa: true });
        if (!asamblea) {
            return res.status(404).json({
                message: "No hay una asamblea activa en este momento"
            });
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


        
        

            //paso la id de la votacion que tendra la asamblea
        const idForm = asamblea.votacion;//esto es una id
        if (!idForm) {
            return res.status(404).json({ message: 'Formulario no encontrado' });
        }
        

        ///mostrar las opciones 
        await mostrarVotacion(idForm,res);
        //guarda opcion elegida
        const elegido = 1;
        if (elegido > form.opciones.length || elegido < 0) {
            return res.status(400).json({ message: 'Opción inválida' });
        }
        //aumenta el contador de la opcion
        const form = await form.findById(formId);
        form.opciones[elegido].votos++;
        await form.save();

        // Actualizar el estado del voto del alumno
        alumnoExistente.voto = true;
        await asamblea.save();

        res.status(201).json({ message: 'Voto registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el voto', error });
    }
};