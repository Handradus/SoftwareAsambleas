//b

// src/controllers/asamblea.controller.js

import Asamblea from '../models/asamblea.model.js';
import Form from '../models/form.model.js';
import Acta from '../models/acta.model.js';

// Función para obtener el acta de una asamblea activa
export async function obtenerActa(req, res) {
    try {
        // Buscar una asamblea que esté activa
        const asambleaActiva = await Asamblea.findOne({ activa: true });

        // Verificar si existe una asamblea activa
        if (!asambleaActiva) {
            return res.status(404).json({
                message: 'No hay ninguna asamblea activa en este momento.',
                data: null
            });
        }

        // Extraer la información de la asamblea activa
        const { fecha, puntos } = asambleaActiva;

        let detallesActa = {
            fecha,
            puntos
        };

        // Si la asamblea es resolutiva, obtener los detalles de la votación
        if (asambleaActiva.resolutiva) {
            const idForm = asambleaActiva.votacion;
            const form = await Form.findById(idForm);

            if (form) {
                const votosOpciones = form.opciones.map(opcion => ({
                    opcion: opcion.opcion,
                    votos: opcion.votos
                }));

                const consulta = form.consulta;

                detallesActa = {
                    ...detallesActa,
                    consulta,
                    votosOpciones
                };
            }
        }

        // Crear un nuevo documento Acta y guardarlo en la base de datos
        const nuevaActa = new Acta(detallesActa);
        await nuevaActa.save();

        return res.status(200).json({
            message: 'Acta obtenida y guardada correctamente',
            data: nuevaActa
        });
    } catch (error) {
        console.error('Error al obtener el acta:', error);
        return res.status(500).json({ message: error.message });
    }
}
