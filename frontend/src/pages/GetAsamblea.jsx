import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { GetAsambleas } from '../services/asambleas.service';

const GetAsamblea = () => {
    const [asamblea, setAsamblea] = useState(null);

    useEffect(() => {
        const fetchAsambleas = async () => {
            try {
                const asambleasData = await GetAsambleas();
                console.log('Datos recibidos del backend:', asambleasData); //DEPURACION
                setAsamblea(asambleasData.data); //guarda asamblea activa en el estado local
                console.log('Asambleas obtenidas:', asambleasData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAsambleas();
    }, []);

    return (
        <>
            <div className='main-container'>
                <Navbar />
                <h1>Asambleas Activas</h1>
                {asamblea ? (
                    <div>
                        <p>Fecha: {asamblea.fecha}</p> 
                        <p>Puntos: {asamblea.puntos.join(', ')}</p>
                        <p>Resolutiva: {asamblea.resolutiva ? 'Sí' : 'No'}</p>
                    </div>
                ) : (
                    <p>No hay asambleas activas en este momento.</p>
                )}
            </div>
        </>
    );
};

export default GetAsamblea;
