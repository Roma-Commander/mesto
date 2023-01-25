import { Card } from './Card.js';
import { initialCards } from './cards.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup } from './utils.js'

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
const popupEditName = document.querySelector('#name-input');
const popupEditJob = document.querySelector('#about-me-input');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// popup добавления карточки
const popupAdd = document.querySelector('.popup_type_add');
const popupAddForm = document.querySelector('.popup__form_type_add');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('#place-input');
const popupAddUrl = document.querySelector('#url-input');
// open/close popups
const popups = document.querySelectorAll('.popup')
// Формы
const forms = document.querySelectorAll('.popup__f  orm')
// добавление карточкек 
const cardContainer = document.querySelector('.card-grid');
// создание карточки
function createCard(item) {
  const card = new Card(item, '.template-card_type_default');
  const cardElement = card.generateCard();
  return cardElement;
};
// добавление карточкек из массива
initialCards.forEach((item) => {
  cardContainer.prepend(createCard(item));
});

// добавление новых карточек
const addCard = (e) => {
  e.preventDefault();
  const item = { name: popupAddPlace.value, link: popupAddUrl.value };
  addValidator.disableSubmitButton();
  cardContainer.prepend(createCard(item));
  popupAddForm.reset();
  closePopup(popupAdd);
};

// присвоение значений из попапа в профиль
const submitEditProfile = (e) => {
  e.preventDefault();
  profileName.textContent = popupEditName.value;
  profileJob.textContent = popupEditJob.value;
  editValidator.disableSubmitButton();
  closePopup(popupEdit);
}

// присвоение значений из профиля в popup редактирования
const popupEditValue = (e) => {
  e.preventDefault();
  popupEditName.value = profileName.textContent;
  popupEditJob.value = profileJob.textContent;
  openPopup(popupEdit);
}

// закрытие popup при клике на оверлей или крестик
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

// listeners
popupEditOpenButton.addEventListener('click', popupEditValue);

popupAddOpenButton.addEventListener('click', () => { openPopup(popupAdd) });

popupEditForm.addEventListener('submit', submitEditProfile);

popupAddForm.addEventListener('submit', addCard);

// FormValidator
const editValidator = new FormValidator(validationConfig, popupEditForm);
editValidator.enableValidation();

const addValidator = new FormValidator(validationConfig, popupAddForm);
addValidator.enableValidation();

export { openPopup };