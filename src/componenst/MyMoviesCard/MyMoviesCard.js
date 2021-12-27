import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import removeCardIcon from '../../images/removeCardIcon.svg'

const MyMoviesCard = (data) => {
    return (
        <MoviesCard name={data.name} link={data.link} alt={data.alt} time={data.time} key={data._id} >
            <button className="movie-card__elem_img-remove" onClick={data.onClick}><img src={removeCardIcon} alt="remove"></img></button>
        </MoviesCard>
    )
}

export default MyMoviesCard;