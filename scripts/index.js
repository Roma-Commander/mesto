import { Card } from './Card.js';
import { initialCards } from './cards.js';
import { FormValidator } from './FormValidator.js';

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
// добавление карточкек из массива
initialCards.forEach((item) => {
  const card = new Card(item, '.template-card_type_default');
  const cardElement = card.generateCard();
  cardContainer.prepend(cardElement);
});

// добавление новых карточек
const addCard = (e) => {
  e.preventDefault();
  const item = { name: popupAddPlace.value, link: popupAddUrl.value };
  const card = new Card(item, '.template-card_type_default');
  const cardElement = card.generateCard();
  cardContainer.prepend(cardElement);
  popupAddForm.reset();
  e.submitter.classList.add('popup__submit_inactive')
  e.submitter.setAttribute('disabled', true)
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
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

// open/close popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
};
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupEscape);
};

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