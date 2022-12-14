// popup редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditForm = document.querySelector('.popup__form_type_edit');
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupEditCloseButton = document.querySelector('.popup__close_type_edit');
const popupEditSubmitButton = document.querySelector('.popup__submit_type_edit');
const popupEditName = document.querySelector('.popup__item_el_name');
const popupEditJob = document.querySelector('.popup__item_el_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// popup добавления карточки
const popupAdd = document.querySelector('.popup_type_add');
const popupAddForm = document.querySelector('.popup__form_type_add');
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = document.querySelector('.popup__close_type_add');
const popupAddSubmitButton = document.querySelector('.popup__submit_type_add');
const popupAddPlace = document.querySelector('.popup__item_el_place');
const popupAddUrl = document.querySelector('.popup__item_el_url');
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
const cardPlace = document.querySelector('.popup__item_el_place');
const cardUrl = document.querySelector('.popup__item_el_url');
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

// open/close popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
};
function closePopup(popup) {
  popup.classList.remove("popup_opened");
};

// listeners подслушиватели:)
popupEditOpenButton.addEventListener('click', popupEditValue);

popupEditCloseButton.addEventListener('click', () => { closePopup(popupEdit) });

popupAddOpenButton.addEventListener('click', () => { openPopup(popupAdd) });

popupAddCloseButton.addEventListener('click', () => { closePopup(popupAdd) });

popupCardCloseButton.addEventListener('click', () => { closePopup(popupCard) });

popupEditForm.addEventListener('submit', submitEditProfile);

popupAddForm.addEventListener('submit', addCard);