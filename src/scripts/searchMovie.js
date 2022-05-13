import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import {
  fetchMoviesSearchQuery,
  fetchPopularMovies,
  fetchGenres,
  fetchGenresById,
} from './services/API';
import { failure, warning, success } from './notification';
import { renderMarkup } from '../templates/cardTemplate';
import { startSpin, stopSpin } from './spinner';
import { pagination } from './pagination';
import { getMovies } from './headerLibrary';
import { infScroll } from './infiniteScroll';
import { getRefs } from '../scripts/refs';
// const formIntput = document.querySelector('header-form__input');
const { search, gallery, genreSelect, container, DEBOUNCE_DELAY, STORAGE_KEY,  LOCAL_STORAGE_DELAY} = getRefs();

let formData = {};

userData();
search.addEventListener('submit', onFormSubmitSearch);
search.addEventListener('input', debounce(onKeyWordSearch, DEBOUNCE_DELAY));
search.addEventListener('input', throttle(onInputSaveData, LOCAL_STORAGE_DELAY));
genreSelect.addEventListener('change', onGenresSelect);

// Функция фильтрации фильмов по жанрам
async function onGenresSelect(evt) {
  const genreId = evt.target.value;
  const moviesByGenre = await fetchGenresById(genreId);

  startSpin();
  const loadGenres = await fetchGenres();
  clearPage();
  stopSpin();
  search.headerInput.value = '';
  renderMarkup(moviesByGenre, loadGenres);
  clearLocalStorage();
}
// Поиск по ключевому слову
function onKeyWordSearch(evt) {
  evt.preventDefault();
  if (evt.target.value === '') {
    gallery.textContent = '';
    pagination.off('afterMove', searchMovie);
    pagination.on('afterMove', getMovies);

    return getTrends();
  } else {
    searchMovie();
  }
}

// Поиск по сабмиту формы
function onFormSubmitSearch(evt) {
  evt.preventDefault();

  // console.log(evt.currentTarget.elements.headerInput.value);
  if (search.headerInput.value === '') {
    return warning();

    console.log(evt.currentTarget.elements.headerInput.value);
  } else {
    searchMovie();
    evt.currentTarget.reset();
    clearLocalStorage();
  }
}
// Очистка страницы
function clearPage() {
  gallery.innerHTML = '';
}
// Функция поиска фильма и уведомлений

export async function searchMovie(evt) {
  try {
    const inputValue = search.headerInput.value.trim();

    const moviesByKeyWord = await fetchMoviesSearchQuery(inputValue);
    const loadGenres = await fetchGenres();
    startSpin();
    clearPage();

    stopSpin();

    renderMarkup(moviesByKeyWord, loadGenres);
    // pagination.reset(moviesByKeyWord.total_results);
    if (moviesByKeyWord.total_results < 20) {
      container.classList.add('visually-hidden');
    } else {
      container.classList.remove('visually-hidden');
    }

    success(moviesByKeyWord.total_results);
  } catch (error) {
    console.log(error);
  }
}

let page = pagination.getCurrentPage();
async function getTrends(event) {
  const response = await fetchPopularMovies(page);
  const theGenres = await fetchGenres();
  console.log(response);

  return renderMarkup(response, theGenres);
}

// pagination.on('afterMove', getTrends);
// Функция сохранения данных в локальное хранилище
function onInputSaveData(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
// Функция сохранения данных в локальное хранилище
function userData() {
  const savedUserData = localStorage.getItem(STORAGE_KEY);
  const parsedUserData = JSON.parse(savedUserData);
  if (!savedUserData) {
    return;
  }
  if (savedUserData) {
    Object.entries(parsedUserData).forEach(([name, value]) => {
      if (!search.elements[name]) return;
      formData[name] = value;
      search.elements[name].value = value;
    });
  }
}

// функция очистки localStorage
function clearLocalStorage() {
  formData = {};
  localStorage.removeItem(STORAGE_KEY);
}
