import * as yup from 'yup';
import onChange from 'on-change';

const state = {
  inputValue: '',
}
/*
const watchedState = onChange(state, (path) => {
  const input = document.querySelector('#url-input');
  input.addEventListener('input', (e) => {
    state.inputValue = e.target.value;
    alert(watchedState.inputValue);
  });
});
*/
const schema = yup.string().url();

const validate = (fields) => {
  try {
    schema.validateSync(fields);
    return {};
  } catch (e) {
    console.log('ошибка, юрл невалидный');
  }
};

const checkForm = () => {
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  //const checkUrl = watchedState.inputValue;
  const formData = new FormData(e.target);
  const url = formData.get('url');
  //validate(url);
  const pEl = document.querySelector('p[class="feedback m-0 position-absolute small text-danger"]');
  const inputEl = document.querySelector('input[id="url-input"]');
  if (!validate(url)) {
    inputEl.classList.add('is-invalid');
    pEl.textContent = 'Ссылка должна быть валидным URL';
  }
});
}

export default checkForm;

