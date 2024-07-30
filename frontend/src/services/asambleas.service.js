import axios from "./root.service.js";

export async function PostAsambleas(data) {
    try {
        const response = await axios.post('/user/crearAsamblea', data);
        return response.data; // Devuelve el mensaje de éxito o error
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function GetAsambleas() {
    try {
        const response = await axios.get('/user/asambleasActivas'); //aqui nose porque no me dejaba subirlo lo deje como stash y se bugeo lol
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function GetAsambleaId(id) {
    try {
        const response = await axios.get(`/user/obtenerAsamblea/${id}`);
        console.log('Respuesta del backend:', response); //log pa depurar algunos errores medios locos
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export async function DeleteAsambleaActiva() {
    try {
        const response = await axios.post('/user/cerrarAsambleaActiva');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}