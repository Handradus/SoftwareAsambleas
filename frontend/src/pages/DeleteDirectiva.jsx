import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { EliminarDirectiva } from '../services/directiva.service'; 
const DeleteDirectiva = () => {
  const [id, setId] = useState('');

  const handleEliminar = async (e) => {
    e.preventDefault(); 
    try {
      const response = await EliminarDirectiva(id);
      console.log(response.data);
      setMensaje('Directiva eliminada con éxito');
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Error al eliminar la directiva');
      setMensaje(null);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Eliminar Directiva</h1>
      <form onSubmit={handleEliminar}>
        <label>ID de la directiva:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button type="submit">Eliminar</button>
      </form>
    </div>
  );
};

export default DeleteDirectiva;
