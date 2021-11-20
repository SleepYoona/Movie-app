import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/movielist';
import MovieListHeading from './components/movieListHeading';
import './App.css';
import SearchBox from './components/searchbar';
import AddFavourites from './components/addFavorites';
import RemoveFavourites from './components/removeFavourites';

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([])
  const [searchValue, setSearchValue] = useState('')


  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=d8030371`;
    
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search){
      setMovies(responseJson.Search);
    }
    
  };
  useEffect(() => {
    getMovieRequest();
  }, [searchValue]);

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    
    setFavourites(newFavouriteList);
  }

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies'/>
        <SearchBox searchValue = {searchValue} setSearchValue = {setSearchValue}/>
      </div>
      <div className='row'>
        <MovieList 
          movies = {movies} 
          handleFavouriteClick = {addFavouriteMovie}
          favouriteComponent = {AddFavourites}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites'/>
      </div>
      <div className='row'>
        <MovieList 
          movies = {favourites} 
          handleFavouriteClick = {removeFavouriteMovie}
          favouriteComponent = {RemoveFavourites}
        />
      </div>
    </div>
  );
};

export default App;
