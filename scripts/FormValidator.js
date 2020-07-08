class FormValidator {
  constructor(form) {
    this._form = form;
    this._button = this._form.querySelector('.popup__button');
  }

  isFormValid() {
    const inputs = this._form.querySelectorAll('.popup__input');
    let valid = false;
  
    inputs.forEach(input => {
      if (this._isFieldValid(input)) valid = true;
    });
  
    return valid;
  }

  setEventListeners(event) {
    const inputs = [...this._form.elements];
    this._isFieldValid(event.target);
    this.checkSumbitButtonState(inputs);
  }

  checkSumbitButtonState(inputs) { // checkSubmitButtonState
    if (inputs.every(this._checkInputValidity)) {
      this._setSubmitButtonState(true);
    } else {
      this._setSubmitButtonState(false);
    }
  }

  _isFieldValid(input) {
    const errorElement = input.parentNode.querySelector(`#${input.id}-error`);
    const valid = this._checkInputValidity(input); 
    errorElement.textContent = input.validationMessage;
    return valid;
  }

  _checkInputValidity(input) {
    input.setCustomValidity('');

    if (input.validity.valueMissing) {
      input.setCustomValidity('Это обязательное поле');
      return false;
    }
  
    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity('Должно быть от 2 до 30 символов');
      return false;
    }
  
    if (input.validity.typeMismatch && input.type === 'url') {
      input.setCustomValidity('Здесь должна быть ссылка');
      return false;
    }
  
    return true;
  }

  _setSubmitButtonState(state) {
    if (state) {
      this._button.removeAttribute('disabled');
    } else {
      this._button.setAttribute('disabled', true);
    }
  }

  resetErrors(input) {
    if (input.type !== 'submit' && input.type !== 'button') {
      const errorElem = input.parentNode.querySelector(`#${input.id}-error`);
      errorElem.textContent = '';
    }
  }
}