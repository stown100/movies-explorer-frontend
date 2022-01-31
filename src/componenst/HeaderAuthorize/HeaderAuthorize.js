import { Route, Link } from "react-router-dom";
import logo from '../../images/greenlogo.svg'
import Burger from '../Burger/Burger';

function HeaderAuthorize() {
    return (
        <Route>
            <header className="header_authorize">
                <Link to="/" className="header__logo">
                    <img className="header__logo" src={logo} alt="logo"></img>
                </Link>
                <div className="header__film">
                    <button className="header__films_authorize"><Link to="movies" className="header__link">Фильмы</Link></button>
                    <button className="header__save-films_authorize"><Link to="saved-movies" className="header__link">Сохранённые фильмы</Link></button>
                    <button className="header__account_authorize"><Link to="profile" className="header__link">Аккаунт</Link></button>
                </div>
                <Burger />
            </header>
        </Route>
    )
}

export default HeaderAuthorize;