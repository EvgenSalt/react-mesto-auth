import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace
}) {
  const imgName = useRef('');
  const imgLink = useRef('');

  useEffect(() => {
    imgName.current.value = '';
  }, [isOpen])

  useEffect(() => {
    imgLink.current.value = '';
  }, [isOpen])
  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({
      name: imgName.current.value,
      link: imgLink.current.value
    })
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      name={'add'}
      title={'Новое место'}
      children={
        <>
          <input type="text" name="name_img" placeholder="Название" className="form__input form__input_text_name-img" defaultValue=''
            required minLength="2" maxLength="30" id="name-img" ref={imgName} />
          <span className="form__msg" id="name-img-error">error</span>
          <input type="url" name="link_img" placeholder="Ссылка на картинку" className="form__input form__input_text_src-img"
            defaultValue='' required id="link-img" ref={imgLink} />
          <span className="form__msg" id="link-img-error">error</span>
        </>}
      btnText={'Создать'}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}
export default AddPlacePopup;