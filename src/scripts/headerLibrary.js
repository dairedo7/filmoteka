import { renderMarkup } from '../templates/cardTemplate';
import { getWatchedMovies, getQueueMovies } from './localStorage';
import { fetchMovieDetails } from './services/API';
import { renderWatched } from '../templates/libraryTemplate.js';
import { fetchPopularMovies, fetchGenres } from './services/API';
import { startSpin, stopSpin } from './spinner';
import { getRefs } from '../scripts/refs';
const { watchedBtn, queuedBtn, collectionEl, backgroundImg } = getRefs();
// import './pagination.js';

//Variables for objects-array conversion from array of id's
let movieDetailsArr = [];
let movieQueueArr = [];

//watchedBtn & queuedBtn Listeners
watchedBtn.addEventListener('click', getMovieDets);
queuedBtn.addEventListener('click', getMovieQueue);

let dets;
let queue;

//Collection of localStorage watched movies
async function getMovieDets(id) {
  const emptyLibraryNotification = (collectionEl.innerHTML =
    '<li class="item__empty"><h2>You have not watched any movies yet!</h2></li>');

  //Adding the orange color & shadow to the active class
  watchedBtn.classList.add('is_active');
  collectionEl.classList.add('library__collection');
  queuedBtn.classList.remove('is_active');
  collectionEl.classList.remove('collection__background');

  id = getWatchedMovies();

  //Enumerating through id's of locally saved movies to insert them into the array of objects
  emptyLibraryNotification;
  movieDetailsArr = [];
  if (id.length > 0) {
    startSpin();
    collectionEl.textContent = '';
  }

  for (const item of id) {
    if (item) {
      dets = await fetchMovieDetails(item);
      movieDetailsArr.push(dets);
      stopSpin();
    }
  }

  //Inserting the movie collection to render in the markup
  return renderWatched(movieDetailsArr);
}

//Collection of localStorage queued movies
async function getMovieQueue(id) {
  const emptyLibraryNotification = (collectionEl.innerHTML =
    '<li class="item__empty"><h2>You have not added any films to your queue!</h2></li>');

  //Adding the orange color & shadow to the active class
  queuedBtn.classList.add('is_active');
  collectionEl.classList.add('library__collection');
  watchedBtn.classList.remove('is_active');
  collectionEl.classList.remove('collection__background');

  id = getQueueMovies();

  emptyLibraryNotification;
  movieQueueArr = [];

  if (id.length > 0) {
    startSpin();
    collectionEl.textContent = '';
  }
  //Enumerating through id's of locally saved movies to insert them into the array of objects

  for (const item of id) {
    if (item) {
      queue = await fetchMovieDetails(item);
      movieQueueArr.push(queue);

      stopSpin();
    }
  }

  return renderWatched(movieQueueArr);
}

//Getting Trending Movies to display on the main page after visiting of the library-page
let page;
export async function getMovies(event) {
  page = 1;
  collectionEl.textContent = '';
  const response = await fetchPopularMovies(event.page);
  const loadGenres = await fetchGenres();

  return renderMarkup(response, loadGenres);
}

// Add or remove movie-item from library
const modalEl = document.querySelector('.modal-container');

modalEl.addEventListener('click', evt => {
  const watchedBtnEl = document.querySelector('.modal-btn__watched');
  const queueBtnEl = document.querySelector('.modal-btn__queue');

  if (watchedBtnEl.textContent === 'add to Watched') {
    for (const item of movieDetailsArr) {
      const itemIndex = movieDetailsArr.indexOf(item.id);
      if (item.id === dets.id) {
        movieDetailsArr.splice(itemIndex, 1);
      }
      return getMovieDets(item);
    }
  }
  if (watchedBtnEl.textContent === 'remove from Watched') {
    for (const item of movieDetailsArr) {
      if (item.id === dets.id) {
        movieDetailsArr.push(item.id, 1);
      }
      return getMovieDets(item);
    }
  }

  if (queueBtnEl.textContent === 'add to queue') {
    for (const item of movieQueueArr) {
      const itemIndex = movieQueueArr.indexOf(item.id);

      if (item.id === queue.id) {
        movieQueueArr.splice(itemIndex, 1);
      }
      return getMovieQueue(item);
    }
  }
  if (queueBtnEl.textContent === 'remove from queue') {
    for (const item of movieQueueArr) {
      if (item.id === queue.id) {
        movieQueueArr.push(item.id, 1);
      }
      return getMovieQueue(item);
    }
  }
});
