import './styles.scss';
import 'bootstrap';
import app from './main.js';
import axios from 'axios';
/*
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

  const parsererror = docXtml.querySelector('parsererror');
  if (parsererror) {
    const errorParsing = parsererror.textContent;
    throw errorParsing;
  }
  
  const feed = {
    title: docXtml.querySelector('channel title').textContent,
    description: docXtml.querySelector('channel description').textContent,
  }
  const divFeed = document.querySelector('div[class="col-md-10 col-lg-4 mx-auto order-0 order-lg-1 feeds"]');

  const divFeedTitle = document.createElement('div');
  divFeedTitle.classList.add('card-body');
  const h2Feed = document.createElement('h2');
  h2Feed.classList.add('card-title', 'h4');
  h2Feed.textContent = 'Фиды';
  divFeedTitle.append(h2Feed);

  const ulFeedDescription = document.createElement('ul');
  ulFeedDescription.classList.add('list-group', 'border-0', 'rounded-0');

  const liDescription = document.createElement('li');
  liDescription.classList.add('list-group-item', 'border-0', 'border-end-0');

  const h3Description = document.createElement('h3');
  h3Description.classList.add('h6', 'm-0');
  h3Description.textContent = feed.title;

  const pDescription = document.createElement('p');
  pDescription.classList.add('m-0', 'small', 'text-black-50');
  pDescription.textContent = feed.description;

  liDescription.append(h3Description, pDescription);
  ulFeedDescription.append(liDescription);

  divFeed.append(divFeedTitle, ulFeedDescription);

  const allItem = Array.from(docXtml.querySelectorAll('item'));
    const allItemToObj = allItem.map((item) => {
      return {
        title: item.querySelector('title').textContent,
        description: item.querySelector('description').textContent,
        link: item.querySelector('link').textContent,
      }
    });
    
    const divAutoPosts = document.querySelector('div[class="col-md-10 col-lg-8 order-1 mx-auto posts"]');
    const divPosts = document.createElement('div');
    
    divPosts.classList.add('card-body');
    const h2El = document.createElement('h2');
    h2El.classList.add('card-title', 'h4');
    h2El.textContent = 'Посты';
    divPosts.append(h2El);
    const ulPosts = document.createElement('ul');
    ulPosts.classList.add('list-group', 'border-0', 'rounded-0');
    allItemToObj.forEach(({ title, description, link }) => {
      const liEl = document.createElement('li');
      liEl.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

      const aEl = document.createElement('a');
      aEl.classList.add('fw-bold');
      aEl.setAttribute('href', link);
      aEl.setAttribute('data-id', '');
      aEl.setAttribute('target', '_blank');
      aEl.setAttribute('rel', 'oopener noreferrer');
      aEl.textContent = title;

      const buttonEl = document.createElement('button');
      buttonEl.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      buttonEl.setAttribute('type', 'button');
      buttonEl.setAttribute('data-id', '');
      buttonEl.setAttribute('data-bs-toggle', 'modal');
      buttonEl.setAttribute('data-bs-target', '#modal');
      buttonEl.textContent = 'Просмотр';
      buttonEl.addEventListener('click', () => {
        const elDescription = document.querySelector('div[class="modal-body text-break"]');
        elDescription.textContent = description;
      });

      liEl.append(aEl, buttonEl);
      ulPosts.append(liEl);
    })
    divPosts.append(ulPosts);
    divAutoPosts.append(divPosts);

}
parserToXml('https://lorem-rss.hexlet.app/feed');
*/
    


app();
