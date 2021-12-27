import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import removeCardIcon from '../../images/removeCardIcon.svg'
import pic1 from '../../images/pic__COLOR_pic.png'
import pic2 from '../../images/pic__COLOR_pic2.png'
import pic3 from '../../images/pic__COLOR_pic3.png'

const MyMoviesCard = (data) => {
    return (
        <MoviesCard name={data.name} link={data.link} alt={data.alt} time={data.time} key={data._id} >
            <button className="movie-card__elem_img-remove" onClick={data.onClick}><img src={removeCardIcon} alt="remove"></img></button>
        </MoviesCard>
    )
}

export default MyMoviesCard;