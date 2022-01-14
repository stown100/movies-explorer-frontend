// 1 описание запросов к нашему Api

class MainApi {
    constructor({ url, headers }) {
        this.url = url;
        this.headers = headers;
    }

    //Редактирование профиля(получаю данные с сервера)
    getUserInfo(token) {
        return fetch(`${this.url}/users/me`, {
            // method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            // headers: this.headers,
        })
            .then(this._handleResponse)
    }

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

    //добавление новой карточки
    addTask(data, token) {
        debugger
        return fetch(`${this.url}/movies`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            // headers: this.headers,
            body: JSON.stringify(data)
        })
            .then(this._handleResponse)
    }

    getSavedMovies(token) {
        return fetch(`${this.url}/movies`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify()
        })
            .then(this._savedMoviesData)
    }

    _savedMoviesData = (res) => {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
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
    url: 'https://myfilms.nomoredomains.rocks/api',
})

export default mainApi;