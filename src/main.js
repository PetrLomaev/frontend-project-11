import * as yup from 'yup';
import onChange from 'on-change';

const state = {
  inputValue: '',
}

const watchedState = onChange(state, (path) => {
  const input = document.querySelector('#url-input');
  input.addEventListener('input', (e) => {
    state.inputValue = e.target.value;
    alert(watchedState.inputValue);
  });
});

const schema = yup.string().url();

const validate = (fields) => {
  try {
    schema.isValidSync(fields);
    return {};
  } catch (e) {
    alert('ошибка, неправильный юрл');
  }
};



const checkForm = () => {
const buttonAdd = document.querySelector('button[type="submit"]');
buttonAdd.addEventListener('submit', (e) => {
  e.preventDefault();
  const checkUrl = watchedState.inputValue;
  alert(checkUrl);
  validate(checkUrl);
});
}



export default checkForm;

