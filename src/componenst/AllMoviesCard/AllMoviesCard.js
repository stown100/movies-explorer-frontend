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

const AllMoviesCard = ({ country, created_at, description, director, duration, image, nameEN, nameRU,
    trailerLink, updated_at, year, handleAddPlaceSubmit, movieId, trailer, thumbnail, link, removeCard, _id }) => {
        console.log({ country, created_at, description, director, duration, image, nameEN, nameRU,
            trailerLink, updated_at, year, handleAddPlaceSubmit, movieId, trailer, thumbnail, link, removeCard, _id })
    const [count, setCount] = React.useState(false);

    const addOrRemoveMovies = () => {
        if (count) {
            removeCard(_id)
        } else {
            handleAddPlaceSubmit({ country, director, duration, year, description, trailer, thumbnail, movieId, nameRU, nameEN })
            setCount(!count)
        }
    }

    // Забираем список дел из localStorege
    React.useEffect(() => {
        setCount(JSON.parse(window.localStorage.getItem('count')));
    }, []);

    React.useEffect(() => {
        window.localStorage.setItem('count', count);
    }, [count]);
    return (
        <MoviesCard nameRU={nameRU} nameEN={nameEN} trailerLink={trailerLink} alt={nameRU} duration={duration} link={link}
            image={image} country={country} created_at={created_at} description={description} director={director}
            updated_at={updated_at} year={year} movieId={movieId} trailer={trailer} thumbnail={thumbnail}  >
            <button className={`movies-card__elem_title-button  ${count && "movies-card__elem_title-button-on"}`}
                onClick={() => addOrRemoveMovies()}
            // disabled={(count)}
            ></button>
        </MoviesCard>
    )
}

export default AllMoviesCard;

