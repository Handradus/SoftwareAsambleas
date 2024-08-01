import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { GetAsambleaId } from '../services/asambleas.service';

const GetAsambleaID = () => {
    const { id } = useParams();
    const [asamblea, setAsamblea] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAsamblea = async () => { //función asincrona para obtener la asamblea, recordar que es asincrona wujujuju si
            try {
                const asambleaData = await GetAsambleaId(id);
                console.log('Asamblea obtenida:', asambleaData);
                setAsamblea(asambleaData.data);
                setError(null); //Reiniciamoss el error si la solicitud es exitosa
            } catch (error) {
                console.error(error); //si hay error lo mostramos
                setError('Error al obtener la asamblea.'); //establecemos el mensaje de error
            }
        };
        fetchAsamblea();
    }, [id]);
    return (
        <>
            <div className='main-container'>
                <Navbar />
                <h1>Detalles de la Asamblea</h1>
                {error ? (
                    <p>{error}</p>
                ) : asamblea ? (
                        <ul key={asamblea._id}>
                            <p>ID: {asamblea._id}</p>
                            <p>Fecha: {new Date(asamblea.fecha).toLocaleDateString()}</p>
                            <p>Puntos: {asamblea.puntos.join(', ')}</p>
                            <p>Resolutiva: {asamblea.resolutiva ? 'Sí' : 'No'}</p>
                        </ul>
                ) : (
                    <p>No se encuentra la Asamblea</p>
                )}
            </div>
        </>
    );
};

export default GetAsambleaID;
