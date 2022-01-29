import React from "react";
import { useHistory } from "react-router-dom";
import UseInput from "../UseInput/UseInput";
import Form from "../From/Form";

const Register = ({ onRegister }) => {
    const nameValidation = UseInput('', { isEmpty: true, minLengthError: 2, maxLengthError: 30 });
    const emailValidation = UseInput('', { isEmpty: true, minLengthError: 3, isEmail: true });
    const passwordValidation = UseInput('', { isEmpty: true, minLengthError: 2, maxLengthError: 30 });
    const nameConfigValid = ((nameValidation.isDirty && nameValidation.isEmpty) || (nameValidation.isDirty && nameValidation.minLengthError) || (nameValidation.isDirty && nameValidation.maxLengthError));
    const emailConfigValid = ((emailValidation.isDirty && emailValidation.isEmpty) || (emailValidation.isDirty && emailValidation.minLengthError) || (emailValidation.isDirty && emailValidation.emailError));
    const passwordConfigValid = ((passwordValidation.isDirty && passwordValidation.isEmpty) || (passwordValidation.isDirty && passwordValidation.minLengthError) || (passwordValidation.isDirty && passwordValidation.maxLengthError));

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        onRegister({ name, email, password })
            .then(() => history.push('/signin'))
            .then(() => history.push('/movies'))
            .catch((err) => console.log(err))

    }

    React.useEffect(() => {
        if (localStorage.getItem('jwt')) {
            history.push('/movies');
        }
    }, [history]);

    return (
        <Form onSubmit={handleSubmit} title="Добро пожаловать" text="Вы уже зарегистрированны?" link="Войти" to="signin">
            <p className="form__text-input">Имя</p>
            <input
                className={nameConfigValid
                    ? "form__input_red"
                    : "form__input"} required
                name="name"
                type="text"
                value={name}
                onChange={e => {
                    nameValidation.onChange(e)
                    setName(e.target.value)}}
                onBlur={e => nameValidation.onBlur(e)}
            />
            {nameConfigValid && <span className="form__input_span">
                Введите имя от 2 до 30 символов
            </span>}

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
                    setEmail(e.target.value)}}
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
                    setPassword(e.target.value)}}
                    onBlur={e => passwordValidation.onBlur(e)}
            />
            {passwordConfigValid && <span className="form__input_span">
                Введите пароль от 2 до 30 символов
            </span>}

            <button disabled={!emailValidation.inputValid || !passwordValidation.inputValid} type="submit"
                className={(nameConfigValid || emailConfigValid || passwordConfigValid) ? 'form__button_disabled' : 'form__button'}>
                Зарегестрироваться
            </button>
        </Form>
    )
}

export default Register;