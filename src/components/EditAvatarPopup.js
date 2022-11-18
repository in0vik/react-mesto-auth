import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const refAvatarInput = useRef(null);
  function handleSubmit(e) {
      e.preventDefault();
      onUpdateAvatar({
        avatar: refAvatarInput.current.value
      })
  }

  useEffect(() => {
    refAvatarInput.current.value = ''
  }, [isOpen])

  return (
    <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          buttonTitle="Сохранить"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        >
          <input
            className="input popup__avatar-link-input"
            id="update-avatar"
            name="link"
            placeholder="Ссылка на аватар"
            type="url"
            ref={refAvatarInput}
            required
          />
          <span className="popup__error-message popup__error-message_type_update-avatar"></span>
        </PopupWithForm>
  )
}

export default EditAvatarPopup;