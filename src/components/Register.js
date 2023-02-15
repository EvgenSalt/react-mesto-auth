import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';

function Register({ registrationProfile }) {

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
    registrationProfile({
      password: passwordProfile,
      email: emailProfile
    });
  }

  return (
    <form className="meet" onSubmit={handleSubmit} name="meet-form">
      <h2 className="meet__heder">Регистрация</h2>
      <input type="email" className="meet__input" placeholder="Email" required onChange={handleEmailProfile}></input>
      <input type="password" className="meet__input" placeholder="Пароль" required onChange={handlePasswordProfile} autoComplete="off"></input>
      <button className="meet__btn" aria-label="submit" type="submit">Зарегистрироваться</button>
      <Link to="/signin" className="meet__tologin">Уже зарегистрированы? Войти</Link>
    </form>
  )
}

export default Register;