class PopupImage extends Popup {
  /**
   * Можно лучше:
   * Удалить конструктор, тогда будет автоматически вызываться конструктор родительского класса.
   */
  constructor(popup) {
    super(popup);
  }

  setImageLink(link) {
    this._popup.querySelector('.image-popup__image').setAttribute('src', link);
    this.open();
  }
}