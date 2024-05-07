import i18next from 'i18next';
import axios from 'axios';
import resources from './locales/index.js';
import renderFeedAndPosts from './view/view.js';
import validator from './utils/validator.js';
import getProxy from './utils/proxify.js';
import parserToXml from './utils/parser.js';
import updatePosts from './utils/updater.js';

const app = () => {
  const { ru } = resources;
  const state = {
    rssForm: {
      stateForm: 'filling',
      inputValueStatus: true,
      error: null,
    },
    feeds: [],
    posts: [],
    uiState: {
      visitedLinks: new Set(),
      modalId: null,
    },
  };

  const i18nextInstance = i18next.createInstance();
  i18nextInstance.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru,
    },
  });

  const form = document.querySelector('form');
  const inputEl = document.querySelector('#url-input');
  const buttonAdd = document.querySelector('button[type="submit"]');
  const feedbackEl = document.querySelector('.feedback');
  const feedsEl = document.querySelector('.feeds');
  const postsEl = document.querySelector('.posts');
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const modalFooter = document.querySelector('.modal-footer');

  const elements = {
    form, inputEl, buttonAdd, feedbackEl, feedsEl, postsEl, modalTitle, modalBody, modalFooter,
  };

  const watchedState = renderFeedAndPosts(state, elements, i18nextInstance);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.rssForm.stateForm = 'filling';
    const formData = new FormData(e.target);
    const url = formData.get('url');
    const urlsList = watchedState.feeds.map((feed) => feed.url);
    validator(url, urlsList, i18nextInstance)
      .then((validUrl) => {
        watchedState.rssForm.error = null;
        watchedState.rssForm.stateForm = 'processing';
        return axios.get(getProxy(validUrl));
      })
      .then((response) => {
        const [feed, posts] = parserToXml(response.data.contents);
        const newFeed = { ...feed, url };
        const newPosts = posts.map((post) => ({ ...post, feedId: newFeed.id }));
        watchedState.feeds = [newFeed, ...watchedState.feeds];
        watchedState.posts = [...newPosts, ...watchedState.posts];
        watchedState.rssForm.stateForm = 'sucess';
      })
      .catch((err) => {
        watchedState.rssForm.inputValueStatus = false;
        if (err.name === 'ValidationError') {
          watchedState.rssForm.error = err.message;
        } else if (err.isParseError) {
          watchedState.rssForm.error = 'form.errors.notContainValidRss';
        } else if (axios.isAxiosError(err)) {
          watchedState.rssForm.error = 'form.errors.networkError';
        } else {
          watchedState.rssForm.error = err;
        }
        watchedState.rssForm.stateForm = 'filling';
      });

    postsEl.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        const { id } = event.target.dataset;
        watchedState.uiState.visitedLinks.add(id);
      }
      if (event.target.closest('button')) {
        const { id } = event.target.dataset;
        watchedState.uiState.visitedLinks.add(id);
        watchedState.uiState.modalId = id;
      }
    });

    setTimeout(() => updatePosts(watchedState), 5000);
  });
};

export default app;
