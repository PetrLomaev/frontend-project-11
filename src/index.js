import './styles.scss';
import 'bootstrap';
import app from './main.js';
import axios from 'axios';

const fn = async () => {
  const response = await axios.get('http://ru.hexlet.io/');
  console.log(response.data); // тело ответа
}
console.log(fn());
app();
