import axios from "./root.service.js";

export async function createFormulario(data) {
    try {
        const response = await axios.post('/user/formulario', data);
        return response.data; // Devuelve el mensaje de éxito o error
    } catch (error) {
        throw error.response?.data || error.message;
    }
}



export async function deleteFormulario() {
    try {
        const response = await axios.delete('/user/BorrarForm');
        console.log('Respuesta del servidor:', response);
        return response.data; // Devuelve el mensaje de éxito o error
    } catch (error) {
        console.error('Error en la solicitud DELETE:', error);
        throw error.response?.data || error.message;
    }
}

