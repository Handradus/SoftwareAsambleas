import { useState } from 'react';
import Navbar from '../components/Navbar';
import { PostAsambleas } from '../services/asambleas.service';

const CreateAsamblea = () => {
  const [formData, setFormData] = useState({
    fecha: '',
    puntos: '',
    resolutiva: false,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Datos enviados al backend:', formData); // Depuración
      const responseData = await PostAsambleas(formData);
      alert('Asamblea creada correctamente!');
      console.log('Respuesta de nuestra api', responseData);
      setError(null); // Reiniciamos el error si la solicitud es exitosa
    } catch (error) {
      console.error(error);
      if (error.message === 'Ya existe una asamblea activa. Debe cerrar la asamblea activa antes de crear una nueva.') {
        setError('Ya existe una asamblea activa. Debe cerrar la asamblea activa antes de crear una nueva.');
      } else {
        setError('Error al crear la asamblea. Inténtelo nuevamente.');
      }
    }
  };

  return (
    <>
      <div className='main-container'>
        <Navbar />
        <form onSubmit={handleSubmit}>
          <h1>Crear Asamblea</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p>Fecha</p>
          <input type='date' name='fecha' value={formData.fecha} onChange={handleChange} required />
          <p>Puntos</p>
          <input type='text' name='puntos' value={formData.puntos} onChange={handleChange} required />
          <p>Resolutiva</p>
          <input type="checkbox" name="resolutiva" checked={formData.resolutiva} onChange={handleChange} />
          <button type="submit">Crear asamblea</button>
        </form>
      </div>
    </>
  );
};

export default CreateAsamblea;