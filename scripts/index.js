const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};
// popup редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditForm = document.querySelector('.popup__form_type_edit');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditCloseButton = document.querySelector('.popup__close_type_edit');
const popupEditSubmitButton = document.querySelector('.popup__submit_type_edit');
const popupEditName = document.querySelector('#name-input');
const popupEditJob = document.querySelector('#about-me-input');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// popup добавления карточки
const popupAdd = document.querySelector('.popup_type_add');
const popupAddForm = document.querySelector('.popup__form_type_add');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = document.querySelector('.popup__close_type_add');
const popupAddSubmitButton = document.querySelector('.popup__submit_type_add');
const popupAddPlace = document.querySelector('#place-input');
const popupAddUrl = document.querySelector('#url-input');
// popup карточки
const popupCardCloseButton = document.querySelector('.popup__close_type_card');
const popupCardCaption = document.querySelector('.popup__caption');
const popupCardUrl = document.querySelector('.popup__image');
const popupCard = document.querySelector('.popup_type_card');
// open/close popups
const popups = document.querySelectorAll('.popup')
// добавление карточкек из массива
const cardContainer = document.querySelector('.card-grid');
const templateCard = document.querySelector('.template-card');
const createCard = (item) => {
  const cardCopy = templateCard.content.querySelector('.card-grid__card').cloneNode(true);
  cardCopy
    .querySelector('.card-grid__image')
    .setAttribute('src', item.link);
  cardCopy
    .querySelector('.card-grid__title')
    .textContent = item.name;
  cardCopy
    .querySelector('.card-grid__delete-button')
    .addEventListener('click', () => {
      cardCopy.remove();
    });
  cardCopy
    .querySelector('.card-grid__like-button')
    .addEventListener('click', (e) => {
      e.target.classList.toggle('card-grid__like-button_active')
    });
  cardCopy
    .querySelector('.card-grid__image')
    .addEventListener('click', (e) => {
      e.preventDefault();
      openPopup(popupCard);
      popupCardUrl.setAttribute('src', item.link);
      popupCardCaption.textContent = item.name;
    });
  return cardCopy;
};

// отрисовка карточек
const renderCard = (item) => {
  cardContainer.prepend(createCard(item))
};

// отрисовка карточек из массива
initialCards.forEach((item) => renderCard(item));

// добавление новых карточек
const addCard = (e) => {
  e.preventDefault();
  const item = { name: popupAddPlace.value, link: popupAddUrl.value };
  renderCard(item);
  popupAddForm.reset();
  closePopup(popupAdd);
};

// присвоение значений из попапа в профиль
const submitEditProfile = (e) => {
  e.preventDefault();
  profileName.textContent = popupEditName.value;
  profileJob.textContent = popupEditJob.value;
  closePopup(popupEdit);
}

// присвоение значений из профиля в popup редактирования
const popupEditValue = (e) => {
  e.preventDefault();
  openPopup(popupEdit);
  popupEditName.value = profileName.textContent;
  popupEditJob.value = profileJob.textContent;
}

// закрывание popup при нажатии esc
const closePopupEscape = (e) => {
  if (e.key === 'Escape') {
    popups.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        closePopup(popup);
      }
    });
  }
}

// open/close popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
};
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupEscape);
};

// listeners
popupEditOpenButton.addEventListener('click', popupEditValue);

popupAddOpenButton.addEventListener('click', () => { openPopup(popupAdd) });

popupEditForm.addEventListener('submit', submitEditProfile);

popupAddForm.addEventListener('submit', addCard);

// закрытие popup при клике на оверлей или крестик
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (e.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

enableValidation(validationConfig); 