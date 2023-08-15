import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const KEY = 'feedback-form-state';
let formValues = JSON.parse(localStorage.getItem(KEY)) ?? {};
form.email.value = formValues.email ?? '';
form.message.value = formValues.message ?? '';

form.addEventListener('input', throttle(handlerInput, 500));
form.addEventListener('submit', handlerSubmit);

function handlerInput(evt) {
  formValues[evt.target.name] = evt.target.value;
  localStorage.setItem(KEY, JSON.stringify(formValues));
}

function handlerSubmit(evt) {
  evt.preventDefault();
  console.log(formValues);
  evt.currentTarget.reset();
  formValues = {};
  localStorage.removeItem(KEY);
}
