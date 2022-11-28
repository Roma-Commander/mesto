let popupOpenButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let popupCloseButton = document.querySelector('.popup__close')
let popupSubmitButton = document.querySelector('.popup__submit')
let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__job')
let popupName = document.querySelector('.popup__item_el_name')
let popupJob = document.querySelector('.popup__item_el_job')

popupOpenButton.addEventListener('click', (e) => {
  e.preventDefault();
  popup.classList.add('popup__opened')
  if (profileName.textContent !== "") {
    popupName.value = profileName.textContent;
  }
  if (profileJob !== "") {
    popupJob.value = profileJob.textContent;
  }
})

popupCloseButton.addEventListener('click', (e) => {
  e.preventDefault();
  popup.classList.remove('popup__opened')
})

popupSubmitButton.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.profile__name').textContent = popupName.value;
  document.querySelector('.profile__job').textContent = popupJob.value;
  popup.classList.remove('popup__opened')
})