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
            setPreload(true);
            if (!onButton) {
                if (shortFilmsArray.length > 0 && visibleSaveData.length > 0) {
                    setVisibleSaveData(shortFilmsArray);
                    setPreload(false)
                }
                if (search.length !== 0) {
                    setVisibleSaveData(shortFilmsArrayAndSearch)
                }
            } else {
                setVisibleSaveData(filtredMovise.slice(0, 16 + index))
                setPreload(false)
            }
        }

    const handlerChange = (e) => {
        setSearch(e.target.value)
        text.onChange(e)
    }

        // Функция поиска фильмов
        const handlerSearchClick = (e) => {
            e.preventDefault();
            setPreload(true); // Показываю прелоадер
            if (onButton) {
                if (search.length !== 0) {
                    setVisibleSaveData(shortFilmsArrayAndSearch)
                    setPreload(false); // Скрываю
                } else {
                    setVisibleSaveData(shortFilmsArray)
                    setPreload(false); // Скрываю
                }
            }
            if (!onButton) {
                if (search.length !== 0) {
                    setVisibleSaveData(filtredMovise)
                    setPreload(false); // Скрываю
                } else {
                    setVisibleSaveData(arr);
                    setPreload(false); // Скрываю
                }
            }
        }

    const tests = (shortFilmsArray.length === 0 || filtredMovise.length === 0 || shortFilmsArrayAndSearch.length === 0) && visibleSaveData.length === 0 && savedMovies.length !== 0

    const render = visibleSaveData.length !== 0
        ? visibleSaveData.map(({ description, director, duration, image, movieId, owner, thumbnail, trailer, year, _id }) =>
            <MyMoviesCard removeCard={removeCard} key={_id}
                _id={_id} description={description} director={director} duration={duration} image={image} movieId={movieId} owner={owner}
                thumbnail={thumbnail} trailerLink={trailer} year={year} />)
        : <h2 className={tests ? "movies-card__title_active" : "movies-card__title"}>Ничего не найдено</h2>;

    return (
        <main className="movies">
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
        </main>
    )
}

export default SavedMovies;