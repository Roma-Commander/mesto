class FormValidator {
  constructor(config, formElement) {
    this._formSelector = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement) {
    const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass)
  }

  _hideInputError(inputElement) {
    const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass)
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid)
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }


  disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass)
    this._buttonElement.setAttribute('disabled', true)
  }

  enableValidation() {
    this._setEventListeners();
  }
}
export { FormValidator };