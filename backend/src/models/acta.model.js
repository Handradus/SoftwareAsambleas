// src/models/acta.model.js

import mongoose from 'mongoose';

const actaSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true
    },
    puntos: {
        type: Array,
        required: true
    },
    consulta: {
        type: String,
        required: false
    },
    votosOpciones: {
        type: Array,
        required: false
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

export default mongoose.model('Acta', actaSchema);
