import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import MovieForm from './components/MovieForm';

function App() {
  const [movies, setMovies] = useState([]);
  const [moviePlaying, setMoviePlaying] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false); // <-- ¡SOLO ESTA LÍNEA!
  const [featuredMovie, setFeaturedMovie] = useState(null);

    // ... el resto del código es correcto ...

  const fetchMovies = () => {
    // ESTE LINK DEBE SER TU URL DE RENDER PARA QUE FUNCIONE EN INTERNET
    axios.get('https://netflix-clone-sv5b.onrender.com/api/movies')
      .then(response => {
        setMovies(response.data);
        const random = Math.floor(Math.random() * response.data.length);
        setFeaturedMovie(response.data[random]);
      })
      .catch(error => console.error("Error:", error));
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  const handlePlay = (movie) => setMoviePlaying(movie);
  const handleClose = () => setMoviePlaying(null);

  return (
    <div className="app">
      {/* 1. NAVBAR SUPERIOR */}
      <div className="navbar">
        <div className="navbar-left">
            <h1 className="logo">SERGIOFLIX</h1>
            <div className="nav-links">
                <span>Inicio</span>
                <span>Series</span>
                <span>Películas</span>
                <span>Mi lista</span>
            </div>
        </div>
        <div className="navbar-right">
            <button className="admin-btn" onClick={() => setShowAdmin(!showAdmin)}>
                {showAdmin ? 'Cerrar Admin' : 'Admin'}
            </button>
            <div className="user-icon"></div>
        </div>
      </div>

      {showAdmin && <MovieForm onMovieAdded={fetchMovies} />}

      {/* HERO BANNER (Portada Gigante) */}
      {featuredMovie && (
        <header className="hero-banner" style={{backgroundImage: `url("${featuredMovie.coverImage}")`}}>
            <div className="hero-content">
                <h1 className="hero-title">{featuredMovie.title}</h1>
                <h1 className="hero-description">{featuredMovie.description}</h1>
                <div className="hero-buttons">
                    <button onClick={() => handlePlay(featuredMovie)}>Reproducir</button>
                </div>
            </div>
            <div className="hero-fade-bottom"></div>
        </header>
      )}

      {/* FILAS DE PELÍCULAS */}
      <div className="row">
        <h2>Tendencias ahora</h2>
        <div className="row-posters">
            {movies.map(movie => (
                <img key={movie.id} className="row-poster" src={movie.coverImage} alt={movie.title} onClick={() => handlePlay(movie)} />
            ))}
        </div>
      </div>

      {/* REPRODUCTOR DE VIDEO */}
      {moviePlaying && (
        <div className="video-overlay" onClick={handleClose}>
          <div className="video-container">
            <button className="close-btn" onClick={handleClose}>X</button>
            <iframe 
              width="100%" height="100%" 
              src={moviePlaying.videoUrl} 
              title="Video" frameBorder="0" 
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