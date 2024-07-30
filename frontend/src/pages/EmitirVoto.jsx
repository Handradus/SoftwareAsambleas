import React, { useState, useEffect } from 'react';
import { emitirVoto as emitirVotoService, mostrarVotacion as mostrarVotacionService } from '../services/votacion.service';
import '../styles/EmitirVoto.css'; // Importa los estilos CSS
// si funca
const EmitirVoto = () => {
  const [voto, setVoto] = useState('');
  const [message, setMessage] = useState('');
  const [votacion, setVotacion] = useState(null);

  useEffect(() => {
    const fetchVotacionActiva = async () => {
      try {
        const data = await mostrarVotacionService();
        console.log('Datos de la votación activa:', data); // Log para depurar
        setVotacion(data);
      } catch (error) {
        console.error('Error al obtener la votación activa:', error);
      }
    };

    fetchVotacionActiva();
  }, []);

  const handleVoto = async (e) => {
    e.preventDefault();
    try {
      await emitirVotoService({ voto });
      setMessage('Voto emitido con éxito');
    } catch (error) {
      setMessage('Error al emitir el voto');
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
              {votacion.opciones.map((opcion) => (
                <div key={opcion._id} className="votacion-opcion">
                  <input
                    type="radio"
                    id={opcion._id}
                    name="voto"
                    value={opcion.opcion}
                    onChange={(e) => setVoto(e.target.value)}
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
