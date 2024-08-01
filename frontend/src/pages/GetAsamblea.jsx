import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { GetAsambleas } from '../services/asambleas.service';

const GetAsamblea = () => {
    const [asambleas, setAsambleas] = useState([]);

    useEffect(() => {
        const fetchAsambleas = async () => {
            try {
                const asambleasData = await GetAsambleas();
                console.log('Asambleas obtenidas:', asambleasData); // Verifica la respuesta aquí
                setAsambleas(asambleasData.data ? [asambleasData.data] : []);
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
                {asambleas.length > 0 ? (
                    <ul>
                        {asambleas.map((asamblea) => (
                            <ul key={asamblea._id}>
                                <p>ID: {asamblea._id}</p>
                                <p>Fecha: {new Date(asamblea.fecha).toLocaleDateString()}</p>
                                <p>Puntos: {asamblea.puntos.join(', ')}</p>
                                <p>Resolutiva: {asamblea.resolutiva ? 'Sí' : 'No'}</p>
                            </ul>
                        ))}
                    </ul>
                ) : (
                    <p>No hay asambleas activas en este momento.</p>
                )}
            </div>
        </>
    );
};

export default GetAsamblea;
