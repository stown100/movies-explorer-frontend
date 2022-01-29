import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import MyMoviesCard from '../MyMoviesCard/MyMoviesCard';
import imgInp from '../../images/loupe.svg';


const SavedMovies = ({ setSearch, removeCard, text, textValid, savedMovies, search, setVisibleSaveData, visibleSaveData, preload, setPreload }) => {
    const [onButton, setOnButton] = React.useState(false);
    const [index, setIndex] = React.useState(0);
    const arr = savedMovies.slice(0, 16 + index);

    const filtredMovise = savedMovies.filter((movie) => movie.description.toLowerCase().includes(search.toLowerCase()));
    const shortFilmsArray = [...savedMovies.filter(el => el.duration <= 40)];
    const shortFilmsArrayAndSearch = shortFilmsArray.filter((movie) => movie.description.toLowerCase().includes(search.toLowerCase()));

    const arrLength = filtredMovise.length > 16
        && shortFilmsArray.length !== visibleSaveData.length
        && shortFilmsArrayAndSearch.length !== visibleSaveData.length
        && visibleSaveData.length !== savedMovies.length;

    const classNameButton = `${arrLength && visibleSaveData.length !== 0 ? "even__button" : "even__button_hidden"}`

    // Открыть ещё 4 карточки
    const handlerAddMovies = () => {
        setIndex(index + 4)
        setVisibleSaveData(arr);
    }


    // Радиокнопка Короткометражки
    const shortFilms = () => {
        if (!onButton) {
            if (visibleSaveData.length > 0) {
                if (filtredMovise[0]._id === visibleSaveData[0]._id) {
                    return setVisibleSaveData(shortFilmsArrayAndSearch);
                }
                setVisibleSaveData(shortFilmsArray);
            }
        } else {
            setVisibleSaveData(filtredMovise.slice(0, 16 + index))
        }
    }

    const handlerChange = (e) => {
        setSearch(e.target.value)
        text.onChange(e)
    }

    // Функция поиска сохранённых фильмов
    const handlerSearchClick = (e) => {
        e.preventDefault();
        if (onButton) return search.length !== 0 ? setVisibleSaveData(shortFilmsArrayAndSearch) : setVisibleSaveData(shortFilmsArray);
        search.length !== 0 ? setVisibleSaveData(filtredMovise) : setVisibleSaveData(arr);
    }
    const tests = (shortFilmsArray.length === 0 || filtredMovise.length === 0 || shortFilmsArrayAndSearch.length === 0) && visibleSaveData.length === 0 && savedMovies.length !== 0
    console.log(savedMovies.length)

    const render = visibleSaveData.length !== 0
        ? visibleSaveData.map(({ description, director, duration, image, movieId, owner, thumbnail, trailer, year, _id }) =>
            <MyMoviesCard removeCard={removeCard} key={_id}
                _id={_id} description={description} director={director} duration={duration} image={image} movieId={movieId} owner={owner}
                thumbnail={thumbnail} trailerLink={trailer} year={year} />)
        : <h2 className={tests ? "movies-card__title_active" : "movies-card__title"}>Ничего не найдено</h2>;

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
                {preload && <Preloader />}
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