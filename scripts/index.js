const containerCards = document.querySelector('.elements__items');
const cardTemplate = document.querySelector('#card').content;
const cardElement = cardTemplate.querySelector('.element');
const imageElement = document.querySelector('.element__image');

const popupOpenButtonEdit = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_type_edit');
const popupCloseButtonEdit = popupEdit.querySelector('.popup__close');

const popupOpenButtonNewCard = document.querySelector('.profile__add');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCloseButtonNewCard = popupNewCard.querySelector('.popup__close');

const popupImage = document.querySelector('.popup_type_image');
const popupCloseButtonImage = popupImage.querySelector('.popup__close');
const captionPopupImage = popupImage.querySelector('.popup__caption');
const srcPopupImage = popupImage.querySelector('.popup__image');

const formEdit = popupEdit.querySelector('.popup__container');
const nameInput = popupEdit.querySelector('#name');
const jobInput = popupEdit.querySelector('#job');

const formNewCard = popupNewCard.querySelector('.popup__container');
const titleInput = popupNewCard.querySelector('#place');
const srcInput = popupNewCard.querySelector('#link');

const nameHere = document.querySelector('.profile__name');
const jobHere = document.querySelector('.profile__job');

const editOverlay = document.querySelector('.popup__overlay_type_edit');
const newCardOverlay = document.querySelector('.popup__overlay_type_new-card');
const imageOverlay = document.querySelector('.popup__overlay_type_image');

const addingCreateButton = popupNewCard.querySelector('.popup__submit_type_new-card');

function createCard(nameNewCard, linkNewCard) {
  const newCardElement = cardElement.cloneNode(true);
  const titleCard = newCardElement.querySelector('.element__text');
  const imageCard = newCardElement.querySelector('.element__image');
  titleCard.textContent = nameNewCard;
  imageCard.src = linkNewCard;
  imageCard.alt = nameNewCard;

  const likeButton = newCardElement.querySelector('.element__like');
  likeButton.addEventListener('click', likeElement);
 
  const trashButton = newCardElement.querySelector('.element__trash');
  trashButton.addEventListener('click', deleteCard);

  function deleteCard() {
    const cardToDelete = trashButton.closest('.element');
    cardToDelete.remove();
  };

  imageCard.addEventListener('click', () => {
    openPopup(popupImage);
    captionPopupImage.textContent = nameNewCard;
    srcPopupImage.src = linkNewCard;
    srcPopupImage.alt = nameNewCard;
  });

  return newCardElement;
}

function likeElement (evt) {
  evt.target.classList.toggle('element__like_active');
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
};

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  nameHere.textContent = nameInput.value;
  jobHere.textContent = jobInput.value;
  closePopup(popupEdit);
}

function handleNewCardFormSubmit (evt) {
  evt.preventDefault();
  const newCard = createCard(titleInput.value, srcInput.value);
  containerCards.prepend(newCard);
  formNewCard.reset();
  addingCreateButton.classList.add('popup__submit_disabled');
  addingCreateButton.setAttribute('disabled', 'true');
  closePopup(popupNewCard);
}

// function handleAddingFormSubmit (evt) {
//   evt.preventDefault();
//   const newCard = createCard(titleInput.value, srcInput.value);
//   containerCard.prepend(newCard);
//   addingForm.reset();
//   addingCreateButton.classList.add('popup__button_disabled');
//   addingCreateButton.setAttribute('disabled', 'true');

//   closePopup(addingPopup);
// }

//ESC button popup closing
function closeByEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Initial cards uploading
initialCards.forEach(item => {
  containerCards.append(createCard(item.name, item.link));
  });

popupOpenButtonEdit.addEventListener('click', () => {
  openPopup(popupEdit)
  nameInput.value = nameHere.textContent;
  jobInput.value = jobHere.textContent;
});

popupOpenButtonNewCard.addEventListener('click', () => {
  openPopup(popupNewCard);
});

popupCloseButtonEdit.addEventListener('click', () => closePopup(popupEdit));
popupCloseButtonNewCard.addEventListener('click', () => closePopup(popupNewCard));
popupCloseButtonImage.addEventListener('click', () => closePopup(popupImage));

formEdit.addEventListener('submit', handleEditFormSubmit);
formNewCard.addEventListener('submit', handleNewCardFormSubmit);

editOverlay.addEventListener('click', () => closePopup(popupEdit));
newCardOverlay.addEventListener('click', () => closePopup(popupNewCard));
imageOverlay.addEventListener('click', () => closePopup(popupImage));