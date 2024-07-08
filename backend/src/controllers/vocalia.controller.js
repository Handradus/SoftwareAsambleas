
import Vocalia from '../models/vocalia.model.js';

export const createVocalia = async (req, res) => {
  try {
    const { nombre, participantes } = req.body;
    const newVocalia = new Vocalia({ nombre, participantes });

    await newVocalia.save();

    res.status(201).json({ 
      message: 'Vocalía creada exitosamente', 
      data: newVocalia 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la vocalía', error: error.message });
  }
};

export const getVocalias = async (req, res) => {
  try {
    const vocalias = await Vocalia.find();

    res.status(200).json(vocalias);

  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las vocalías', error: error.message });
  }
};

export const updateVocalia = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVocalia = await Vocalia.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedVocalia) {
      return res.status(404).json({
         message: 'Vocalía no encontrada' 
        });
    }
    res.status(200).json({
       message: 'Vocalía actualizada exitosamente',
        data: updatedVocalia 
      });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la vocalía', error: error.message });
  }
};

export const deleteVocalia = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVocalia = await Vocalia.findByIdAndDelete(id);

    if (!deletedVocalia) {
      return res.status(404).json({
         message: 'Vocalía no encontrada',
        data:null
       });
    }
    res.status(200).json({ 
      message: 'Vocalía eliminada exitosamente',
      data: deletedVocalia
     });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la vocalía', error: error.message });
  }
};
