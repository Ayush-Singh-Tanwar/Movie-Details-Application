
import { useState } from 'react';
import './App.css'

function App() {
const [query,setQuery] = useState("");
const [movie,setMovie] = useState(null);
const [error,setError] = useState("");

  const fetchMovie = async()=>{
    try{
      const response = await fetch(`https://www.omdbapi.com/?t=${query}&apikey=44f998cb`);
      const data = await response.json();

      if(data.Response === 'False') {
        setError('Movie not found');
        setMovie(null);
      } else {
        setMovie(data);
        setError('');
      }
  } catch (err) {
    setError('Error fetching data');
  }
}
  return (
    <>
    <h1>Movie Search APP</h1>
    <div className="app-container">
    <input placeholder='Search Movie'  value={query} onChange={(e) =>setQuery(e.target.value)}/>
    <button onClick={fetchMovie}>Search Movie</button>
    </div>
    {error && <p className='error'>{error}</p>}
    {movie && (
      <div className='movie-info'>
        <h2>{movie.Title}</h2>
        <p>Release Date: {movie.Released}</p>
        <p>Ratings: {movie.imdbRating}</p>
        <p>{movie.Plot}</p>
        <img src={movie.Poster} alt={movie.Title} className='poster'/>
      </div>
    )
    }
    </>
  )
}

export default App
