// 2 запросы к сервису beatfilm-movies

class Api {
    constructor({ url, headers }) {
        this.url = url;
        this.headers = headers;
    }

    getInitialMovies(token) {
        return fetch(`${this.url}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
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

const api = new Api({
    url: 'https://api.nomoreparties.co/beatfilm-movies',
})

export default api;