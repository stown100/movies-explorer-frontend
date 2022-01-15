import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import removeCardIcon from '../../images/removeCardIcon.svg'

const MyMoviesCard = ({description, director, duration, image, movieId, owner, thumbnail, trailerLink, year, _id, onClick }) => {
    // console.log({description, director, duration, image, movieId, owner, thumbnail, trailerLink, year, _id, onClick, link })
    return (
        <MoviesCard onClick={onClick}
        _id={_id} nameRU={description} director={director} duration={duration} image={image} movieId={movieId} owner={owner}
        thumbnail={thumbnail} trailerLink={trailerLink} year={year} >
            <button className="movie-card__elem_img-remove" onClick={onClick}><img src={removeCardIcon} alt="remove"></img></button>
        </MoviesCard>
    )
}

// const MyMoviesCard = ({ country, created_at, description, director, duration, image, nameEN, nameRU, trailerLink, updated_at, year, onClick, movieId, trailer, thumbnail, link }) => {
//     // debugger
//     return (
//         <MoviesCard nameRU={nameRU} nameEN={nameEN} trailerLink={trailerLink} alt={nameRU} duration={duration} link={link}
//         image={image} country={country} created_at={created_at} description={description} director={director}
//         updated_at={updated_at} year={year} movieId={movieId} trailer={trailer} thumbnail={thumbnail} >
//             <button className="movie-card__elem_img-remove" onClick={onClick}><img src={removeCardIcon} alt="remove"></img></button>
//         </MoviesCard>
//     )
// }

export default MyMoviesCard;