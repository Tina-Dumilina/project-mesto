import '../pages/index.css';

import {Api} from './Api';
import {Card} from './Card';
import {CardList} from './CardList';
import {FormValidator} from './FormValidator';
import {PopupForm} from './PopupForm';
import {PopupImage} from './PopupImage';
import {UserInfo} from './UserInfo';

//DOM-элементы
const addPlaceButton = document.querySelector('.user-info__button_add');
const cardTemplate = document.querySelector('#place-card').content;
const editProfileButton = document.querySelector('.user-info__button_edit');
const userPhotoElement = document.querySelector('.user-info__photo');
const formAddPlace = document.forms.place;
const formEditProfile = document.forms.profile;
const formChangeAvatar = document.forms.avatar;

const usernameElem = document.querySelector('.user-info__name');
const userJobElem = document.querySelector('.user-info__job');
const userAvatarElem = document.querySelector('.user-info__photo');
const usernameInput = formEditProfile.elements.userName; 
const userJobInput = formEditProfile.elements.userJob;

//Функции-хэлперы
const createCard = (...arg) => new Card(...arg).create();

//Инстансы
const api = new Api({
  baseUrl: 'https://praktikum.tk/cohort11',
  headers: {
    authorization: 'e16df6eb-48db-4658-b78e-44a0f91e14de',
    'Content-Type': 'application/json'
  }
});

const addPlaceFormValidator = new FormValidator(formAddPlace);
const editProfileFormValidator = new FormValidator(formEditProfile);
const changeAvatarFormValidator = new FormValidator(formChangeAvatar);

const popupImage = new PopupImage(document.querySelector('.popup_type_image'));

const addPlacePopup = new PopupForm(document.querySelector('.popup_type_place'), addPlaceFormValidator);

const editProfilePopup = new PopupForm(document.querySelector('.popup_type_profile'), editProfileFormValidator);

const changeAvatarPopup = new PopupForm(document.querySelector('.popup_type_avatar'), changeAvatarFormValidator);

const cardList = new CardList(document.querySelector('.places-list'), api);

const userInfo = new UserInfo(usernameElem, userJobElem, userAvatarElem, usernameInput, userJobInput);

userInfo.setUserInfo(api.setUserInfo())
  .then(ownerId => cardList.render(createCard, cardTemplate, ownerId, popupImage))
  .catch((err) => {
      console.log(err); 
  });

//Добавление карточки
formAddPlace.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = addPlaceFormValidator.isFormValid();
  const popupButton = document.querySelector('.popup__button_add-place');
  popupButton.textContent = 'Загрузка...';
  popupButton.style.fontSize = '18px';

  if (isValid) {
    const card = {
      name: formAddPlace.elements.name.value,
      link: formAddPlace.elements.link.value
    };

    api.addCard(card)
      .then(card => {
        const ownerId = userInfo.ownerId;
        return new Card(card, cardTemplate, ownerId, popupImage, api)
      })
      .then(cardInstance => {
        cardList.addCard(cardInstance.create());
        addPlacePopup.close();
      })
      .catch(err => alert(err))
      .finally (() => {
        popupButton.textContent = '+';
        popupButton.style.fontSize = '36px';
      });
  }
});

//Редактирование профиля
formEditProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = editProfileFormValidator.isFormValid();
  const popupButton = document.querySelector('.popup__button_edit-profile');
  popupButton.textContent = 'Загрузка...';

  if (isValid) {
    userInfo.updateUserInfo(api.updateUserInfo(formEditProfile.elements))
      .then(() => editProfilePopup.close())
      .catch(err => alert(err))
      .finally (() => popupButton.textContent = 'Сохранить');
    }
});

//Редактирование аватара
formChangeAvatar.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = changeAvatarFormValidator.isFormValid();

  if (isValid) {
    userInfo.updateUserAvatar(api.updateUserAvatar(formChangeAvatar.elements))
      .then(() => changeAvatarPopup.close())
      .catch(err => alert(err));
  }
}); 

//Слушатели событий
addPlaceButton.addEventListener('click', () => addPlacePopup.open());
editProfileButton.addEventListener('click', () => editProfilePopup.open());
userPhotoElement.addEventListener('click', () => changeAvatarPopup.open());

formAddPlace.addEventListener('input', (e) => addPlaceFormValidator.setEventListeners(e));
formEditProfile.addEventListener('input', (e) => editProfileFormValidator.setEventListeners(e));
formChangeAvatar.addEventListener('input', (e) => changeAvatarFormValidator.setEventListeners(e));
/**
 * Отлично, помимо основных замечаний исправлены дополнительные.
 * Работа принята.
 * Желаю успехов!
 */