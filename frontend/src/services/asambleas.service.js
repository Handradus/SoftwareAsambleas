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
		const response = await axios.get('/user/asambleasActivas');
		return response.data;
	} catch (error) {
		throw error.response?.data || error.message;
	}
}