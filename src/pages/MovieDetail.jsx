import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill
} from 'react-icons/Bs'
import MovieCard from '../components/MovieCard';

import '../styles/MovieDetail.css';

const baseURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data);
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: 'currency',
      currency: 'USD'
    });
  };


  useEffect (() => {
    const movieUrl = `${baseURL}${id}?${apiKey}`;
    getMovie(movieUrl);
  }, []);

  return (
    <div className='movie__detail'>
      {movie && (
      <>
        <MovieCard movie={movie} showLink={false}/>
        <p className='tagline'>{movie.tagline}</p>
        <div className="info">
          <h3><BsWallet2/>Budget:</h3>
          <p>{formatCurrency(movie.budget)}</p>
        </div>
        <div className="info">
          <h3><BsGraphUp/>Revenue:</h3>
          <p>{formatCurrency(movie.revenue)}</p>
        </div>
        <div className="info">
          <h3><BsHourglassSplit/>Runtime:</h3>
          <p>{movie.runtime} min</p>
        </div>
        <div className="info description">
          <h3><BsFillFileEarmarkTextFill/>Description:</h3>
          <p>{movie.overview}</p>
        </div>
      </>
      )}
    </div>
  )
};

export default MovieDetail;
