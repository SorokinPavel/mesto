import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const selectors = {
  template: '#card-template',
  element: '.element',
  elementTitle: '.element__title',
  elementMaskGroup: '.element__mask-group',
  elementTrash: ".element__trash",
  elementLike: ".element__group",
  elementActiveLike: "element__group_active",
}

const popupCaption = document.querySelector(".image-popup__caption");
const popupImage = document.querySelector(".image-popup__image");
const popupImageCard = document.querySelector(".image-popup");
const elementsContainer = document.querySelector(".elements");

//добавление 6 карточек в профиль
function addCard () {
  const cards = initialCards.map((item) => {
    const card = new Card(item, selectors,popupCaption,popupImage,popupImageCard);
    return card.createCard();
  });
  elementsContainer.append(...cards);
}
addCard ();

const formAddElement = document.querySelector('[name="popup-addform"]');
const popupFieldPostTitle = document.querySelector(".popup__input_change_post-title");
const popupFieldPostLink = document.querySelector(".popup__input_change_image-link");

// добавление новой карточки в профиль
function createPost(evt, item) {
  evt.preventDefault();
    const title = popupFieldPostTitle.value;
    const link = popupFieldPostLink.value;
    const card = new Card({name: title, link: link}, selectors);
    const post = card.createCard();
    elementsContainer.prepend(post);
    popupFieldPostTitle.value = "";
    popupFieldPostLink.value = "";
  closePopup(popupPostCard);
}
formAddElement.addEventListener("submit", createPost);

const popupPostCard = document.querySelector(".addCard-popup");
const popupProfile = document.querySelector(".profile-popup");
const popupEditBtnOpen = document.querySelector(".profile__edit-button");
const popupAddBtnOpen = document.querySelector(".profile__add-button");
//открытие попапов
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
  document.addEventListener("mousedown", closePopupOverlay);
};

export default openPopup;

popupEditBtnOpen.addEventListener('click', () => {
  openPopup(popupProfile);
  popupUsername.value = username.textContent;
  popupUserDescription.value = userDescription.textContent;
});

const popupCardSaveBtn = popupPostCard.querySelector('.popup__button');
popupAddBtnOpen.addEventListener("click", ()=> {
  popupCardSaveBtn.classList.add('popup__button_disabled');
  popupCardSaveBtn.setAttribute('disabled', 'disabled');
  openPopup(popupPostCard)});

//закрытие попапов
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
  document.removeEventListener("mousedown", closePopupOverlay);
}
const buttonCloseList = document.querySelectorAll('.popup__closebtn');
buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
})

//закрытие попапов при нажатии на ESC
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

//закрытие попапов при клике на оверлэй
function closePopupOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

const username = document.querySelector(".profile__username");
const userDescription = document.querySelector(".profile__description");
const popupUsername = document.querySelector(".popup__input_change_username");
const popupUserDescription = document.querySelector(".popup__input_change_description");
const formEditElement = document.querySelector('[name="popup-editform"]');
//изменение информации профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  username.textContent = popupUsername.value;
  userDescription.textContent = popupUserDescription.value;
  closePopup(popupProfile);
}
formEditElement.addEventListener("submit", handleFormSubmit);

const formCards = popupPostCard.querySelector(".popup__form");
const formProfile = popupProfile.querySelector(".popup__form");

const cardValidate = new FormValidator(formsConfig, formCards);
cardValidate.enableValidation();
const profileValidate = new FormValidator(formsConfig, formProfile);
profileValidate.enableValidation();
