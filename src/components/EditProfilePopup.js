import React, { useEffect, useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [ username, setUsername ] = useState('');
  const [ description, setDescription ] = useState('');
  const currentUser = useContext(CurrentUserContext);

  function handleOnChangeUsername(e) {
    setUsername(e.target.value);
  }

  function handleOnChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: username,
      about: description
    })

  }

  useEffect(() => {
    setUsername(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  return (
    <PopupWithForm
    name="profile"
    title="Редактировать профиль"
    buttonTitle="Сохранить"
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    isLoading={isLoading}
  >
    <input
      value={username || ''}
      onChange={handleOnChangeUsername}
      className="input popup__profile-name-input"
      name="username"
      id="profile-name"
      placeholder="Имя"
      type="text"
      minLength="2"
      maxLength="40"
      required
    />
    <span className="popup__error-message popup__error-message_type_profile-name"></span>
    <input
      value={description || ''}
      onChange={handleOnChangeDescription}
      className="input popup__profile-job-input"
      name="job"
      id="profile-job"
      placeholder="О себе"
      type="text"
      minLength="2"
      maxLength="200"
      required
    />
    <span className="popup__error-message popup__error-message_type_profile-job"></span>
  </PopupWithForm>  )
}

export default EditProfilePopup;