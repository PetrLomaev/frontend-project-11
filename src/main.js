import * as yup from 'yup';
import onChange from 'on-change';

const state = {
  inputValue: '',
}

const input = document.querySelector('#url-input');
input.addEventListener('input', (e) => {
  state.inputValue = e.target.value;
});

const schema = yup.object().shape({
  inputValue: yup.url(),
});

const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    console.log('ошибка, неправильный юрл');
  }
};

const buttonAdd = document.querySelector('button[type="submit"]');
buttonAdd.addEventListener('click', (e) => {
  e.preventDefault();
  const checkUrl = state.inputValue;
  validate(checkUrl);
});

