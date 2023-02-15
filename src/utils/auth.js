class Auth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  registrationProfile(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: data.password,
        email: data.email
      })
    })
      .then((res) => this._getResponseData(res))
  }

  authorizationProfile(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: data.password,
        email: data.email
      })
    })
      .then((res) => this._getResponseData(res))
  }

  validityTokenProfile(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    })
      .then((res) => this._getResponseData(res))
  }

}

export const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co'
});