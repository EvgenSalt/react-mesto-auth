import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

import ProtectedRoute from './ProtectedRoute';
import { auth } from "../utils/auth";

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUserProfile()
      .then(res => {
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const [cards, setCard] = useState([]);

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipFail, setIsInInfoTooltipFail] = useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [loggedIn, setLoggedIn] = useState(false);
  const [emailProfile, setEmailProfile] = useState('')


  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.validityTokenProfile(jwt)
        .then(data => {
          if (data) {
            setLoggedIn(true)
            setEmailProfile(data.data.email)
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, []);

  useEffect(() => {
    Promise.all([api.getInitialCards()])
      .then(([initialCards]) => {
        setCard(initialCards);
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInInfoTooltipFail(false);
  }

  function handleCardClick(props) {
    setSelectedCard(props);
  }

  function handleLogin(dataProfile) {
    auth.authorizationProfile(dataProfile)
      .then(data => {
        if (data.token) {
          setLoggedIn(true);
          setEmailProfile(dataProfile.email)
          history.push('/');
          localStorage.setItem('jwt', data.token);
        }
      })
      .catch(err => {
        setIsInInfoTooltipFail(true);
        setIsInfoTooltipSuccess(false);
        console.log(err)
      })
  }

  function handleRegistration(dataProfile) {
    auth.registrationProfile(dataProfile)
      .then(data => {
        if (data) {
          setIsInfoTooltipSuccess(true);
          history.push('/signin');
        }
      })
      .catch(err => {
        setIsInfoTooltipSuccess(false);
        console.log(err)
      })
      .finally(() => setIsInInfoTooltipFail(true));
  }

  function handleOutProfile() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmailProfile('')
    history.push('/sign-in');
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCard((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCard(cards.filter(item => item._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(user) {
    api.editProfile(user)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(avatar) {
    api.editAvatarProfile(avatar)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
      .then(res => {
        setCard([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          outProfile={handleOutProfile}
          emailProfile={emailProfile}
        />
        <Switch>
          <ProtectedRoute path="/" exact
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} />
          <Route path="/signup">
            <Register registrationProfile={handleRegistration} />
          </Route>
          <Route path="/signin">
            <Login loginProfile={handleLogin} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Footer />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
          isOpen={false}//TO DO
          name={'delet-img'}
          title={'Вы уверены?'}
          btnText={'Да'}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipFail}
          isSuccess={isInfoTooltipSuccess}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
