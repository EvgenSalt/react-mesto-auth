import React from "react";

function PopupWithForm({ isOpen, name, title, children, btnText, onClose, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${title} ${isOpen && 'popup_show'}`} >
      <div className="popup__container">
        <button aria-label="close" className={`popup__close popup__close_${name}`} type="button" onClick={onClose}></button>
        <form onSubmit={onSubmit} name="card-form" className={`form form_${name}`} noValidate >
          <h3 className="form__title">
            {title}
          </h3>
          {children}
          <button aria-label="submit" className="form__btn" type="submit">{btnText}</button>
        </form>
      </div>
    </div >
  );
}

export default PopupWithForm;