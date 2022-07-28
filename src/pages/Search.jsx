import React, { useState, useEffect }  from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

import '../styles/Home.css';

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams();
  const [moviesSearch, setMoviesSearch] = useState([]);
  const query = searchParams.get('q');

  const getSearchedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMoviesSearch(data.results);
  
  };

  useEffect(() => {
    const searchWithQueryUrl = `${searchURL}?${apiKey}&query=${query}`;
    
    getSearchedMovies(searchWithQueryUrl);
  }, [query])


  return (
    <div className='container'>
      <h2 className='title'>Results to: <span className='query__text'>{query}</span></h2>
        <div className='movies__container'>
          {moviesSearch.length === 0 && <p>Loading...</p>}
          {moviesSearch && moviesSearch.map((movie) => <MovieCard movie={movie} key={movie.id}/>)}
        </div>
    </div>
  )
}

export default Search