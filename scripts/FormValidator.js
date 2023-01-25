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

  _showInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass)
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass)
  }

  _checkInputValidity(formElement, inputElement, config) {
    if (inputElement.validity.valid) {
      this._hideInputError(formElement, inputElement, config);
    } else {
      this._showInputError(formElement, inputElement, config);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid)
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners(formElement) {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState();
      })
    })
  }

  disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass)
    this._buttonElement.setAttribute('disabled', true)
  }

  enableValidation() {
    this._setEventListeners(this._formSelector);
  }
}
export { FormValidator };