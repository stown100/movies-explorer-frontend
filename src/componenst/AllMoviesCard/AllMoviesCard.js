import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

const AllMoviesCard = ({ country, created_at, description, director, duration, image, nameEN, nameRU,
    trailerLink, updated_at, year, handleAddPlaceSubmit, movieId, trailer, thumbnail, removeCard, savedMovies }) => {

    // Проверка, есть ли в сохранённых фильмах movieId
    const isLike = savedMovies.some(i => i.movieId === movieId);
    const classNameRadio = `movies-card__elem_title-button  
    ${isLike && "movies-card__elem_title-button-on"}`

        // Фукция добавления/удаления карточки
    const addOrRemoveMovies = () => {
        if (isLike) {
            removeCard(movieId)
        } else {
            handleAddPlaceSubmit({ country, director, duration, year, description, trailer, thumbnail, movieId, nameRU, nameEN, image })
        }
    }
    
    return (
        <MoviesCard nameRU={nameRU} nameEN={nameEN} trailerLink={trailerLink} alt={nameRU} duration={duration}
            image={image} country={country} created_at={created_at} description={description} director={director}
            updated_at={updated_at} year={year} movieId={movieId} trailer={trailer} thumbnail={thumbnail} >
            <button className={classNameRadio} onClick={addOrRemoveMovies}></button>
        </MoviesCard>
    )
}

export default AllMoviesCard;

