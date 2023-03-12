import openPopup from "./index.js";
class Card {
  static _template = document.querySelector('#card-template').content;
  constructor(item,selectors,popupCaption,popupImage,popupImageCard) {
    this._selectors = selectors;
    this._item = item;
    this._popupCaption = popupCaption;
    this._popupImage = popupImage;
    this._popupImageCard = popupImageCard;
    this._buttonDeleteHandle = this._buttonDeleteHandle.bind(this);
    this._buttonLikeHandle = this._buttonLikeHandle.bind(this);
    this._openPopupImage = this._openPopupImage.bind(this);
  }

  createCard() {
    this._card = Card._template.querySelector(this._selectors.element).cloneNode(true);
    const titleImagePopup = this._card.querySelector(this._selectors.elementTitle);
    const captionImagePopup = this._card.querySelector(this._selectors.elementMaskGroup);
    const buttonDeleteImagePopup = this._card.querySelector(this._selectors.elementTrash);
    const buttonLikeImagePopup = this._card.querySelector(this._selectors.elementLike)

    captionImagePopup.alt = this._item.name;
    titleImagePopup.textContent = this._item.name;
    captionImagePopup.src = this._item.link;
    buttonDeleteImagePopup.addEventListener('click', this._buttonDeleteHandle);
    buttonLikeImagePopup.addEventListener('click', this._buttonLikeHandle);
    captionImagePopup.addEventListener('click', this._openPopupImage);

    return this._card;
  }

  _buttonDeleteHandle() {
    this._card.remove();
  }

  _buttonLikeHandle(evt) {
    evt.target.classList.toggle(this._selectors.elementActiveLike);
  }

  _openPopupImage() {
    this._popupCaption.textContent = this._item.name;
    this._popupImage.src = this._item.link;
    this._popupImage.alt = this._item.name;
    openPopup(this._popupImageCard);
  }
}

export default Card;
