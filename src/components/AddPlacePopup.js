import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

  const refNameInput = useRef(null);
  const refLinkInput = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: refNameInput.current.value,
      link: refLinkInput.current.value
    })
  }

  useEffect(() => {
    refNameInput.current.value = '';
    refLinkInput.current.value = '';
  }, [isOpen])

  return (
    <PopupWithForm
          name="place"
          title="Новое место"
          buttonTitle="Создать"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        >
          <input
            className="input popup__place-name-input"
            ref={refNameInput}
            name="placename"
            id="place-name"
            placeholder="Название"
            type="text"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="popup__error-message popup__error-message_type_place-name"></span>
          <input
            className="input popup__place-link-input"
            ref={refLinkInput}
            id="place-link"
            name="link"
            placeholder="Ссылка на картинку"
            type="url"
            required
          />
          <span className="popup__error-message popup__error-message_type_place-link"></span>
        </PopupWithForm>
  )
}

export default AddPlacePopup;