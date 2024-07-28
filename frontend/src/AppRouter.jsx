import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Error404 from './pages/Error404';
import EditUser from './pages/EditUser';
import ProtectedRoute from './components/ProtectedRoute';
import Users from './pages/Users';
import CreateAsamblea from './pages/CreateAsamblea';
import GetAsamblea from './pages/GetAsamblea';
import GetAsambleaID from './pages/GetAsambleaID';
import CreateFormulario from './pages/CreateFormulario';
import BorrarFormularioActivo from './pages/DeleteFormulario';
import CerrarAsamblea from './pages/DeleteAsambleaActiva';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Rutas protegidas */}
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/create-asamblea" 
        element={
          <ProtectedRoute>
            <CreateAsamblea />
          </ProtectedRoute>
        }
      />
      <Route
        path="/get-asamblea"
        element={
          <ProtectedRoute>
            <GetAsamblea />
          </ProtectedRoute>
        }
      />
      <Route
        path="/get-asamblea/:id"
        element={
          <ProtectedRoute>
            <GetAsambleaID />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cerrar-asamblea"
        element={
          <ProtectedRoute>
            <CerrarAsamblea />
          </ProtectedRoute>
        }
      />
      <Route
        path="/crear-formulario"
        element={
          <ProtectedRoute>
            <CreateFormulario />
          </ProtectedRoute>
        }
      />
      <Route
        path="/borrar-formulario"
        element={
          <ProtectedRoute>
            <BorrarFormularioActivo />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/users" 
        element={
          <ProtectedRoute allowedRoles={['administrador']}>
            <Users />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/edit-user/:rut" 
        element={
          <ProtectedRoute>
            <EditUser />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRouter;
