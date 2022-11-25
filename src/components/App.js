import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeleteCardPopup from "./ConfirmDeleteCardPopup";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Switch, useHistory } from 'react-router-dom';
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import { tooltipContents } from "./tooltipContent";
import AuthForm from "./AuthForm";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [tooltipContent, setTooltipContent] = useState({});
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  const history = useHistory();

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    checkToken()
  }, [])

  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleUpdateUser(userData) {
    setLoading(true);
    api
      .updateUserInfo(userData)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setLoading(true);
    api
      .updateAvatar(avatar)
      .then(() => {
        closeAllPopups();
        setCurrentUser({ ...currentUser, avatar: avatar });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setConfirmPopupOpen(true);
    setSelectedCard(card);
  }

  function onSubmitDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handlePlaceAddSubmit(newCard) {
    setLoading(true);
    api
      .addNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setConfirmPopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard({});
  };

  function handleRegistrationSubmiit({email, password}) {
    auth.register(email, password)
    .then((res) => {
      if (res) {
        setTooltipContent(tooltipContents.success)
        setInfoTooltipPopupOpen(true);
      } else {
        setTooltipContent(tooltipContents.error)
        setInfoTooltipPopupOpen(true);
      }
    })
    .catch(err => {
      if (err.status === 401) {
       setTooltipContent(tooltipContents.invalidDataError)
       setInfoTooltipPopupOpen(true);
      }
   })
    ;
  }

  function handleLoginSubmiit({ email, password }) {
    auth.login(email, password)
    .then((res) => {
      if (res) {
        localStorage.setItem('jwt', res.token);
        setCurrentUserEmail(email);
        setLoggedIn(true);
        history.push("/");
      } else {
        setTooltipContent(tooltipContents.error)
        setInfoTooltipPopupOpen(true);
      }
    })
    .catch(err => {
       if (err.status === 401) {
        setTooltipContent(tooltipContents.invalidDataError)
        setInfoTooltipPopupOpen(true);
       }
    })
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getAuthData(jwt)
        .then((res) => {
          setCurrentUserEmail(res.data.email);
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  }

  function loggedOut() {
    localStorage.removeItem('jwt');
    history.push('/sign-in')
    setLoggedIn(false);
    setCurrentUserEmail('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header currentUserEmail={currentUserEmail} loggedIn={loggedIn} loggedOut={loggedOut} />
        <Switch>
          <Route path='/sign-in'>
            <AuthForm type='login' onSubmition={handleLoginSubmiit} />
          </Route>
          <Route path='/sign-up'>
            <AuthForm type='register' onSubmition={handleRegistrationSubmiit} />
          </Route>
          <Route path='/sign-up' />
          <ProtectedRoute 
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>
        <Footer />
        <EditProfilePopup
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handlePlaceAddSubmit}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <ConfirmDeleteCardPopup
          onClose={closeAllPopups}
          isOpen={isConfirmPopupOpen}
          onSubmit={onSubmitDelete}
          selectedCard={selectedCard}
        />
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} tooltipContent={tooltipContent}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
