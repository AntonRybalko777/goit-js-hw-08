import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const key = 'feedback-form-state';

const formValue = {
  email: '',
  message: '',
};
form.addEventListener('input', throttle(handlerInput, 500));

function handlerInput(evt) {
  if (evt.target.name === 'email') {
    formValue.email = evt.target.value;
    formValue.message = form.elements.message.value;
  } else {
    formValue.message = evt.target.value;
    formValue.email = form.elements.email.value;
  }

  localStorage.setItem(key, JSON.stringify(formValue));
}

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
  formValue.email = '';
  formValue.message = '';
}
