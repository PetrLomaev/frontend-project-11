import * as yup from 'yup';
import onChange from 'on-change';
import i18n from 'i18next';
import axios from 'axios';
import resources from './locales/index.js';
import renderFeedAndPosts from './view/view.js';
import updater from './view/updater.js';

const schema = yup.string().url();

const validate = (fields) => {
  try {
    schema.validateSync(fields);
    return {};
  } catch (e) {
    console.log('ошибка, юрл невалидный');
  }
};

// Функция для прокси
const getProxy = (url) => {
  const urlProxy = new URL('/get', 'https://allorigins.hexlet.app');
  urlProxy.searchParams.set('disableCache', 'true');
  urlProxy.searchParams.set('url', url);
  return urlProxy.toString();
};
// Функция для получения xml-документа из ссылки. Из него нужно извлекать фиды, посты и т.д.
const parserToXml = async (url) => {
  const response = await axios.get(getProxy(url));
  const parser = new DOMParser();
  const docXtml = parser.parseFromString(response.data.contents, "text/xml");
  console.log('docXtml', docXtml);
  return docXtml;
}


const checkForm = (paragraph, watchedState, i18nextInstance) => {
  const form = document.querySelector('form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    //watchedState.inputText = url;
  
    const inputEl = document.querySelector('input[id="url-input"]');
    if (!validate(url)) {
      inputEl.classList.add('in-valid', 'is-invalid', 'text-danger');
      paragraph.textContent = i18nextInstance.t('messages.errURL');
      watchedState.status = 'invalid';
      watchedState.stateForm = 'not_filled';
    } else {
      paragraph.textContent = i18nextInstance.t('messages.succesAdd');
      inputEl.classList.remove('in-valid', 'is-invalid');
      paragraph.classList.replace('text-danger', 'text-success');
      watchedState.inputText = [url, ...watchedState.inputText];
      //watchedState.inputText = url;
      watchedState.stateForm = 'filled';
      console.log('watchedState', watchedState)
    }
  });
};

const renderRss = (urls, watchedState) => {
  
  urls.forEach(async (url) => {
    const readyDocXml = await parserToXml(url);
    updater(readyDocXml, watchedState);
  })

  if (watchedState.inputText.length > 0) {
    setTimeout(() => renderRss(watchedState.inputText, watchedState), 5000);
  }
  /*
  const readyDocXml = await parserToXml(url);
  updater(readyDocXml, watchedState);
  console.log('readyDocXml', readyDocXml);
  */
  
}


const app = async () => {
  const { ru } = resources;
  const pEl = document.querySelector('p[class="feedback m-0 position-absolute small text-danger"]');
  const state = {
    inputText: [],
    feeds: [],
    posts: [],
    stateForm: 'not_filled',
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

      case 'inputText': renderRss(watchedState.inputText, watchedState);
        break;

      default:
        break;
    }
  });
  checkForm(pEl, watchedState, i18nextInstance);
  
  //renderRss(state.inputText);
};

export default app;
