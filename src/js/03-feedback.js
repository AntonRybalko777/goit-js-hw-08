import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const key = 'feedback-form-state';

form.addEventListener('input', throttle(handlerInput, 500));

function handlerInput(evt) {
  if (evt.target.name === 'email') {
    formValue.email = evt.target.value;
  }
  if (evt.target.name === 'message') {
    formValue.message = evt.target.value;
  }

  localStorage.setItem(key, JSON.stringify(formValue));
}
const formValue = {
  email: '',
  message: '',
};

const savedValues = localStorage.getItem(key);
const parsedValue = JSON.parse(savedValues) ?? formValue;

form.elements.email.value = parsedValue.email;
form.elements.message.value = parsedValue.message;

form.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
  evt.preventDefault();
  console.log('email:', evt.currentTarget.elements.email.value);
  console.log('message:', evt.currentTarget.elements.message.value);
  evt.currentTarget.reset();
  localStorage.removeItem(key);
}
