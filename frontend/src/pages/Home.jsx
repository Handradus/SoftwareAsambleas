import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../App.css';

const Home = () => {
    const navigate = useNavigate();
    const storedUser = JSON.parse(sessionStorage.getItem('usuario'));
    const userRole = storedUser?.data?.rolName;

    return (
        <>
            <div className="main-container">
                <Navbar />
                <h1>Bienvenido al Sistema de Asambleas</h1>
                <div className="button-container">
                    {userRole === 'administrador' && (
                        <>
                            <button onClick={() => navigate('/create-asamblea')}>Crear Asamblea</button>
                            <button onClick={() => navigate('/get-asamblea')}>Obtener Asambleas</button>
                            <button onClick={() => navigate('/cerrar-asamblea')}>Cerrar Asamblea</button>
                            <button onClick={() => navigate('/crear-formulario')}>Crear Formulario</button>
                            <button onClick={() => navigate('/borrar-formulario')}>Borrar Formulario</button>
                            <button onClick={() => navigate('/mostrar-votacion')}>Mostrar Votación</button>
                            <button onClick={() => navigate('/actualizar-directiva')}>Actualizar Directiva</button>
                            <button onClick={() => navigate('/eliminar-directiva')}>Eliminar Directiva</button>
                        </>
                    )}
                        <button onClick={() => navigate('/emitir-voto')}>Emitir Voto</button>
                </div>
            </div>
        </>
    );
};

export default Home;
