//Ссылка на доки библиотеки  https://github.com/nhn/tui.pagination/blob/production/docs/getting-started.md
import axios from 'axios';
import Pagination from 'tui-pagination';
import debounce from 'lodash.debounce';
import { renderMarkup } from '../templates/cardTemplate.js';
import { fetchPopularMovies, fetchGenres, fetchMoviesSearchQuery } from '../scripts/services/API';
import { getTrends } from './searchMovie.js';

const DEBOUNCE_DELAY = 300;
const search = document.querySelector('.header-form');
const collectionEl = document.querySelector('.collection');
const form = document.querySelector('.header-form__input');
form.addEventListener('input', debounce(onFormChange, DEBOUNCE_DELAY));
const container = document.getElementById('pagination');

const PER_PAGE = 20;
const options = {
  totalItems: 2000,
  itemsPerPage: PER_PAGE,
  visiblePages: 10,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};
const pagination = new Pagination(container, options);
let page = pagination.getCurrentPage();

pagination.on('afterMove', loadMovies);
async function loadMovies(event) {
  collectionEl.textContent = '';
  const response = await fetchPopularMovies(event.page);
  console.log(response.results);
  const loadGenres = await fetchGenres();

  return renderMarkup(response.results, loadGenres);
}

async function onFormChange(evt) {
  evt.preventDefault();
  if (evt.target.value === '') {
    collectionEl.textContent = '';

    return getTrends();
  }

  const inputValue = search.headerInput.value;
  console.log(inputValue);

  collectionEl.textContent = '';

  pagination.off('afterMove', loadMovies);

  const moviesByKeyWord = await fetchMoviesSearchQuery(inputValue);

  const loadGenres = await fetchGenres();

  console.log(moviesByKeyWord);
  renderMarkup(moviesByKeyWord.results, loadGenres);
 
  pagination.reset(moviesByKeyWord.total_results);
  pagination.on('afterMove', loadMovies);

  loadMovies();
}


