// 1 описание запросов к нашему Api

class MainApi {
    constructor({ url, headers }) {
        this.url = url;
        this.headers = headers;
    }

    //получаю данные профиля с сервера
    getUserInfo(token) {
        return fetch(`${this.url}/users/me`, {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(this._handleResponse)
    }

    // Изменение данных профиля
    setUserInfo({ email, name }, token) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email,
                name,
            })
        })
            .then(this._handleResponse)
    }

    //добавление фильма в избранное
    addMovie(data, token) {
        return fetch(`${this.url}/movies`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(this._handleResponse)
    }

    // Удаление фильма из избранного
    deleteMovies(movieId, token) {
        return fetch(`${this.url}/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(this._handleResponse)
    }

    // Получаю данные карточек со своего бэкенда
    getSavedMovies(token) {
        return fetch(`${this.url}/movies`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify()
        })
            .then(this._handleResponse)
    }

    _handleResponse = (res) => {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

const mainApi = new MainApi({
    url: 'http://localhost:3000/api',
    //https://myfilms.nomoredomains.rocks/api
})

export default mainApi;