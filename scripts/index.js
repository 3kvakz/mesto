// Pop-up open-close

const popupOpenButtonElement = document.querySelector('.profile__edit');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = document.querySelector('.popup__close');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
};

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
};

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);



// Pop-up content editing

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#job');
nameInput.value = document.querySelector('.profile__name').textContent;
jobInput.value = document.querySelector('.profile__job').textContent;

function formSubmitHandler (evt) {
  evt.preventDefault();
  let nameHere = document.querySelector('.profile__name');
  let jobHere = document.querySelector('.profile__job');
  nameHere.textContent = nameInput.value;
  jobHere.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);