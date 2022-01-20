import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import removeCardIcon from '../../images/removeCardIcon.svg'

const MyMoviesCard = ({description, director, duration, image, movieId, owner, thumbnail, trailerLink, year, _id, removeCard }) => {
    const handleDeleteMovie = () => removeCard(movieId)
    return (
        <MoviesCard
        _id={_id} nameRU={description} director={director} duration={duration} image={image} movieId={movieId} owner={owner}
        thumbnail={thumbnail} trailerLink={trailerLink} year={year} >
            <button className="movie-card__elem_img-remove" type="button" onClick={handleDeleteMovie}><img src={removeCardIcon} alt="remove"></img></button>
        </MoviesCard>
    )
}

export default MyMoviesCard;