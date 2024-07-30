import React, { useEffect, useState } from 'react';
import { mostrarVotacion as mostrarVotacionService } from '../services/votacion.service';
import '../styles/MostrarVotacion.css';

const MostrarVotacion = () => {
  const [votacion, setVotacion] = useState(null);

  useEffect(() => {
    const fetchVotacion = async () => {
      try {
        const response = await mostrarVotacionService();
        setVotacion(response);
      } catch (error) {
        console.error('Error al mostrar la votación:', error);
      }
    };

    fetchVotacion();
  }, []);

  return (
    <div className="votacion-container">
      {votacion ? (
        <>
          <h2 className="votacion-titulo">{votacion.nombre}</h2>
          <p className="votacion-consulta">{votacion.consulta}</p>
          <ul className="votacion-opciones">
            {votacion.opciones.map((opcion) => (
              <li key={opcion._id} className="votacion-opcion">
                <span className="votacion-opcion-nombre">{opcion.opcion}</span>
                <span className="votacion-opcion-votos">{opcion.votos}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default MostrarVotacion;
