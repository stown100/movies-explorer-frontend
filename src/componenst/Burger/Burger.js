import React from 'react';
import { Link } from "react-router-dom";
import Close from '../../images/closeicon.svg'

const Burger = () => {
    const [toggle, setToggle] = React.useState(false);
    const [closes, setCloses] = React.useState(false);
    return (
        <>
            <div className="burger" onClick={() => {
                setToggle(true)
                setCloses(false)
            }}>
                {/* <span className={`span  ${toggle && "span_hidden"} ${closes && "span_hidden"}`}></span> */}
                <span className={toggle ? 'span_hidden' : 'span'}></span>
            </div>
            <div className={`burger__block ${closes && "burger__block_hidden"} ${toggle && "burger__block_visible"}`}>
                <img className="burger__close" src={Close} alt="close" onClick={() => {
                    setCloses(true)
                    setToggle(false)
                }}>
                </img>
                <div className="burger__block_text">
                    <button className="burger__block_text-text"><Link to="/" className="header__link">Главная</Link></button>
                    <button className="burger__block_text-text"><Link to="movies" className="header__link">Фильмы</Link></button>
                    <button className="burger__block_text-text"><Link to="saved-movies" className="header__link">Сохранённые фильмы</Link></button>
                </div>
                <button className="burger__block_button-account header__black_account"><Link to="profile" className="header__link">Аккаунт</Link></button>
            </div>
        </>
    )
}
export default Burger;