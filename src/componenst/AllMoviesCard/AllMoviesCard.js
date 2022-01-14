// import React from 'react';
// import MoviesCard from '../MoviesCard/MoviesCard';

// const AllMoviesCard = ({ country, created_at, description, director, duration, image, nameEN, nameRU, trailerLink, updated_at, year, handleAddPlaceSubmit, moviedId, trailer, thumbnail }) => {
//     const [onButton, setOnButton] = React.useState(false);
//     return (
//         <MoviesCard key={image.id} nameRU={nameRU} nameEN={nameEN} trailerLink={trailerLink} alt={nameRU} duration={duration}
//             image={image} country={country} created_at={created_at} description={description} director={director}
//             updated_at={updated_at} year={year} moviedId={moviedId} trailer={trailer} thumbnail={thumbnail}  >
//             <button className={`movies-card__elem_title-button  ${onButton ? "movies-card__elem_title-button-on" : "movies-card__elem_title-button"}`}
//                 onClick={() => {
//                     handleAddPlaceSubmit({ country, director, duration, year, description, image, trailer, thumbnail, moviedId, nameRU, nameEN })
//                         //  debugger
//                     setOnButton(!onButton)
//                 }}></button>
//         </MoviesCard>
//     )
// }

// export default AllMoviesCard;

import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

const AllMoviesCard = ({ country, created_at, description, director, duration, image, nameEN, nameRU, trailerLink, updated_at, year, handleAddPlaceSubmit, movieId, trailer, thumbnail, link }) => {
    const [onButton, setOnButton] = React.useState(false);
    return (
        <MoviesCard nameRU={nameRU} nameEN={nameEN} trailerLink={trailerLink} alt={nameRU} duration={duration} link={link}
            image={image} country={country} created_at={created_at} description={description} director={director}
            updated_at={updated_at} year={year} movieId={movieId} trailer={trailer} thumbnail={thumbnail}  >
            <button className={`movies-card__elem_title-button  ${onButton ? "movies-card__elem_title-button-on" : "movies-card__elem_title-button"}`}
                onClick={() => {
                    handleAddPlaceSubmit({ country, director, duration, year, description, link, trailer, thumbnail, movieId, nameRU, nameEN })
                        //  debugger
                    setOnButton(!onButton)
                }}></button>
        </MoviesCard>
    )
}

export default AllMoviesCard;

