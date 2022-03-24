//Initial cards
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  }
]; 

//Consts
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

const scrollElement = document.querySelector('.page');

//Functions
function createCard(nameNewCard, linkNewCard) {
  const newCardElement = cardElement.cloneNode(true);
  const titleCard = newCardElement.querySelector('.element__text');
  const imageCard = newCardElement.querySelector('.element__image');
  titleCard.textContent = nameNewCard;
  imageCard.src = linkNewCard;
  imageCard.alt = nameNewCard;

  const likeButton = newCardElement.querySelector('.element__like');
  likeButton.addEventListener('click', likeElement);
 
  const deleteCard = newCardElement.querySelector('.element__trash');
  deleteCard.addEventListener('click', () => {
    const trashButton = deleteCard.closest('.element');
    trashButton.remove();
  });

  imageCard.addEventListener('click', evt => {
    openPopup(popupImage);
    const goal = evt.target;
    captionPopupImage.textContent = goal.alt;
    srcPopupImage.src = goal.src;
    srcPopupImage.alt = goal.alt;
  });

  return newCardElement;
}

function likeElement (evt) {
  evt.target.classList.toggle('element__like_active');
}

function openPopup (popup) {
  popup.classList.add('popup_opened');
  scrollElement.classList.add('page_noscroll');
};

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  scrollElement.classList.remove('page_noscroll');
};

function formEditSubmitHandler (evt) {
  evt.preventDefault();
  nameHere.textContent = nameInput.value;
  jobHere.textContent = jobInput.value;
  closePopup(popupEdit);
}

function formNewCardSubmitHandler (evt) {
  evt.preventDefault();
  const newCard = createCard(titleInput.value, srcInput.value);
  containerCards.prepend(newCard);
  formNewCard.reset();
  closePopup(popupNewCard);
}

//Initial cards uploading
initialCards.forEach(item => {
  containerCards.append(createCard(item.name, item.link));
  });

//Listeners
popupOpenButtonEdit.addEventListener('click', () => {
  openPopup(popupEdit)
  nameInput.value = nameHere.textContent;
  jobInput.value = jobHere.textContent;
});

popupOpenButtonNewCard.addEventListener('click', () => {
  openPopup(popupNewCard)
});

popupCloseButtonEdit.addEventListener('click', () => closePopup(popupEdit));
popupCloseButtonNewCard.addEventListener('click', () => closePopup(popupNewCard));
popupCloseButtonImage.addEventListener('click', () => closePopup(popupImage));

formEdit.addEventListener('submit', formEditSubmitHandler);
formNewCard.addEventListener('submit', formNewCardSubmitHandler);