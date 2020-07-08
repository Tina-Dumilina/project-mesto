class CardList {
  constructor(container, api) {
    this._container = container;
    this.api = api;
  }

  addCard(card) {
    this._container.appendChild(card);
  }

  render(createCard, cardTemplate, ownerId, popupImage) {
    this.api.getInitialCards()
      .then(cards => cards.forEach(card => this.addCard(createCard(card, cardTemplate, ownerId, popupImage, this.api))))
      .catch(err => alert(err));
  }
}