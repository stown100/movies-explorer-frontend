import React from 'react';
const MoviesCard = (data) => {
    return (
        <article className="movies-card__elem">
            <img className="movies-card__elem_img" alt={data.alt} src={data.link} />
            <div className="movies-card__elem_title">
                <h6 className="movies-card__elem_title-text">{data.name}</h6>
                {data.children}
            </div>
            <p className="movies-card__elem_time">{data.time}</p>
        </article>
    )
}

export default MoviesCard;