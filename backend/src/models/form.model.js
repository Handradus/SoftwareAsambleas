import mongoose from "mongoose";
//en este cada opciones en un array por tanot sera generaod con una id , por tanto puedo aumentarla 
const opcionesSchema = new mongoose.Schema({
    opcion: {
      type: String,
      required: true,
    },
    votos: {
      type: Number,
      default: 0,
    },
    numeroOp: {
      type: Number,
      default: 0,
      required: false,
    }
  });

const formSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required : true,
        

    },
    consulta: {
        type : String,
        required : true,
        unique : false
    },
    opciones: [opcionesSchema],

    asamblea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asamblea',
      required: true
       
    },
    activa: {
      type: Boolean,
      default: true
  },


},
{
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
}
)

export default mongoose.model('Form',formSchema);


/*
Req funcional
-El sistema Permite al usuario postularse mediante un formulario a un concurso (crear algo -> createForm()), como tambien ver su postulacion(obtener foromulario) en caso de haberse 
equivocado (update form) y si la persona se arrepiente de haber postulado, puede eliminar su postulacion.(delete form).

*/