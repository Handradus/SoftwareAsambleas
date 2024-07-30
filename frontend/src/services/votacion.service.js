import axios from './root.service.js'; // Asegúrate de que este import esté correcto según tu configuración

export async function emitirVoto(votoData) {
    try {
        const response = await axios.post('/user/emitirVoto', votoData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function mostrarVotacion() {
    try {
        const response = await axios.get('/user/mostrarVotacion');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
