const popupOpenButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const popupForm = document.querySelector('.popup__form')
const popupCloseButton = document.querySelector('.popup__close')
const popupSubmitButton = document.querySelector('.popup__submit')
const popupName = document.querySelector('.popup__item_el_name')
const popupJob = document.querySelector('.popup__item_el_job')
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')

popupOpenButton.addEventListener('click', (e) => {
  e.preventDefault();
  popup.classList.add('popup_opened')
  if (profileName.textContent !== "" && profileJob !== "") {
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
  }
})

function closePopup() {
  popup.classList.remove('popup_opened')
}

popupCloseButton.addEventListener('click', (e) => {
  e.preventDefault();
  closePopup();
})

popupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  closePopup();
})