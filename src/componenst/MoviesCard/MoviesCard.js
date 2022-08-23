import React from 'react';
const MoviesCard = ({ duration, image, nameRU, trailerLink, children }) => {
    return (
        <article className="movies-card__elem">
            <a href={trailerLink} target='_blank' rel='noreferrer'>
                <img className="movies-card__elem_img" alt={nameRU} src={image}></img>
            </a>
            <div className="movies-card__elem_title">
                <h6 className="movies-card__elem_title-text">{nameRU}</h6>
                {children}
            </div>
            <p className="movies-card__elem_time">{duration}</p>
        </article>
    )
}

export default MoviesCard;