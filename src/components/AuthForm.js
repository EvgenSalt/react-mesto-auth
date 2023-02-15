import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';

function AuthForm({ authProfile, status }) {

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
    authProfile({
      password: passwordProfile,
      email: emailProfile
    });
    setEmailProfile('');
    setPasswordProfile('');
  }

  return (
    <form className="meet" onSubmit={handleSubmit} name={(status === "signin") ? "meet-form-login" : "meet-form-registration"}>
      <h2 className="meet__heder">{(status === "signin") ? "Вход" : "Регистрация"}</h2>
      <input type="email" name="email" className="meet__input" placeholder="Email" value={`${emailProfile}`} required onChange={handleEmailProfile}></input>
      <input type="password" name="password" className="meet__input" placeholder="Пароль" value={`${passwordProfile}`} required onChange={handlePasswordProfile} autoComplete="off"></input>
      <button className="meet__btn" aria-label="submit" type="submit">{(status === "signin") ? "Войти" : "Зарегистрироваться"}</button>
      {(status === "signup") && <Link to="/signin" className="meet__tologin">Уже зарегистрированы? Войти</Link>}
    </form>
  )
}

export default AuthForm;