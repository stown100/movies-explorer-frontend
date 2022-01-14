import React from 'react';
import Header from '../Header/Header';
import MyCards from '../MyCards/MyCards';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import MyMoviesCard from '../MyMoviesCard/MyMoviesCard';
import imgInp from '../../images/loupe.svg';


const SavedMovies = ({ saviedMoviesInfo, setSaviedMoviesInfo, filtredMovise, search, setSearch, removeCard, text, textValid, savedMovies }) => {
    const [onButton, setOnButton] = React.useState(false);

    console.log(savedMovies)
    // const [index, setIndex] = React.useState(0);

    // React.useEffect(() => {
    //     const numberOfItems = 16 + (index);

    //     const newArray = [];

    //     for (let i = 0; i < saviedMoviesInfo.length; i++) {
    //         if (i < numberOfItems)
    //             newArray.push(saviedMoviesInfo[i])
    //     }

    //     setSaviedMoviesInfo(newArray);
    // }, [index])

    return (
        <div className="movies">
            <Header />
            <form className="search">
                <div className="search__block">
                <input onChange={e => {
                        setSearch(e.target.value)
                        text.onChange(e)}} onBlur={e => text.onBlur(e)}
                        value={text.value} type="text"
                        className={textValid
                            ? 'search__input_red'
                            : 'search__input'} placeholder="Фильм" required></input>
                    {textValid && <span className="search__input_span">
                        Нужно ввести ключевое слово
                    </span>}
                    <button disabled={!text.inputValid}
                        className={`${textValid ? 'search__block_button-disabled' : 'search__block_button'}`}>
                        <img src={imgInp} alt="search" />
                    </button>
                </div>
            </form>
            <div className="filter-checkbox">
                <button className={`filter-checkbox__button_of ${onButton ? "filter-checkbox__button_on" : "filter-checkbox__button_of"}`} onClick={() => setOnButton(!onButton)}>
                </button>
                <p className="search__slider_text">Короткометражки</p>
            </div>
            <div className="movies-card">
                            {savedMovies.length > 0
                    ? savedMovies.map(({description, director, duration, image, movieId, owner, thumbnail, trailer, year, _id, link }) =>
                        <MyMoviesCard onClick={() => removeCard(movieId)} key={_id}
                        _id={_id} description={description} director={director} duration={duration} image={image} movieId={movieId} owner={owner}
                        thumbnail={thumbnail} trailerLink={trailer} year={year} link={image.url} />)
                    : <Preloader /> }
                    {/* {savedMovies.length > 0
                        ? savedMovies.map(({ country, created_at, description, director, duration, image, nameEN, nameRU, trailerLink, updated_at, year, movieId, trailer, thumbnail }) =>
                            <MyMoviesCard onClick={() => removeCard(movieId)}
                            key={movieId} nameRU={nameRU} nameEN={nameEN} trailerLink={trailerLink} alt={nameRU} duration={duration} link={image.url}
                                image={trailerLink} country={country} created_at={created_at} description={description} director={director}
                                updated_at={updated_at} year={year}
                                movieId={movieId} trailer={trailerLink} thumbnail={trailerLink} />)
                        : <Preloader />
                    } */}
            </div>
            <div className="even">
                <button
                //  onClick={() => setIndex(index + 4)}
                  className="even__button">Ещё</button>
            </div>
            <Footer />
        </div>
    )
}

export default SavedMovies;