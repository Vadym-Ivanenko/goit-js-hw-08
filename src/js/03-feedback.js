import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

let dataForm = {};
const LOCALSTORAGE_FORM_KEY = 'feedback-form-state';

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onTextInput, 500));
window.addEventListener('DOMContentLoaded', onFillFormSavedData);

function onTextInput(event) {
  dataForm[event.target.name] = event.target.trim();
  saveLocalStorage(LOCALSTORAGE_FORM_KEY, dataForm);
}

function onFillFormSavedData() {
  const dataSaveForm = loadLocalStorage(LOCALSTORAGE_FORM_KEY);

  if (!dataSaveForm) return;
  dataForm = dataSaveForm;
  Object.entries(dataForm).forEach(([key, val]) => {
    formEl.elements[key].value = val;
  });
}
function onFormSubmit(evt) {
  evt.preventDefault();

  console.log(dataForm);
  dataForm = {};
  evt.currentTarget.reset();
  loadLocalStorage.removeItem(LOCALSTORAGE_FORM_KEY);
}

function saveLocalStorage(key, value) {
  try {
    const dataFormJSON = JSON.stringify(value);
    localStorage.setItem(key, dataFormJSON);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
}

function loadLocalStorage(key) {
  try {
    const dataFormJSON = localStorage.getItem(key);
    return dataFormJSON === null ? undefined : JSON.parse(dataFormJSON);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
}
