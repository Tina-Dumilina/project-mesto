export class UserInfo {
  constructor(usernameElem, userJobElem, userAvatarElem, usernameInput, userJobInput) {
    this._usernameElem = usernameElem;
    this._userJobElem = userJobElem;
    this._userAvatarElem = userAvatarElem;
    this._usernameInput = usernameInput;
    this._userJobInput = userJobInput;
  };

  updateUserInfo(api) {
    return api.then(data => {
      this._usernameElem.textContent = this._usernameInput.defaultValue = data.name;
      this._userJobElem.textContent = this._userJobInput.defaultValue = data.about;
    }).catch((err) => {
      console.log(err); 
    });
  }

  setUserInfo(api) {
    return api.then(data => {
      this._usernameElem.textContent = this._usernameInput.defaultValue = data.name;
      this._userJobElem.textContent = this._userJobInput.defaultValue = data.about;
      this._userAvatarElem.style.backgroundImage = `url(${data.avatar})`;
      this.ownerId = data._id;
      this._usernameElem.setAttribute('data-id', this.ownerId);
      return this.ownerId;
    })
  }

  updateUserAvatar(api) {
    return api.then(profile => {
      this._userAvatarElem.style.backgroundImage = `url(${profile.avatar})`;
    }).catch((err) => {
      console.log(err); 
    });
  }
}