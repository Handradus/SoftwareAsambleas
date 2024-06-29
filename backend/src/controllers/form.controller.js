import Form from '../models/form.model.js';

export async function createForm (req,res){
    try {
        const { nombre, consulta, opciones } = req.body;
        if (!opciones || opciones.length === 0) {
            return res.status(400).json({ message: "Al menos 2 opciones son requeridas." });
          }
        const newForm = new Form({ nombre, consulta, opciones });
        await newForm.save();

        res.status(201).json({
            message: "Formulario creado exitosamente",
            data: newForm
        })
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }

}

export async function getForm (req,res){
    try {
        const id = req.query.nombre;
        const form = await Form.findOne({nombre : id});

        if(!form){
            return res.status(404).json({
                message: "Formulario no encontrado",
                data: null
            });

        }
        res.status(200).json({
            message: "Formulario encontrado correctamente",
            data: form
        })


    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
}

export async function updateForm (req,res){
    try {
        const id = req.params.id;
        const formData= req.body;
        const formUpdated = await Form.findByIdAndUpdate(id,formData,{new: true});

        if (!formUpdated){
            return res.status(404).json({
                message: "Formulario no encontrado",
                data: null
            });
        }
        res.status(200).json({
            message: "Formulario actualizado correctamente",
            data: formUpdated
        })
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
}

export async function deleteForm (req,res){
    try {
        const id = req.params.id;
        const formDeleted = await Form.findByIdAndDelete(id);

        if (!formDeleted){
            return res.status(404).json({
                message: "Formulario no encontrado",
                data: null
            });
        }
        res.status(200).json({
            message: "Formulario eliminado correctamente",
            data: formDeleted
        })
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}