//Ссылка на доки библиотеки  https://github.com/nhn/tui.pagination/blob/production/docs/getting-started.md
import axios from 'axios';
import Pagination from 'tui-pagination';
import debounce from 'lodash.debounce';
import { startSpin, stopSpin } from './spinner';
import { renderMarkup } from '../templates/cardTemplate.js';

import {
  fetchPopularMovies,
  fetchGenres,
  fetchMoviesSearchQuery,
  fetchGenresById,
} from '../scripts/services/API';

import { success, failure } from './notification';

// import { getTrends } from './searchMovie.js';
import { clearPage, clearLocalStorage } from './searchMovie';
// import { getMovies } from './headerLibrary.js';
import { getMovies } from './renderMainPage';
import { getRefs } from '../scripts/refs';

const { container, footer, genreSelect } = getRefs();

const DEBOUNCE_DELAY = 500;

const search = document.querySelector('.header-form');
const collectionEl = document.querySelector('.collection');

const form = document.querySelector('.header-form__input');

const PER_PAGE = 20;
export const options = {
  totalItems: 10000,
  itemsPerPage: PER_PAGE,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};

// export let pagination = new Pagination(container, options);
export const paginationMain = new Pagination(container, options);
paginationMain.on('beforeMove', function () {
  collectionEl.innerHTML = '';
});
paginationMain.on('afterMove', async function (evt) {
  const response = await fetchPopularMovies(evt.page);
  const loadGenres = await fetchGenres();

  return renderMarkup(response, loadGenres);
});

export const paginationSearch = new Pagination(container, options);
let inputValue;

form.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

export async function onFormInput(evt) {
  inputValue = evt.target.value;
  evt.preventDefault();
  if (evt.target.value === '') {
    return getMovies();
  }
  if (footer.classList.length >= 2) {
    footer.classList.remove('.top_movies__footer');
    footer.classList.remove('.upcoming_movies__footer');
  }

  collectionEl.textContent = '';

  paginationSearch.reset();
  let page = 1;
  const moviesByKeyWord = await fetchMoviesSearchQuery(inputValue, page);
  const loadGenres = await fetchGenres();
  if (moviesByKeyWord.total_results === 0) {
    failure();
  }
  if (moviesByKeyWord.total_results > 0) {
    success(moviesByKeyWord.total_results);
  }
  container.classList.remove('visually-hidden');

  renderMarkup(moviesByKeyWord, loadGenres);

  if (moviesByKeyWord.total_results < 20) {
    container.classList.add('visually-hidden');
  } else {
    container.classList.remove('visually-hidden');
  }
}

paginationSearch.on('beforeMove', function (evt) {
  collectionEl.innerHTML = '';
});
paginationSearch.on('afterMove', async function (evt) {
  const moviesByKeyWord = await fetchMoviesSearchQuery(inputValue, evt.page);

  startSpin();
  const loadGenres = await fetchGenres();

  stopSpin();

  renderMarkup(moviesByKeyWord, loadGenres);
});

export const paginationGenres = new Pagination(container, options);

genreSelect.addEventListener('change', onGenresSelect);

let genreId;
export async function onGenresSelect(event) {
  footer.classList.remove('.top_movies__footer');
  footer.classList.remove('.upcoming_movies__footer');

  genreId = event.target.value;

  const page = 1;
  const moviesByGenre = await fetchGenresById(genreId, page);

  collectionEl.innerHTML = '';
  paginationGenres.reset();

  if (moviesByGenre.total_results < 20) {
    container.classList.add('visually-hidden');
  } else {
    container.classList.remove('visually-hidden');
  }

  startSpin();
  const loadGenres = await fetchGenres();
  clearPage();
  stopSpin();
  search.headerInput.value = '';

  renderMarkup(moviesByGenre, loadGenres);

  clearLocalStorage();
}

paginationGenres.on('beforeMove', function (evt) {
  collectionEl.innerHTML = '';
});

paginationGenres.on('afterMove', async function (evt) {
  const moviesByGenre = await fetchGenresById(genreId, evt.page);

  startSpin();
  const loadGenres = await fetchGenres();
  stopSpin();
  search.headerInput.value = '';
  renderMarkup(moviesByGenre, loadGenres);
  clearLocalStorage();
});
