import { useHistory } from "react-router-dom";
import React from 'react';
import UseInput from "../UseInput/UseInput";
import Form from "../From/Form";

const Login = ({ onLogin }) => {
    const emailValidation = UseInput('', { isEmpty: true, minLengthError: 3, isEmail: true });
    const passwordValidation = UseInput('', { isEmpty: true, minLengthError: 2, maxLengthError: 30 });
    const emailConfigValid = ((emailValidation.isDirty && emailValidation.isEmpty) || (emailValidation.isDirty && emailValidation.minLengthError) || (emailValidation.isDirty && emailValidation.emailError));
    const passwordConfigValid = ((passwordValidation.isDirty && passwordValidation.isEmpty) || (passwordValidation.isDirty && passwordValidation.minLengthError) || (passwordValidation.isDirty && passwordValidation.maxLengthError));
    const history = useHistory();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        return onLogin({ email, password })
            .then(() => history.push('/movies'))
            .catch((err) => console.log(err))
    }

    return (
        <Form onSubmit={handleSubmit} title="Рады видеть!" text="Ещё не зарегестрированы?" link="Регистрация" to="signup">
            <p className="form__text-input">E-mail</p>
            <input
                className={emailConfigValid
                    ? "form__input_red"
                    : "form__input"} required
                name="email"
                type="email"
                value={email}
                onChange={e => {
                    emailValidation.onChange(e)
                    setEmail(e.target.value)
                }}
                onBlur={e => emailValidation.onBlur(e)}
            />
            {emailConfigValid && <span className="form__input_span">
                Введите email адрес.
            </span>}
            <p className="form__text-input">Пароль</p>
            <input
                className={passwordConfigValid
                    ? "form__input_red"
                    : "form__input"} required
                name="password"
                type="password"
                value={password}
                onChange={e => {
                    passwordValidation.onChange(e)
                    setPassword(e.target.value)
                }}
                onBlur={e => passwordValidation.onBlur(e)}
            />
            {passwordConfigValid && <span className="form__input_span">
                Введите пароль от 2 до 30 символов
            </span>}
            <button disabled={!emailValidation.inputValid || !passwordValidation.inputValid} type="submit"
                className={(emailConfigValid || passwordConfigValid) ? 'form__button_disabled' : 'form__button'}>
                Войти
            </button>
        </Form>
    )
}

export default Login;