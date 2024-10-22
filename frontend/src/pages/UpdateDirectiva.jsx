import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { ActualizarDirectiva } from '../services/directiva.service';
import '../styles/UpdateDirectiva.css'; 

const UpdateDirectiva = () => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [cargo, setCargo] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleActualizar = async (e) => {
    e.preventDefault();
    try {
      const response = await ActualizarDirectiva(id, { nombre, cargo, email });
      console.log('Directiva actualiza',response);
      setMensaje('Directiva actualizada con éxito');
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Error al actualizar la directiva');
      setMensaje(null);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="title">Actualizar Directiva</h1>
        <form onSubmit={handleActualizar} className="form">
          <label>ID de la directiva:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <br />
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <br />
          <label>Cargo:</label>
          <input
            type="text"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
          <br />
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <button type="submit">Actualizar</button>
        </form>
        {mensaje && <p className="successMessage">{mensaje}</p>}
        {error && <p className="errorMessage">{error}</p>}
      </div>
    </div>
  );
};

export default UpdateDirectiva;
