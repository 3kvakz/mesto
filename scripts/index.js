// Pop-up open-close

const popupOpenButtonElement = document.querySelector('.profile__edit');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = document.querySelector('.popup__close');
const scrollElement = document.querySelector('.page');
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#job');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
  scrollElement.classList.add('page_noscroll');
  nameInput.value = document.querySelector('.profile__name').textContent;
  jobInput.value = document.querySelector('.profile__job').textContent;
};

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
  scrollElement.classList.remove('page_noscroll');
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  let nameHere = document.querySelector('.profile__name');
  let jobHere = document.querySelector('.profile__job');
  nameHere.textContent = nameInput.value;
  jobHere.textContent = jobInput.value;
  closePopup();
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);