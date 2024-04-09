import * as yup from 'yup';
import onChange from 'on-change';
import i18n from 'i18next';
import axios from 'axios';
import resources from './locales/index.js';

const schema = yup.string().url();

const validate = (fields) => {
  try {
    schema.validateSync(fields);
    return {};
  } catch (e) {
    console.log('ошибка, юрл невалидный');
  }
};




const checkForm = (paragraph, watchedState, i18nextInstance) => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    const inputEl = document.querySelector('input[id="url-input"]');
    if (!validate(url)) {
      inputEl.classList.add('in-valid', 'is-invalid');
      paragraph.textContent = i18nextInstance.t('messages.errURL');
      watchedState.status = 'invalid';
    } else {
      paragraph.textContent = i18nextInstance.t('messages.succesAdd');
      inputEl.classList.remove('in-valid', 'is-invalid');
      paragraph.classList.replace('text-danger', 'text-success');
    }
  });
};
const app = async () => {
  const { ru } = resources;
  const pEl = document.querySelector('p[class="feedback m-0 position-absolute small text-danger"]');
  const state = {
    message: '',
    currentLanguage: 'ru',
    status: 'valid',
  };
  const i18nextInstance = i18n.createInstance();
  await i18nextInstance.init({
    lng: 'ru', // Текущий язык
    debug: false,
    resources: {
      ru,
    },
  });
  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'currentLanguage': i18nextInstance.changeLanguage(value).then(() => checkForm(pEl, watchedState, i18nextInstance));
        break;

      case 'message': checkForm(pEl, watchedState, i18nextInstance);
        break;

      default:
        break;
    }
  });
  checkForm(pEl, watchedState, i18nextInstance);
};

export default app;
