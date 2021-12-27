import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

const AllMoviesCard = (data) => {
    const [onButton, setOnButton] = React.useState(false);
    return (
        <MoviesCard name={data.name} link={data.link} alt={data.alt} time={data.time} key={data._id} >
            <button className={`movies-card__elem_title-button  ${onButton ? "movies-card__elem_title-button-on" : "movies-card__elem_title-button"}`} onClick={() => setOnButton(!onButton)}></button>
        </MoviesCard>
    )
}

export default AllMoviesCard;