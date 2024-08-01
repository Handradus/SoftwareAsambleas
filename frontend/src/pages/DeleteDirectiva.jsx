import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { EliminarDirectiva } from '../services/directiva.service'; 
import '../styles/DeleteDirectiva.css'; // Importa el archivo CSS

const DeleteDirectiva = () => {
  const [id, setId] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleEliminar = async (e) => {
    e.preventDefault();

    
    if (!id.trim()) {
      setError('Por favor, ingresa un ID válido.');
      setMessage(null);
      return;
    }

    try {
      const response = await EliminarDirectiva(id);
      console.log('Directiva eliminada', response);
      setMessage('Directiva eliminada con éxito');
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Error al eliminar directiva.');
      setMessage(null);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="title">Eliminar Directiva</h1>
        <form onSubmit={handleEliminar} className="form">
          <label>ID de la directiva:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button type="submit">Eliminar</button>
        </form>
        {message && <p className="successMessage">{message}</p>}
        {error && <p className="errorMessage">{error}</p>}
      </div>
    </div>
  );
};

export default DeleteDirectiva;
