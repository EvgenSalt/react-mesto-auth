import Success from '../images/Success.svg';
import Fail from '../images/Fail.svg';
import React from "react";

function InfoTooltip({ isOpen, isSuccess, onClose }) {
  return (
    <div className={`popup popup_show-img ${isOpen && 'popup_show'}`}>
      <div className="popup__container">
        <button aria-label="close" className="popup__close popup__close_show-img" type="button" onClick={onClose}></button>
        <div className="popup__tooltip">
          <img src={isSuccess ? Success : Fail} className="popup__imgtooltip" />
          <h3 className="popup__infotooltip">
            {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;