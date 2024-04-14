import './styles.scss';
import 'bootstrap';
import app from './main.js';
import axios from 'axios';

const getProxy = (url) => {
  const urlProxy = new URL('/get', 'https://allorigins.hexlet.app');
  urlProxy.searchParams.set('disableCache', 'true');
  urlProxy.searchParams.set('url', url);
  console.log('urlProxy.toString', urlProxy.toString());
  return urlProxy.toString();
};

const fn = async (url) => {
  const response = await axios.get(getProxy(url));
  console.log('response', response); // тело ответа
  const parser = new DOMParser();
  const doc = parser.parseFromString(response.data, "text/xml");
  console.log('doc', doc);
}
fn('https://lorem-rss.hexlet.app/feed');
app();
