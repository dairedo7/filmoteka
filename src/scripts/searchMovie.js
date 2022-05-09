import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import { fetchMoviesSearchQuery, fetchPopularMovies, fetchGenres } from './services/API';
import { failure } from './notification';
import { warning } from './notification';
import { success } from './notification';
import { renderMarkup } from '../templates/cardTemplate';
import { startSpin, stopSpin } from './spinner';

const collectionEl = document.querySelector('.collection');

let formData = {};
const DEBOUNCE_DELAY = 300;
const STORAGE_KEY = 'search-form-state';
const LOCAL_STORAGE_DELAY = 500;
const refs = {
  search: document.querySelector('.header-form'),
  gallery: document.querySelector('.collection'),
};

userData();
refs.search.addEventListener('submit', onFormSubmitSearch);
refs.search.addEventListener('input', debounce(onKeyWordSearch, DEBOUNCE_DELAY));
refs.search.addEventListener('input', throttle(onInputSaveData, LOCAL_STORAGE_DELAY));
// Поиск по ключевому слову
function onKeyWordSearch(evt) {
  evt.preventDefault();
  if (evt.target.value === '') {
    collectionEl.textContent = '';
    return getTrends();
  }
  searchMovie();
}

// Поиск по сабмиту формы
function onFormSubmitSearch(evt) {
  evt.preventDefault();
  searchMovie();
  evt.currentTarget.reset();
  formData = {};
  localStorage.removeItem(STORAGE_KEY);
}
// Очистка страницы
function clearPage() {
  refs.gallery.innerHTML = '';
}
// Функция поиска фильма и уведомлений
export async function searchMovie(evt) {
  const inputValue = refs.search.headerInput.value;
  const moviesByKeyWord = await fetchMoviesSearchQuery(inputValue);
  startSpin();
  if (inputValue === '') {
    return failure();
  } else {
    clearPage();
    const loadGenres = await fetchGenres();
    stopSpin();
    console.log(moviesByKeyWord);
    renderMarkup(moviesByKeyWord.results, loadGenres);
    success(moviesByKeyWord.total_results);
  }

  // else if (moviesByKeyWord.total_pages < 1) {
  //         return warning();
  //    }
}
let page;
async function getTrends() {
  page = 1;
  const response = await fetchPopularMovies(page);
  const theGenres = await fetchGenres();
  // console.log(loadGenres);

  return renderMarkup(response.results, theGenres);
}

// Функция сохранения данных в локальное хранилище
function onInputSaveData(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
// Функция сохранения данных в локальное хранилище
function userData() {
  const savedUserData = localStorage.getItem(STORAGE_KEY);
  const parsedUserData = JSON.parse(savedUserData);
  if (savedUserData) {
    Object.entries(parsedUserData).forEach(([name, value]) => {
      formData[name] = value;
      refs.search.elements[name].value = value;
    });
  }
}
