import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Mantenemos el CSS, pero lo simplificaremos
import MovieForm from './components/MovieForm';

function App() {
  const [movies, setMovies] = useState([]);
  const fetchMovies = () => {
    // ESTE LINK DEBE SER TU URL DE RENDER
    axios.get('https://netflix-backend-oqcq.onrender.com/api/movies') 
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => console.error("Error:", error));
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  // Quitamos la lógica de showAdmin temporalmente
  // Renderizado simple para prueba
  return (
    <div className="app">
      <h1>VERIFICACIÓN DE CONEXIÓN</h1>
      <MovieForm onMovieAdded={fetchMovies} />
      
      {movies.map(movie => (
        <div key={movie.id} style={{ margin: '20px', border: '1px solid #E50914', padding: '10px', backgroundColor: '#333' }}>
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
          <img src={movie.coverImage} alt={movie.title} style={{ maxWidth: '150px' }} />
        </div>
      ))}
    </div>
  );
}

export default App;