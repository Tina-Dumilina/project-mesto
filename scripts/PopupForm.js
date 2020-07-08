class PopupForm extends Popup {
  constructor(popup, formValidator) {
    super(popup);
    this._formValidator = formValidator;
  }

  open() {
    super.open();

    const form = this._popup.querySelector('.popup__form');
    const inputs = form.querySelectorAll('.popup__input');
    [...inputs].forEach(input => this._formValidator.resetErrors(input));
    form.reset();
    this._formValidator.checkSumbitButtonState([...inputs]);
  }
}