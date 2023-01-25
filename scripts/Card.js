import { openPopup } from './utils.js';

const popupCard = document.querySelector('.popup_type_card');
const popupCardCaption = document.querySelector('.popup__caption');
const popupCardImage = document.querySelector('.popup__image');

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }


  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card-grid__card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._elementImage = this._element.querySelector('.card-grid__image')

    this._elementImage.setAttribute('src', this._link);
    this._elementImage.setAttribute('alt', this._name);
    this._element.querySelector('.card-grid__title').textContent = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector('.card-grid__delete-button')
      .addEventListener('click', () => {
        this._removeCard();
      });

    this._element
      .querySelector('.card-grid__like-button')
      .addEventListener('click', () => {
        this._likeCard();
      })

    this._element
      .querySelector('.card-grid__image')
      .addEventListener('click', () => {
        this._openPopup();
      })
  }

  _removeCard() {
    this._element.remove();
  }

  _likeCard() {
    this._element
      .querySelector('.card-grid__like-button')
      .classList
      .toggle('card-grid__like-button_active')
  }

  _openPopup() {
    openPopup(popupCard);
    popupCardImage.setAttribute('src', this._link);
    popupCardImage.setAttribute('alt', this._name);
    popupCardCaption.textContent = this._name;
  }
}

export { Card };