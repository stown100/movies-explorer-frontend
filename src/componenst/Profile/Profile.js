import React from 'react'
import { Route, Link } from "react-router-dom";
import Header from '../Header/Header';
import UseInput from '../UseInput/UseInput';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = ({ onSignOut, handleUpdateUser, confirm, confirmError, setConfirm, setConfirmError }) => {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    const nameValidation = UseInput('', { isEmpty: true, minLengthError: 2, maxLengthError: 30 });
    const emailValidation = UseInput('', { isEmpty: true, minLengthError: 3, isEmail: true });
    const nameConfigValid = ((nameValidation.isDirty && nameValidation.isEmpty) || (nameValidation.isDirty && nameValidation.minLengthError) || (nameValidation.isDirty && nameValidation.maxLengthError));
    const emailConfigValid = ((emailValidation.isDirty && emailValidation.isEmpty) || (emailValidation.isDirty && emailValidation.minLengthError) || (emailValidation.isDirty && emailValidation.emailError));

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        if (email !== currentUser.email) {
            handleUpdateUser({
                name: nameValidation.value,
                email: emailValidation.value,
            });
        } else {
            setConfirm(false);
            setConfirmError(true);
        }
    }

    return (
        <Route>
            <div className="profile">
                <Header />
                <div className="profile__title">{`Привет ${currentUser.name}`}</div>
                <form className="profile__form" action="#" onSubmit={handleSubmit} noValidate>

                    <div className='profile__form_unit'>
                        <input onChange={e => {
                            setName(e.target.value)
                            nameValidation.onChange(e)
                        }} onBlur={e => nameValidation.onBlur(e)}
                            value={name} type="text"
                            className={nameConfigValid
                                ? "profile__form_input-red" : "profile__form_input"}
                            required>
                        </input>
                        <label className='profile__form_label'>
                            {currentUser.name}
                        </label>
                    </div>
                    {nameConfigValid && <span className="form__input_span">
                        Введите имя от 2 до 30 символов
                    </span>}
                    <div className='profile__form_unit-last'>
                        <input onChange={e => {
                            setEmail(e.target.value)
                            emailValidation.onChange(e)
                        }} onBlur={e => emailValidation.onBlur(e)}
                            value={email} type="email"
                            className={emailConfigValid
                                ? "profile__form_input-red" : "profile__form_input"} required>

                        </input>
                        <label className='profile__form_label'>
                            {currentUser.email}
                        </label>
                    </div>
                    {emailConfigValid && <span className="form__input_span">
                        Введите email адрес.
                    </span>}
                    <div className="profile__form_button-block">
                        {<span className={`${confirm ? "profile__form-confirm_active" : "profile__form-confirm"}`}>Профиль успешно изменён.</span>}
                        {<span className={`${confirmError ? "profile__form-confirm_error" : "profile__form-confirm"}`}>При обновлении профиля произошла ошибка.</span>}
                        <button className={(nameConfigValid || emailConfigValid) ? "profile__form_button-disabled" : "profile__form_button"}
                            disabled={!emailValidation.inputValid || !nameValidation.inputValid}
                        >Редактировать</button>
                    </div>


                    <Link to="/" className="profile__exit" onClick={onSignOut}>Выйти из аккаунта</Link>
                </form>

            </div>
        </Route>
    )
}

export default Profile;