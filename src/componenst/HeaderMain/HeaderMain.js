import React from 'react';
import { Route, useHistory, Link } from "react-router-dom";
import logo from '../../images/greenlogo.svg'

function HeaderMain() {
    const history = useHistory();
    return (
        <Route>
            <header className="header-main">
                <img className="header-main__logo" src={logo} alt="logo"></img>
                <div className="header-main__authorized">
                    <button className="header-main__authorized_button">
                <Link to="signup" className="header-main__authorized_button-register">Регистрация</Link>
                </button>

                    <button className="header-main__authorized_button">
                <Link to="signin" className="header-main__authorized_button-enter">Войти</Link>
                </button>

                </div>
            </header>
        </Route>
    )
}

export default HeaderMain;