import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', handleSubmit);
form.addEventListener('input', throttle(handleInput, 1000));

const formInfo = localStorage.getItem('feedback-form-state')
  ? JSON.parse(localStorage.getItem('feedback-form-state'))
  : {
      email: '',
      message: '',
    };

form.email.value = formInfo.email;
form.message.value = formInfo.message;

function addLocalStorage() {
  localStorage.setItem('feedback-form-state', JSON.stringify(formInfo));
}

function handleInput(e) {
  if (e.target.name === 'email') {
    formInfo.email = e.target.value;
  } else {
    formInfo.message = e.target.value;
  }

  addLocalStorage();
}

function handleSubmit(e) {
  e.preventDefault();

  console.log(formInfo);

  form.email.value = '';
  form.message.value = '';
  localStorage.removeItem('feedback-form-state');
}
