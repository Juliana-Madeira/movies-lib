import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';

import '../styles/Home.css';


const baseURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setTopMovies(data.results);
  
  };

  useEffect(() => {
    const topRatedUrl = `${baseURL}top_rated?${apiKey}`;

    console.log(topRatedUrl);

    getTopRatedMovies(topRatedUrl);
  }, [])


  return (
    <div className='container'>
      <h2 className='title'>The best movies</h2>
        <div className='movies__container'>
          {topMovies.length === 0 && <p>Loading...</p>}
          {topMovies && topMovies.map((movie) => <MovieCard movie={movie} key={movie.id}/>)}
        </div>
    </div>
  )
}

export default Home