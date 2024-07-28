import { useState } from 'react';
import Navbar from '../components/Navbar';
import { createFormulario } from '../services/formularios.service';

const CreateFormulario = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        consulta: '',
        opciones: [{ opcion: '', votos: 0 }],
    });

    const handleChange = (e, index = null) => {
        const { name, value, type, checked } = e.target;

        if (name === 'opciones' && index !== null) {
            const newOpciones = [...formData.opciones];
            newOpciones[index] = { ...newOpciones[index], opcion: value };
            setFormData({
                ...formData,
                opciones: newOpciones
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Datos enviados al backend:', formData); // Verifica la estructura de formData
            const responseData = await createFormulario(formData);
            alert('Formulario creado correctamente!');
            console.log('Respuesta de nuestra API', responseData);
        } catch (error) {
            console.error(error);
        }
    };

    const addOpcion = () => {
        setFormData({
            ...formData,
            opciones: [...formData.opciones, { opcion: '', votos: 0 }] // Añade una nueva opción vacía
        });
    };

    const removeOpcion = (index) => {
        const newOpciones = formData.opciones.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            opciones: newOpciones
        });
    };

    return (
        <>
            <div className='main-container'>
                <Navbar />
                <form onSubmit={handleSubmit}>
                    <h1>Create Formulario</h1>
                    <p>Nombre</p>
                    <input type='text' name='nombre' value={formData.nombre} onChange={handleChange} required />
                    <p>Consulta</p>
                    <input type='text' name='consulta' value={formData.consulta} onChange={handleChange} required />
                    <p>Opciones</p>
                    {formData.opciones.map((opcion, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name="opciones"
                                value={opcion.opcion}
                                onChange={(e) => handleChange(e, index)}
                                required
                            />
                            <button type="button" onClick={() => removeOpcion(index)}>Eliminar</button>
                        </div>
                    ))}
                    <button type="button" onClick={addOpcion}>Añadir Opción</button>
                    <button type="submit">Crear Formulario</button>
                </form>
            </div>
        </>
    );
};

export default CreateFormulario;
