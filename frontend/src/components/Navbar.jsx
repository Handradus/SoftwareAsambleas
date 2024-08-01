import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from '../services/auth.service.js';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const storedUser = JSON.parse(sessionStorage.getItem('usuario'));
    const userRole = storedUser?.data?.rolName;

    const logoutSubmit = () => {
        try {
            logout();
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <img
                        src="/cohete.png"
                        alt="Logo metodología de desarrollo"
                    />
                </li>
                <li className={location.pathname === "/home" ? "active" : ""}>
                    <NavLink to="/home">Inicio</NavLink>
                </li>
                {userRole === 'administrador' && (
                    <>
                        <li className={location.pathname === "/create-asamblea" ? "active" : ""}>
                            <NavLink to="/create-asamblea">Crear Asamblea</NavLink>
                        </li>
                        <li className={location.pathname === "/get-asamblea" ? "active" : ""}>
                            <NavLink to="/get-asamblea">Obtener Asambleas</NavLink>
                        </li>
                        <li className={location.pathname === "/cerrar-asamblea" ? "active" : ""}>
                            <NavLink to="/cerrar-asamblea">Cerrar Asamblea</NavLink>
                        </li>
                        <li className={location.pathname === "/crear-formulario" ? "active" : ""}>
                            <NavLink to="/crear-formulario">Crear Formulario</NavLink>
                        </li>
                        <li className={location.pathname === "/borrar-formulario" ? "active" : ""}>
                            <NavLink to="/borrar-formulario">Borrar Formulario</NavLink>
                        </li>
                        <li className={location.pathname === "/mostrar-votacion" ? "active" : ""}>
                            <NavLink to="/mostrar-votacion">Mostrar Votación</NavLink>
                        </li>
                    </>
                )}
                <li className={location.pathname === "/emitir-voto" ? "active" : ""}>
                    <NavLink to="/emitir-voto">Emitir Voto</NavLink>
                </li>
                <li className={location.pathname === "/profile" ? "active" : ""}>
                    <NavLink to="/profile">Perfil</NavLink>
                </li>
                <li className={location.pathname === "/" ? "active" : ""}>
                    <NavLink to="/" onClick={logoutSubmit}>Cerrar</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
