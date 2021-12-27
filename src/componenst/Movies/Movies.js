import React from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader'
import AllMoviesCard from '../AllMoviesCard/AllMoviesCard';
function Movies() {
    const [onButton, setOnButton] = React.useState(false);
    return (
        <main className="movies">
            <Header />
            <form className="search">
                <input className="search__input" placeholder="Фильм" required></input>
            </form>
            <div className="filter-checkbox">
                <button className={`filter-checkbox__button_of ${onButton ? "filter-checkbox__button_on" : "filter-checkbox__button_of"}`} onClick={() => setOnButton(!onButton)}>
                </button>
                <p className="search__slider_text">Короткометражки</p>
            </div>
            <div className="movies-card">
                {MoviesCardList
                    ? MoviesCardList.map((data) =>
                        <AllMoviesCard name={data.name} link={data.link} alt={data.alt} time={data.time} key={data._id} />)
                    : <Preloader />}
            </div>
            <div className="even">
                <button className="even__button">Ещё</button>
            </div>
            <Footer />
        </main>
    )
}

export default Movies;