import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_show-img ${card && 'popup_show'}`}>
      <div className="popup__container">
        <button aria-label="close" className="popup__close popup__close_show-img" type="button" onClick={onClose}></button>
        <div className="popup__card">
          <img src={card?.link} alt={card?.name} className="popup__img" />
          <h3 className="popup__text">
            {card ? card.name : "Упс..."}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;