
import Directiva from '../models/directiva.model.js';

export const createDirectiva = async (req, res) => {
  try {
    const { nombre, cargo, email } = req.body;
    const newDirectiva = new Directiva({ nombre, cargo, email });

    await newDirectiva.save();

    res.status(201).json({
       message: 'Directiva creada exitosamente', 
       data: newDirectiva 
      });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la directiva', error: error.message });
  }
};

export const getDirectiva = async (req, res) => {
  try {
    const directiva = await Directiva.find();

    res.status(200).json(directiva);

  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las directivas', error: error.message });
  }
};

export const updateDirectiva = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDirectiva = await Directiva.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedDirectiva) {
      return res.status(404).json({
         message: 'Directiva no encontrada'
         });
    }
    res.status(200).json({
       message: 'Directiva actualizada exitosamente', 
       data: updatedDirectiva 
      });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la directiva', error: error.message });
  }
};

export const deleteDirectiva = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDirectiva = await Directiva.findByIdAndDelete(id);

    if (!deletedDirectiva) {
      return res.status(404).json({ 
        message: 'Directiva no encontrada',
      data:null
      });
    }
    res.status(200).json({
       message: 'Directiva eliminada exitosamente',
       data: deletedDirectiva
      });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la directiva', error: error.message });
  }
};
