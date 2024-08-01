import axios from './root.service.js';

export async function ActualizarDirectiva  (id, data)  {
    try {
      const response = await axios.put(`user/directiva${id}`, data);
      console.log(response.data);
      // Mostrar mensaje de éxito al usuario
    } catch (error) {
      console.error(error);
      // Mostrar mensaje de error al usuario
    }
  }

export async function EliminarDirectiva (id) {
  try {
    const response = await axios.delete(`user/directiva${id}`);
    console.log(response.data);
    // Mostrar mensaje de éxito al usuario
  } catch (error) {
    console.error(error);
    // Mostrar mensaje de error al usuario
  }
}

