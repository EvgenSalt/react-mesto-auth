class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then((res) => this._getResponseData(res))
  }

  getUserProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then((res) => this._getResponseData(res))
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then((res) => this._getResponseData(res))
  }

  editAvatarProfile(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then((res) => this._getResponseData(res))
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => this._getResponseData(res))
  }

  deleteCard(card_id) {
    return fetch(`${this._baseUrl}/cards/${card_id}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then((res) => this._getResponseData(res))
  }

  addLike(card_id) {
    return fetch(`${this._baseUrl}/cards/likes/${card_id}`, {
      method: "PUT",
      headers: this._headers
    })
      .then((res) => this._getResponseData(res))
  }

  deleteLike(card_id) {
    return fetch(`${this._baseUrl}/cards/${card_id}/likes`, {
      method: "DELETE",
      headers: this._headers
    })
      .then((res) => this._getResponseData(res))
  }

  changeLikeCardStatus(card_id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${card_id}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: this._headers
    })
      .then((res) => this._getResponseData(res))
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: 'ebbf4de8-113f-4170-86f1-c0542b4c5864',
    'Content-Type': 'application/json'
  }
});