import { Popup } from './Popup';
export class PopupImage extends Popup {
  setImageLink(link) {
    this._popup.querySelector('.image-popup__image').setAttribute('src', link);
    this.open();
  }
}