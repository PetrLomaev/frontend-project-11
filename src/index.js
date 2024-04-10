import './styles.scss';
import 'bootstrap';
import app from './main.js';
import axios from 'axios';

const proxy = (url) => {
  const root = 'https://allorigins.hexlet.app/get';
  const rootUrl = new URL(root);
  //console.log('rootUrl', rootUrl)
  const inputUrl = encodeURIComponent(url);
  rootUrl.searchParams.set('url', inputUrl);
  console.log('rootUrl', rootUrl);
  return rootUrl;
};

const fn = async (url) => {
  const response = await axios.get(proxy(url));
  console.log('response', response); // тело ответа
  //const responseJson = JSON.parse(response);
  const parser = new DOMParser();
  const doc = parser.parseFromString(response, "text/xml");
  console.log('doc', doc);
}
fn('https://lorem-rss.hexlet.app/feed');
app();
