import { renderMarkup } from '../templates/cardTemplate';
import { getWatchedMovies, getQueueMovies } from './localStorage';
import { fetchMovieDetails } from './services/API';
import { renderWatched } from '../templates/libraryTemplate.js';
import { fetchPopularMovies, fetchGenres } from './services/API';
import { startSpin, stopSpin } from './spinner';

const refs = {
  watchedBtn: document.querySelector('[data-btn="watched"]'),
  queuedBtn: document.querySelector('[data-btn="queue"]'),
  collectionEl: document.querySelector('.collection'),
};

//Variables for objects-array conversion from array of id's
let movieDetailsArr = [];
let movieQueueArr = [];

//watchedBtn & queuedBtn Listeners
refs.watchedBtn.addEventListener('click', getMovieDets);
refs.queuedBtn.addEventListener('click', getMovieQueue);

//Collection of localStorage watched movies
async function getMovieDets(id) {
  //   console.log(getWatchedMovies());
  refs.collectionEl.textContent = '';
  id = getWatchedMovies();
  startSpin();

  //Enumerating through id's of locally saved movies to insert them into the array of objects
  let dets;
  movieDetailsArr = [];
  for (const item of id) {
    if (item) {
      dets = await fetchMovieDetails(item);
      stopSpin();
    }
    movieDetailsArr.push(dets);
  }

  //Inserting the movie collection to render in the markup
  return renderWatched(movieDetailsArr);
}

//Collection of localStorage queued movies
async function getMovieQueue(id) {
  // console.log(getQueueMovies());
  refs.collectionEl.textContent = '';
  startSpin();
  id = getQueueMovies();

  //Enumerating through id's of locally saved movies to insert them into the array of objects
  let dets;
  movieQueueArr = [];
  for (const item of id) {
    if (item) {
      dets = await fetchMovieDetails(item);
      stopSpin();
    }
    movieQueueArr.push(dets);
  }

  // console.log(dets);

  return renderWatched(movieQueueArr);
}

//Getting Trending Movies to display on the main page after visiting of the library-page
let page;
export async function getMovies() {
  page = 1;
  const response = await fetchPopularMovies(page);
  const loadGenres = await fetchGenres();
  // console.log(loadGenres);

  return renderMarkup(response.results, loadGenres);
}

// export default localStorageCollections;
