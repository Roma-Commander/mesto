//popupEdit-------------------------------------------------------
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupEditForm = document.querySelector('.popup__form');
const popupCloseButton = document.querySelector('.popup__close');
const popupSubmitButton = document.querySelector('.popup__submit');
const popupEditName = document.querySelector('.popup__item_el_name');
const popupEditJob = document.querySelector('.popup__item_el_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

popupEditOpenButton.addEventListener('click', (e) => {
  e.preventDefault();
  popup.classList.add('popup_opened')
  if (profileName.textContent !== "" && profileJob !== "") {
    popupEditName.value = profileName.textContent;
    popupEditJob.value = profileJob.textContent;
  }
});

function closePopup() {
  popup.classList.remove('popup_opened')
};

popupCloseButton.addEventListener('click', (e) => {
  e.preventDefault();
  closePopup();
});

popupEditForm.addEventListener('submit', (e) => {
  e.preventDefault();
  profileName.textContent = popupEditName.value;
  profileJob.textContent = popupEditJob.value;
  closePopup();
});

//popupAdd-----------------------------------------------------------
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup-add');
const popupAddForm = document.querySelector('.popup-add__form');
const cardPlace = document.querySelector('.popup__item_el_place');
const cardUrl = document.querySelector('.popup__item_el_url');
const popupAddPlace = document.querySelector('.popup-add__item_el_place');
const popupAddUrl = document.querySelector('.popup-add__item_el_url');
const popupAddCloseButton = document.querySelector('.popup-add__close');
const popupAddSubmitButton = document.querySelector('.popup-add__submit');

popupAddOpenButton.addEventListener('click', (e) => {
  e.preventDefault();
  popupAdd.classList.add('popup-add_opened')
});

function closePopupAdd() {
  popupAdd.classList.remove('popup-add_opened')
};

popupAddCloseButton.addEventListener('click', (e) => {
  e.preventDefault();
  closePopupAdd();
});

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const cardContainer = document.querySelector('.card-grid');
const templateCard = document.querySelector('.template-card');
const popupCardCloseButton = document.querySelector('.popup-card__close-button')
const createCard = (item) => {
  const cardCopy = templateCard.content.querySelector('.card-grid__card').cloneNode(true);
  const cardImageUrl = cardCopy.querySelector('.card-grid__image').setAttribute('src', item.link);
  const cardTitle = cardCopy.querySelector('.card-grid__title').textContent = item.name;

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

  const popupCard = document.querySelector('.popup-card')

  cardCopy
    .querySelector('.card-grid__image')
    .addEventListener('click', (e) => {
      e.preventDefault();
      popupCard.classList.add('popup-card_opened');
      const popupCardUrl = document.querySelector('.popup-card__image').setAttribute('src', item.link);
      const popupCardCaption = document.querySelector('.popup-card__caption').textContent = item.name;
    });
  return cardCopy;
}

const renderCard = (item) => {
  cardContainer.prepend(createCard(item))
}

cardContainer.prepend(...initialCards.map((item) => {
  return createCard(item);
}))

const addCard = (e) => {
  e.preventDefault();
  const item = { name: popupAddPlace.value, link: popupAddUrl.value };
  initialCards.push(item);
  renderCard(item);
  popupAddPlace.value = '';
  popupAddUrl.value = '';
  closePopupAdd();
}

const closePopupCard = () => {
  document.querySelector('.popup-card').classList.remove('popup-card_opened');
}

popupAddForm.addEventListener('submit', addCard);
popupCardCloseButton.addEventListener('click', closePopupCard);