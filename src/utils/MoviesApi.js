// 2 запросы к сервису beatfilm-movies

class Api {
    constructor({ url, headers }) {
        this.url = url;
        this.headers = headers;
    }

    getInitialMovies(token) {
        return fetch(`${this.url}/beatfilm-movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // "Authorization": `Bearer ${token}`
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
    url: 'https://api.nomoreparties.co',
})

export default api;