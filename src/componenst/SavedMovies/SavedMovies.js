import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import MyMoviesCard from '../MyMoviesCard/MyMoviesCard';
import imgInp from '../../images/loupe.svg';


const SavedMovies = ({ setSearch, removeCard, text, textValid, savedMovies, moviesInfo, setSavedMovies, search, setVisibleSaveData, visibleSaveData }) => {
    const [onButton, setOnButton] = React.useState(false);
    const [index, setIndex] = React.useState(0);
    const arr = savedMovies.slice(0, 16 + index);

    const arrLengthMax = savedMovies.length === visibleSaveData.length;
    const arrLength = savedMovies.length > 16 || !arrLengthMax;
    const classNameButton = `${arrLength ? "even__button" : "even__button_hidden"}` && `${arrLengthMax ? "even__button_hidden" : "even__button"}`

    // Открыть ещё 4 карточки
    const handlerAddMovies = () => {
        setIndex(index + 4)
        setVisibleSaveData(arr);
    }
    
    // Радиокнопка Короткометражки
    const shortFilms = () => {
        if (!onButton) {
            setVisibleSaveData([...savedMovies.filter(el => el.duration <= 40)])
        } else {
            setVisibleSaveData(arr)
        }
    }

    const handlerChange = (e) => {
        setSearch(e.target.value)
        text.onChange(e)
    }

    // Поиск по сохранённым фильма
    const handlerSearchClick = (e) => {
        e.preventDefault()
        const filtredMovise = savedMovies.filter((movie) => {
            return movie.description.toLowerCase().includes(search.toLowerCase());
        })
        if (search.length > 0) {
            setVisibleSaveData(filtredMovise);
        } else {
            setVisibleSaveData(arr);
        }
    }

    const render = visibleSaveData.length > 0
        ? visibleSaveData.map(({ description, director, duration, image, movieId, owner, thumbnail, trailer, year, _id }) =>
            <MyMoviesCard removeCard={removeCard} key={_id}
                _id={_id} description={description} director={director} duration={duration} image={image} movieId={movieId} owner={owner}
                thumbnail={thumbnail} trailerLink={trailer} year={year} />)
        : <Preloader />

    return (
        <div className="movies">
            <Header />
            <form className="search" onSubmit={handlerSearchClick} noValidate>
                <div className="search__block">
                    <input onChange={handlerChange} onBlur={e => text.onBlur(e)}
                        value={text.value} type="text"
                        className={textValid
                            ? 'search__input_red'
                            : 'search__input'} placeholder="Фильм" required></input>
                    {textValid && <span className="search__input_span">
                        Нужно ввести ключевое слово
                    </span>}
                    <button type="submit"
                        className={'search__block_button'}>
                        <img src={imgInp} alt="search" />
                    </button>
                </div>
            </form>
            <div className="filter-checkbox">
                <button className={`filter-checkbox__button_of ${onButton
                    ? "filter-checkbox__button_on"
                    : "filter-checkbox__button_of"}`} onClick={() => {
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
                <button
                    onClick={handlerAddMovies}
                    className={classNameButton}>Ещё</button>
            </div>
            <Footer />
        </div>
    )
}

export default SavedMovies;