const object = {
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_visible'
}; 

const showInputError = (formElement, inputElement, errorMessage, someObject) => {
  inputElement.classList.add(someObject.inputErrorClass);
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputError.textContent = errorMessage;
  inputError.classList.add(someObject.errorClass);
};

const hideInputError = (formElement, inputElement, someObject) => {
  inputElement.classList.remove(someObject.inputErrorClass);
  const inputError = formElement.querySelector(`.${inputElement.id}-error`);
  inputError.classList.remove(someObject.errorClass);
  inputError.textContent = '';
};

const isValid = (formElement, inputElement, someObject) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, someObject);
  } else {
    hideInputError(formElement, inputElement, someObject);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, someObject) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(someObject.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'true');
  } else {
    buttonElement.classList.remove(someObject.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement, someObject) => {
  const inputList = Array.from(formElement.querySelectorAll(someObject.inputSelector));
  const buttonElement = formElement.querySelector(someObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, someObject);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, someObject);
      toggleButtonState(inputList, buttonElement, someObject);
    });
  });
};

const enableValidation = (someObject) => {
  const formList = Array.from(document.querySelectorAll(someObject.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, someObject);
  });
};

enableValidation(object);