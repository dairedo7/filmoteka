import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import { fetchMoviesSearchQuery, fetchPopularMovies, fetchGenres, fetchGenresById } from './services/API';
import { failure, warning, success } from './notification';
import { renderMarkup } from '../templates/cardTemplate';
import { startSpin, stopSpin } from './spinner';


let formData = {};
const DEBOUNCE_DELAY = 500;
const STORAGE_KEY = 'search-form-state';
const LOCAL_STORAGE_DELAY = 500;
const refs = {
  search: document.querySelector('.header-form'),
  gallery: document.querySelector('.collection'),
  genresForm: document.querySelector('.genres-form'),
};

userData();
refs.search.addEventListener('submit', onFormSubmitSearch);
refs.search.addEventListener('input', debounce(onKeyWordSearch, DEBOUNCE_DELAY));
refs.search.addEventListener('input', throttle(onInputSaveData, LOCAL_STORAGE_DELAY));
refs.genresForm.addEventListener('change', onGenresSelectClick);

async function onGenresSelectClick(evt) {
  const genreId = evt.target.value;
   const moviesByGenre = await fetchGenresById(genreId);
  const loadGenres = await fetchGenres();
  clearPage();
  renderMarkup(moviesByGenre, loadGenres);
  refs.search.headerInput.value = '';
  formData = {};
  localStorage.removeItem(STORAGE_KEY);

}
// Поиск по ключевому слову
function onKeyWordSearch(evt) {
  evt.preventDefault();
  if (evt.target.value === '') {
    refs.gallery.textContent = '';
    return getTrends();
  }
  searchMovie();
}

// Поиск по сабмиту формы
function onFormSubmitSearch(evt) {
  evt.preventDefault();
  if (refs.search.headerInput.value === '') {
    return warning();
  }
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
async function searchMovie() {
  const inputValue = refs.search.headerInput.value.trim();
  const moviesByKeyWord = await fetchMoviesSearchQuery(inputValue);
  startSpin();

    clearPage();
    const loadGenres = await fetchGenres();
    stopSpin();
    renderMarkup(moviesByKeyWord.results, loadGenres);
    success(moviesByKeyWord.total_results);

  // else if (moviesByKeyWord.total_pages < 1) {
  //         return warning();
  //    }
}
let page;
async function getTrends() {
  page = 1;
  const response = await fetchPopularMovies(page);
  const theGenres = await fetchGenres();
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
