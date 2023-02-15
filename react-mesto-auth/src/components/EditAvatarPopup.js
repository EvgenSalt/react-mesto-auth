import React from "react";
import { useRef } from "react";
import { useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar
}) {

  const userAvatar = useRef('');
  useEffect(() => {
    userAvatar.current.value = '';
  }, [isOpen])

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({
      avatar: userAvatar.current.value
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={'avatar-edit'}
      title={'Обновить аватар'}
      children={
        <>
          <input type="url" name="link_img" placeholder="Ссылка на картинку" className="form__input form__input_text_src-img" defaultValue="" required id="link-avatar" ref={userAvatar} />
          <span className="form__msg" id="link-avatar-error">error</span>
        </>}
      btnText={'Сохранить'}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default EditAvatarPopup;