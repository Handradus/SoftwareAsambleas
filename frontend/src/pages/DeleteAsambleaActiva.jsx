import { useState } from 'react';
import Navbar from '../components/Navbar';
import { DeleteAsambleaActiva } from '../services/asambleas.service';

const CerrarAsamblea = () => { //Explicar esta función el viernes ojitoo  
    const [message, setMessage] = useState(null); //Esto es un hook de estado de react que se usa para manejar el estado de un componente funcional
    const [error, setError] = useState(null); //bueno nuevamente un hook de estado de react, que es un hook??? hook es una funcion que permite a los componentes de react tener estados y otras caracteristicas de react sin escribir una clase, q es una clase? una clase es un molde para crear objetos y eso

    const handleClose = async () => { //funcion asincrona que se encarga de cerrar la asamblea activa 
        try {
            const response = await DeleteAsambleaActiva(); //llamamos a la funcion DeleteAsambleaActiva que se encuentra en asambleas.service.js
            console.log('Asamblea cerrada:', response);
            setMessage(response.message); //
            setError(null);
        } catch (error) { //manejo de errores
            console.error(error);
            setError('Error al cerrar la asamblea activa. Inténtalo nuevamente.'); //mensaje de error
            setMessage(null);
        }
    };

    return (
        <>
            <div className='main-container'> 
                <Navbar />
                <h1>Cerrar Asamblea Activa</h1>
                <button onClick={handleClose}>Cerrar Asamblea Activa</button>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}
            </div>
        </>
    );
};

export default CerrarAsamblea;
