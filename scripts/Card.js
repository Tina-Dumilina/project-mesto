export class Card {
  constructor(card, cardTemplate, ownerId, popupImage, api) {
    this._card = card;
    this._cardTemplate = cardTemplate;
    this._ownerId = ownerId;
    this._popupImage = popupImage;
    this._api = api;
  };

  create() {
    this._view = this._cardTemplate.cloneNode(true).firstElementChild;
    this._view.querySelector('.place-card__name').textContent = this._card.name;
    this._view.querySelector('.place-card__image').style.backgroundImage = `url(${this._card.link})`;
    this._view.querySelector('.place-card__counter').textContent = this._card.likes.length;

    this._card.likes.forEach(person => {
      if (person._id === this._ownerId) {
        this._view.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked')
      }
    });

    if (this._card.owner._id !== this._ownerId) {
      this._view.querySelector('.place-card__delete-icon').style.display = "none";
    }

    this._cardId = this._card._id;
    this._setEventListeners();

    return this._view;
  };

  _setEventListeners() {
    this._view.querySelector('.place-card__like-icon').addEventListener('click', this._like);

    this._view.querySelector('.place-card__image')
      .addEventListener('click', this._showPopupImage);

    this._view.querySelector('.place-card__delete-icon')
      .addEventListener('click', this._remove);
  };

  _like = () => {
    if (this._view.querySelector('.place-card__like-icon').classList.contains('place-card__like-icon_liked')) {
      this._api.removeLike(this._cardId)
        .then(card => {
          this._view.querySelector('.place-card__counter').textContent = card.likes.length;
          this._view.querySelector('.place-card__like-icon').classList.remove('place-card__like-icon_liked');
        })
        .catch(err => alert(err));
    } else {
      this._api.addLike(this._cardId)
        .then(card => {
          this._view.querySelector('.place-card__counter').textContent = card.likes.length;
          this._view.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
        })
        .catch(err => alert(err));
    }
  }; 

  _remove = (event) => {
    event.stopPropagation();
    if (confirm('Вы точно хотите удалить карточку?')) {
      this._api.deleteCard(this._cardId)
        .then(() => this._view.remove())
        .catch(err => alert(err));
    }
  }; 

  _showPopupImage = () => {
    this._popupImage.setImageLink(this._card.link);
  }; 
}