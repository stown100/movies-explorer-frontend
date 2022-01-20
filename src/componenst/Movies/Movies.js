import React from 'react';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Preloader from '../Preloader/Preloader'
import AllMoviesCard from '../AllMoviesCard/AllMoviesCard';
import imgInp from '../../images/loupe.svg';


function Movies({ moviesInfo, handleAddPlaceSubmit, visibleData, setVisibleData, search, setSearch, text, textValid, removeCard, savedMovies }) {
    const [onButton, setOnButton] = React.useState(false);
    const [index, setIndex] = React.useState(0);
    const arr = moviesInfo.slice(0, 16 + index)

    const arrLengthMax = moviesInfo.length === visibleData.length;
    const arrLength = moviesInfo.length > 16 || !arrLengthMax;
    const classNameButton = `${arrLength ? "even__button" : "even__button_hidden"}` && `${arrLengthMax ? "even__button_hidden" : "even__button"}`
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
        e.preventDefault()
        const filtredMovise = moviesInfo.filter((movie) => {
            return movie.nameRU.toLowerCase().includes(search.toLowerCase());
        })
        if (search.length !== 0) {
            setVisibleData(filtredMovise);
        } else {
            setVisibleData(arr);
        }
    }

    const render = visibleData.length !== 0
        ? visibleData.map(({ country, created_at, description, director, duration, image, nameEN, nameRU, trailerLink, updated_at, year, id }) =>
            <AllMoviesCard key={id} nameRU={nameRU} nameEN={nameEN} trailerLink={trailerLink} alt={nameRU} duration={duration}
                image={`https://api.nomoreparties.co${image.url}`} country={country} created_at={created_at} description={description} director={director}
                updated_at={updated_at} year={year} handleAddPlaceSubmit={handleAddPlaceSubmit}
                movieId={id} trailer={trailerLink} thumbnail={trailerLink} removeCard={removeCard} savedMovies={savedMovies} />)
        : <Preloader />;

    return (
        <main className="movies">
            <Header />
            <form className="search" onSubmit={handlerSearchClick} noValidate>
                <div className="search__block">
                    <input onChange={handlerChange} onBlur={e => text.onBlur(e)}
                        value={text.value} type="text"
                        className={textValid
                            ? 'search__input_red'
                            : 'search__input'} placeholder="Фильм"></input>
                    {textValid && <span className="search__input_span">
                        Нужно ввести ключевое слово
                    </span>}
                    <button
                        // disabled={!text.inputValid} 
                        type="submit"
                        className={
                            // `${textValid 
                            // ? 'search__block_button-disabled' :
                            'search__block_button'
                            // }`
                        }>
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
                {render}
            </div>
            <div className="even">
                <button onClick={handlerAddMovies} className={classNameButton}>Ещё</button>
            </div>
            <Footer />
        </main>
    )
}

export default Movies;