import React, { useState } from 'react';
import Profile from './Profile'; // Окремий підкомпонент для Рівня 4

const MovieApp = () => {
  const [movies, setMovies] = useState([]); // Стан для списку фільмів
  const [name, setName] = useState('');
  const [review, setReview] = useState('');

  const handleAdd = () => {
    const newMovie = { id: Date.now(), name, review };
    setMovies([...movies, newMovie]);
    setName(''); setReview('');
  };

  return (
    <div>
      <Profile /> {/* Рівень 4: Управління профілем */}

      <h3>Рівень 3: Відстеження фільмів</h3>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Назва фільму" />
      <input value={review} onChange={e => setReview(e.target.value)} placeholder="Рецензія" />
      <button onClick={handleAdd}>Додати</button>

      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <strong>{movie.name}</strong> — {movie.review}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MovieApp;