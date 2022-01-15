import React from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Preloader from '../Preloader/Preloader'
import AllMoviesCard from '../AllMoviesCard/AllMoviesCard';
import imgInp from '../../images/loupe.svg';

function Movies({ moviesInfo, handleAddPlaceSubmit, visibleData, setVisibleData, search, setSearch, text, textValid, removeCard }) {
    const [onButton, setOnButton] = React.useState(false);
    const [index, setIndex] = React.useState(0);
    const arr = moviesInfo.slice(0, 16 + index)

    // Открыть ещё 4 карточки
    const handlerAddMovies = () => {
        setIndex(index + 4)
        setVisibleData(arr);
    }

    // Радиокнопка Короткометражки
    const shortFilms = () => {
        if (!onButton) {
            setVisibleData([...moviesInfo.filter(el => el.duration <= 40)])
        } else {
            setVisibleData(arr)
        }
    }

    const handlerChange = (e) => {
        setSearch(e.target.value)
        text.onChange(e)
    }

    const handlerSearchClick = (e) => {
        const filtredMovise = moviesInfo.filter((movie) => {
            return movie.nameRU.toLowerCase().includes(search.toLowerCase());
        })
        setVisibleData(filtredMovise);
    }

    return (
        <main className="movies">
            <Header />
            <form className="search">
                <div className="search__block">
                    <input onChange={handlerChange} onBlur={e => text.onBlur(e)}
                        value={text.value} type="text"
                        className={textValid
                            ? 'search__input_red'
                            : 'search__input'} placeholder="Фильм" required></input>
                    {textValid && <span className="search__input_span">
                        Нужно ввести ключевое слово
                    </span>}
                    <button disabled={!text.inputValid} type="button" onClick={handlerSearchClick}
                        className={`${textValid ? 'search__block_button-disabled' : 'search__block_button'}`}>
                        <img src={imgInp} alt="search" />
                    </button>
                </div>
            </form>
            <div className="filter-checkbox">
                <button
                    className={`filter-checkbox__button_of ${onButton && "filter-checkbox__button_on"}`}
                    onClick={() => {
                        shortFilms()
                        setOnButton(!onButton)
                    }}>
                </button>
                <p className="search__slider_text">Короткометражки</p>
            </div>
            <div className="movies-card">
                {visibleData.length > 0
                    ? visibleData.map(({ country, created_at, description, director, duration, image, nameEN, nameRU, trailerLink, updated_at, year, id, trailer, thumbnail }) =>
                        <AllMoviesCard key={id} nameRU={nameRU} nameEN={nameEN} trailerLink={trailerLink} alt={nameRU} duration={duration}
                            image={`https://api.nomoreparties.co${image.url}`} country={country} created_at={created_at} description={description} director={director}
                            updated_at={updated_at} year={year} handleAddPlaceSubmit={handleAddPlaceSubmit} _id={id}
                            movieId={id} trailer={trailerLink} thumbnail={trailerLink} removeCard={removeCard} />)
                    : <Preloader />}
            </div>
            <div className="even">
                <button onClick={handlerAddMovies} className="even__button">Ещё</button>
            </div>
            <Footer />
        </main>
    )
}

export default Movies;