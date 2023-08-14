import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const key = 'feedback-form-state';

const formValue = {
  email: '',
  message: '',
};
form.addEventListener('input', throttle(handlerInput, 500));

function handlerInput() {
  formValue.email = form.elements.email.value;
  formValue.message = form.elements.message.value;

  localStorage.setItem(key, JSON.stringify(formValue));
}

const savedValues = localStorage.getItem(key);
const parsedValue = JSON.parse(savedValues) ?? formValue;

form.elements.email.value = parsedValue.email;
form.elements.message.value = parsedValue.message;

form.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
  evt.preventDefault();
  console.log(parsedValue);
  evt.currentTarget.reset();
  formValue.email = '';
  formValue.message = '';
  localStorage.removeItem(key);
}
