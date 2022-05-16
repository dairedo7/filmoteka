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
import { onFormInput, pagination } from './pagination';
import { getMovies } from './headerLibrary';
import { infScroll } from './infiniteScroll';
import { getRefs } from '../scripts/refs';
import { searchMovie } from './pagination';

// const formIntput = document.querySelector('header-form__input');
const {
  search,
  gallery,
  genreSelect,
  container,
  DEBOUNCE_DELAY,
  STORAGE_KEY,
  LOCAL_STORAGE_DELAY,
  footer,
} = getRefs();

let formData = {};

userData();
search.addEventListener('submit', onFormSubmitSearch);
// search.addEventListener('input', debounce(onKeyWordSearch, DEBOUNCE_DELAY));
search.addEventListener('input', throttle(onInputSaveData, LOCAL_STORAGE_DELAY));
genreSelect.addEventListener('change', onGenresSelect);

// Функция фильтрации фильмов по жанрам
let genreId;
export async function onGenresSelect(event) {
  footer.classList.remove('.top_movies__footer');
  footer.classList.remove('.upcoming_movies__footer');
  container.classList.remove('visually-hidden');
  genreId = event.target.value;
  const moviesByGenre = await fetchGenresById(genreId);

  startSpin();
  const loadGenres = await fetchGenres();
  clearPage();
  stopSpin();
  search.headerInput.value = '';

  renderMarkup(moviesByGenre, loadGenres);

  clearLocalStorage();
}
// // Поиск по ключевому слову
// function onKeyWordSearch(evt) {
//   evt.preventDefault();
//   if (footer.classList.length >= 2) {
//     footer.classList.remove('.top_movies__footer');
//     footer.classList.remove('.upcoming_movies__footer');
//   }
//   if (evt.target.value === '') {
//     gallery.textContent = '';
//     pagination.off('beforeMove', searchMovie);
//     pagination.on('afterMove', getMovies);

//     getTrends();
//   } else {
//     console.log('worked');
//     searchMovie();
//   }
// }

// Поиск по сабмиту формы

function onFormSubmitSearch(evt) {
  evt.preventDefault();

  if (search.headerInput.value === '') {
    // gallery.innerHTML = '<h2>Sorry, we found no movies by your request</h2>'
    fetchPopularMovies();
    return warning();
    
  }
  
  // else {
  //   onFormInput(evt);
  //   evt.currentTarget.reset();
  //   clearLocalStorage();
  // }
}
// Очистка страницы
function clearPage() {
  gallery.innerHTML = '';
}
// Функция поиска фильма и уведомлений

export async function searchMovieByQuery() {
  try {
    const inputValue = search.headerInput.value.trim();

    const moviesByKeyWord = await fetchMoviesSearchQuery(inputValue, page);
    console.log(page);

    const loadGenres = await fetchGenres();
    startSpin();
    clearPage();

    stopSpin();
    console.log(moviesByKeyWord.total_results);
    pagination.reset(moviesByKeyWord.total_results);
    renderMarkup(moviesByKeyWord, loadGenres);

    success(moviesByKeyWord.total_results);
  } catch (error) {
    console.log(error);
  }
}

// let page = pagination.getCurrentPage();
// console.log(page);
let page = 0;
async function getTrends() {
  page += 1;
  const response = await fetchPopularMovies(page);
  const theGenres = await fetchGenres();

  return renderMarkup(response, theGenres);
}
getTrends();
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
