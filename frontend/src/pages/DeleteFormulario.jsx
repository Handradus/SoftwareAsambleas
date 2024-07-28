import { useState } from 'react';
import Navbar from '../components/Navbar';
import { deleteFormulario } from '../services/formularios.service';


const BorrarFormularioActivo = () => {
    
    const handleDelete = async () => {
        const userConfirmed = window.confirm('¿Estás seguro de que deseas eliminar el formulario activo?');

        if (!userConfirmed) {
        return; // Si el usuario cancela, no hacemos nada
        }   
    
                   
               
        try {
            const response = await deleteFormulario();
            
            alert(response.message); // Muestra el mensaje de éxito
                        
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Error desconocido';

            alert('Error al eliminar el formulario: ' + errorMessage);
            
            
        }
    };

    return (
        <div className='main-container'>
            <Navbar />
            <h1>Borrar Formulario Activo</h1>
            <div>
                 <button type="button" onClick={handleDelete}>Eliminar Formulario Activo</button>
           </div>
                
            
        </div>
    );
};

export default BorrarFormularioActivo;
