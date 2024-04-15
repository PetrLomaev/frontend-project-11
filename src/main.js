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

// Пока что прокинул сюда функцию для xml. Потом вынести в отдельный файл!
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
    const parsedXml = parserToXml(url);
    const allItem = Array.from(parsedXml.querySelectorAll('item'));
    const allItemToObj = allItem.map((item) => {
      return {
        title: item.querySelector('title').textContent,
        description: item.querySelector('description').textContent,
        link: item.querySelector('link').textContent,
      }
    });
    const divAutoPosts = document.querySelector('div[class="col-md-10 col-lg-8 order-1 mx-auto posts"]');
    const divPosts = document.createElement('div');
    divPosts.outerHTML = '<div class="card-body"><h2 class="card-title h4">Посты</h2></div>';
    const ulPosts = document.createElement('ul');
    ulPosts.outerHTML = '<ul class="list-group border-0 rounded-0"></ul>';
    // Ниже дикая жесть, тестирую отрисовку постов фидов и тд
    allItemToObj.forEach(({ tittle, description, link }) => {
      const liEl = document.createElement('li');
      liEl.outerHTML = `<li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
      <a href=${link} class="fw-bold" data-id="" target="_blank" rel="noopener noreferrer">${tittle}</a>
      <button type="button" class="btn btn-outline-primary btn-sm" data-id="" data-bs-toggle="modal" data-bs-target="#modal">Просмотр</button>
      </li>`;
      ulPosts.append(liEl);
    })
    divPosts.append(ulPosts);
    divAutoPosts.append(divPosts);
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
