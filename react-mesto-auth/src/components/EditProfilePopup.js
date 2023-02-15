import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser
}) {

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const [nameUser, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleName(event) {
    setName(event.target.value);
  }

  function handleDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name: nameUser,
      about: description
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={'edit'}
      title={'Редактировать профиль'}
      children={
        <>
          <input type="text" name="username" placeholder="name" className="form__input form__input_text_name" value={`${nameUser}`}
            required minLength="2" maxLength="40" id="username" onChange={handleName} />
          <span className="form__msg" id="username-error">error</span>
          <input type="text" name="userwork" placeholder="work" className="form__input form__input_text_work" value={`${description}`}
            required minLength="2" maxLength="200" id="userwork" onChange={handleDescription} />
          <span className="form__msg" id="userwork-error">error</span>
        </>}
      btnText={'Сохранить'}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}
export default EditProfilePopup;