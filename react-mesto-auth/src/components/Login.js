import React from 'react';
import { useState } from "react";

function Login({ loginProfile }) {

  const [emailProfile, setEmailProfile] = useState('');
  const [passwordProfile, setPasswordProfile] = useState('');

  function handleEmailProfile(event) {
    setEmailProfile(event.target.value);
  }

  function handlePasswordProfile(event) {
    setPasswordProfile(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    loginProfile({
      password: passwordProfile,
      email: emailProfile
    });
  }

  return (
    <form className="meet" onSubmit={handleSubmit} name="meet-form">
      <h2 className="meet__heder">Вход</h2>
      <input type="email" name="email" className="meet__input" placeholder="Email" required onChange={handleEmailProfile}></input>
      <input type="password" name="password" className="meet__input" placeholder="Пароль" required onChange={handlePasswordProfile} autoComplete="off"></input>
      <button className="meet__btn" aria-label="submit" type="submit">Войти</button>
    </form>
  )
}

export default Login;