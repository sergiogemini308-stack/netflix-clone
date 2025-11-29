import { useState } from 'react';
import axios from 'axios';
import './MovieForm.css'; // Ahora crearemos este estilo

function MovieForm({ onMovieAdded }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        videoUrl: '',
        coverImage: '',
        releaseYear: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Enviamos los datos a Java
        axios.post('http://localhost:8081/api/movies', formData)
            .then(response => {
                alert('¡Película agregada con éxito!');
                onMovieAdded(); // Avisamos a la App para que recargue la lista
                // Limpiamos el formulario
                setFormData({ title: '', description: '', videoUrl: '', coverImage: '', releaseYear: '' });
            })
            .catch(error => {
                console.error("Error al guardar:", error);
                alert('Hubo un error al guardar la película');
            });
    }

    return (
        <div className="form-container">
            <h2>🎬 Agregar Nueva Película</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Título" value={formData.title} onChange={handleChange} required />
                <input type="text" name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} />
                <input type="text" name="videoUrl" placeholder="Link del Video (Embed)" value={formData.videoUrl} onChange={handleChange} required />
                <input type="text" name="coverImage" placeholder="Link de la Portada (Imagen)" value={formData.coverImage} onChange={handleChange} required />
                <input type="number" name="releaseYear" placeholder="Año" value={formData.releaseYear} onChange={handleChange} />
                <button type="submit">GUARDAR PELÍCULA</button>
            </form>
        </div>
    );
}

export default MovieForm;