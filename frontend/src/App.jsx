import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import MovieForm from './components/MovieForm'; // <--- 1. Importamos

function App() {
  const [movies, setMovies] = useState([]);
  const [moviePlaying, setMoviePlaying] = useState(null);

  // 2. Sacamos la carga de datos a una función para poder reutilizarla
  const fetchMovies = () => {
    axios.get('http://localhost:8081/api/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error("Error:", error));
  }

  // Cargar pelis al inicio
  useEffect(() => {
    fetchMovies();
  }, []);

  const handlePlay = (movie) => setMoviePlaying(movie);
  const handleClose = () => setMoviePlaying(null);

  return (
    <div className="netflix-app">
      <header>
        <h1>NETFLIX CLON</h1>
      </header>

      {/* 3. Aquí ponemos el Formulario */}
      {/* Le pasamos "fetchMovies" para que cuando guarde, actualice la lista solo */}
      <MovieForm onMovieAdded={fetchMovies} />
      
      <div className="movie-container">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card" onClick={() => handlePlay(movie)}>
            <img src={movie.coverImage} alt={movie.title} />
            <div className="card-info">
                <h3>{movie.title}</h3>
                <p>▶ Reproducir</p>
            </div>
          </div>
        ))}
      </div>

      {moviePlaying && (
        <div className="video-overlay" onClick={handleClose}>
          <div className="video-container">
            <button className="close-btn" onClick={handleClose}>X</button>
            <iframe 
              width="100%" 
              height="100%" 
              src={moviePlaying.videoUrl} 
              title="Video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;