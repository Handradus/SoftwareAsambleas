import mongoose from 'mongoose';

const alumnoSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        required: true,
        unique: false
    },
    voto: {
        type: Boolean,
        default: false
    }
});

const listaSchema = new mongoose.Schema({
    alumnos: [alumnoSchema]
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const asambleaSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true,
        unique: false
    },
    puntos: {
        type: [String],
        required: true
    },
    resolutiva: {
        type: Boolean,
        required: true
    },
    lista: listaSchema,
    activa: {
        type: Boolean,
        default: true
    },
    votacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Form'
    },
    fechaCierre: {
        type: Date
    },
    cerradaPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    anotaciones: {
        type: [String],
        default: []
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const Asamblea = mongoose.model('Asamblea', asambleaSchema);
export default Asamblea;
