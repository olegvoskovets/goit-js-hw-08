import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', handleSubmit);
form.addEventListener('input', throttle(handleInput, 500));

const formInfo = localStorage.getItem('feedback-form-state')
  ? JSON.parse(localStorage.getItem('feedback-form-state'))
  : {
      email: '',
      message: '',
    };

//console.log('forminfo===>', formInfo);

form.email.value = formInfo.email;
form.message.value = formInfo.message;

function handleInput(e) {
  if (e.currentTarget) {
    const {
      elements: { email, message },
    } = e.currentTarget;

    formInfo.email = email.value;
    formInfo.message = message.value;
    localStorage.setItem('feedback-form-state', JSON.stringify(formInfo));
  }
}

function handleSubmit(e) {
  e.preventDefault();

  console.log(formInfo);
  form.email.value = '';
  form.message.value = '';
  localStorage.removeItem('feedback-form-state');
}
