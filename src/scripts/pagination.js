//Ссылка на доки библиотеки  https://github.com/nhn/tui.pagination/blob/production/docs/getting-started.md
import axios from 'axios';
import Pagination from 'tui-pagination';
import debounce from 'lodash.debounce';
// import 'tui-pagination/dist/tui-pagination.css';
import { renderMarkup } from '../templates/cardTemplate.js';
import { fetchPopularMovies, fetchGenres, fetchMoviesSearchQuery } from '../scripts/services/API';
import { searchMovie } from './searchMovie.js';

const DEBOUNCE_DELAY = 300;
const search = document.querySelector('.header-form');
const collectionEl = document.querySelector('.collection');
const form = document.querySelector('.header-form__input');
form.addEventListener('input', debounce(onFormChange, DEBOUNCE_DELAY));
const container = document.getElementById('pagination');

// const search_form = document.querySelector('.header-form__label');
// search_form.addEventListener('submit', handlerKeyWord);

// function handlerKeyWord(e) {
//   e.preventDefault();
//   let value = search_form.elements.header-input.value.trim();

//   fetchMoviePagination(value, page)
//     .then(data => {
//       if (data) {
//         pagination.reset(data.total_pages);
//         getMovies(data.results);
//       }
//     })
//     .catch(console.error);

//   setPagination(value);
// }
// const API_KEY = 'api_key=76293c6bcb8bbcc89a96d2b767d5c3a3';
const PER_PAGE = 20;
const options = {
  totalItems: 2000,
  itemsPerPage: PER_PAGE,
  visiblePages: 7,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};
const pagination = new Pagination(container, options);
let page = pagination.getCurrentPage();

pagination.on('afterMove', loadMovies);
// let page
async function loadMovies(event) {
  collectionEl.textContent = '';
  const response = await fetchPopularMovies(event.page);
  console.log(response.results);
  const loadGenres = await fetchGenres();

  return renderMarkup(response.results, loadGenres);
}

async function onFormChange(evt) {
  evt.preventDefault();
  const inputValue = search.headerInput.value;
  console.log(inputValue);

  collectionEl.textContent = '';

  pagination.off('afterMove', loadMovies);

  const moviesByKeyWord = await fetchMoviesSearchQuery(inputValue);

  const loadGenres = await fetchGenres();

  console.log(moviesByKeyWord);
  renderMarkup(moviesByKeyWord.results, loadGenres);
  // success(moviesByKeyWord.total_results);
  pagination.reset(moviesByKeyWord.total_results);
  pagination.on('afterMove', loadMovies);

  loadMovies();
}

// pagination.reset(loadMovies);
// loadMovies()
// function setPagination(value) {
//   pagination.on('afterMove', ({ page }) => {
//     fetchMoviePagination(value, page)
//       .then(data => getMovies(data.results))
//       .catch(console.log);
//   });
// }

// console.log(page)
