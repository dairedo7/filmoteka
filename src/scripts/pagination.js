//Ссылка на доки библиотеки  https://github.com/nhn/tui.pagination/blob/production/docs/getting-started.md
import axios from 'axios';
import Pagination from 'tui-pagination';
import debounce from 'lodash.debounce';
import { renderMarkup } from '../templates/cardTemplate.js';
import { fetchPopularMovies, fetchGenres, fetchMoviesSearchQuery } from '../scripts/services/API';
import { success, failure } from './notification';
// import { getTrends } from './searchMovie.js';
import { getMovies } from './headerLibrary.js';
import { getRefs } from '../scripts/refs';

const { container, footer } = getRefs();

const DEBOUNCE_DELAY = 500;

const search = document.querySelector('.header-form');
const collectionEl = document.querySelector('.collection');

const form = document.querySelector('.header-form__input');

const PER_PAGE = 20;
export const options = {
  totalItems: 10000,
  itemsPerPage: PER_PAGE,
  visiblePages: 5,
  page: 0,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};

export let pagination = new Pagination(container, options);

let page = pagination.getCurrentPage();

pagination.on('afterMove', getMovies);
let inputValue = search.headerInput.value;
// async function initPage() {
//   try {
//     const data = await fetchMoviesSearchQuery(inputValue, page);
//     const loadGenres = await fetchGenres();
//     pagination.reset(data.total_results);
//     renderMarkup(data);

//     console.log(data);
//   } catch (error) {}
// }

// initPage();

export async function searchMovie({ page }) {
  if (inputValue === '') {
    return;
  }

  console.log(page);

  collectionEl.textContent = '';
  const getMovies = await fetchMoviesSearchQuery(inputValue, page);

  const loadGenres = await fetchGenres();
 
  // pagination.reset(getMovies.total_results);
  return renderMarkup(getMovies, loadGenres);
}

form.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));
// search.addEventListener('submit', onFormSubmitSearch);

export async function onFormInput(evt) {
  evt.preventDefault();
  if (evt.target.value === '') {
    pagination.off('afterMove', searchMovie);
    pagination.on('afterMove', getMovies);

    return getMovies(page);
  }
  if (footer.classList.length >= 2) {
    footer.classList.remove('.top_movies__footer');
    footer.classList.remove('.upcoming_movies__footer');
  }
  inputValue = search.headerInput.value;

  collectionEl.textContent = '';
  pagination.off('afterMove', getMovies);
  page = 1;
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

  pagination.reset(moviesByKeyWord.total_results);

  pagination.on('afterMove', searchMovie);
}

// async function onFormSubmitSearch(evt) {
//   evt.preventDefault();

//   if (search.headerInput.value === '') {
//     return warning();
//   } else {
//     inputValue = search.headerInput.value;
//     searchMovie();
//     evt.currentTarget.reset();
//     clearLocalStorage();
//     collectionEl.textContent = '';

//     pagination.off('afterMove', getMovies);

//     const moviesByKeyWord = await fetchMoviesSearchQuery(inputValue, page);
//     console.log(moviesByKeyWord);
//     const loadGenres = await fetchGenres();
//     console.log(loadGenres);
//     renderMarkup(moviesByKeyWord, loadGenres);

//     pagination.reset(moviesByKeyWord.total_results);

//     pagination.on('afterMove', searchMovie);
//   }
// }

// async function loadMovies(event) {
//   collectionEl.textContent = '';
//   const response = await fetchPopularMovies(event.page);
//   console.log(response.results);
//   const loadGenres = await fetchGenres();

//   return renderMarkup(response.results, loadGenres);
// }

// async function onFormChange(evt) {
//   evt.preventDefault();

//   const inputValue = search.headerInput.value;
//   const moviesByKeyWord = await fetchMoviesSearchQuery(inputValue);
//   const loadGenres = await fetchGenres();

//   // console.log(evt.target.value);
//   // if (evt.target.value === '') {
//   //   collectionEl.textContent = '';
//   //   pagination.off('afterMove', moviesByKeyWord);
//   //   pagination.on('afterMove', getTrends);
//   // }

//   console.log(inputValue);

//   collectionEl.textContent = '';

//   console.log(moviesByKeyWord);
//   renderMarkup(moviesByKeyWord.results, loadGenres);

//   pagination.reset(moviesByKeyWord.total_results);

//   if (evt.target.value === '') {
//     collectionEl.textContent = '';
//     pagination.off('afterMove', moviesByKeyWord);
//     pagination.on('afterMove', getTrends);
//   }
//   // pagination.on('afterMove', loadMovies);
// }

// export default paginationDefault;
