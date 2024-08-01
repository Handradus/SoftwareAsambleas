import React, { useState, useEffect } from 'react';
import { emitirVoto as emitirVotoService, mostrarVotacion as mostrarVotacionService } from '../services/votacion.service';
import '../styles/EmitirVoto.css'; // Importa los estilos CSS

const EmitirVoto = () => {
  const [voto, setVoto] = useState(null);
  const [message, setMessage] = useState('');
  const [votacion, setVotacion] = useState(null);

  useEffect(() => {
    const fetchVotacionActiva = async () => {
      try {
        const data = await mostrarVotacionService();
        console.log('Datos de la votación activa:', data); // Log para depurar
        setVotacion(data);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Error desconocido';
        console.error('Error al obtener la votación activa:', errorMessage);
      }
    };

    fetchVotacionActiva();
  }, []);

  const handleVoto = async (e) => {
    e.preventDefault();
    try {
      console.log('Enviando voto:', { elegido: voto });  // Log para depurar
      await emitirVotoService({ elegido: voto });  // Enviar { elegido: voto } al servicio
      setMessage('Voto emitido con éxito');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error desconocido';
      setMessage(`Error al emitir el voto: ${errorMessage}`);
      console.error('Error al emitir el voto:', error);
    }
  };

  return (
    <div className="votacion-container">
      <h2 className="votacion-titulo">Emitir Voto</h2>
      {votacion ? (
        <div>
          <h3 className="votacion-consulta">{votacion.consulta}</h3>
          <form onSubmit={handleVoto}>
            <div className="votacion-opciones">
              {votacion.opciones.map((opcion, index) => (
                <div key={opcion._id} className="votacion-opcion">
                  <input
                    type="radio"
                    id={opcion._id}
                    name="voto"
                    value={index + 1}  // Usamos el índice + 1 como valor
                    onChange={(e) => setVoto(Number(e.target.value))}  // Convertimos el valor a número
                  />
                  <label htmlFor={opcion._id}>{opcion.opcion}</label>
                </div>
              ))}
            </div>
            <button type="submit">Emitir Voto</button>
          </form>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default EmitirVoto;