import { Route } from 'react-router-dom';
import ErrorHandler from '../componenst/ErrorHandler/ErrorHandler';


export const BASE_URL = 'https://myfilms.nomoredomains.rocks/api';

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (name, email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password }),
    })
        .then(handleResponse)
          .then((res) => {
            return res;
          })
        .catch((err) => {
            <Route path="/error">
              <ErrorHandler err={err} />
            </Route>
        });
};


export const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(handleResponse)
        .then((data) => {
            if (data) {
                localStorage.setItem('jwt', data.jwt);
                return data;
            } else {
                return;
            }
        })
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
        .then(handleResponse)
        .then(data => data)
}