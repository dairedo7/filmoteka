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
  backgroundImg: document.querySelector('.collection__item'),
};

//Variables for objects-array conversion from array of id's
let movieDetailsArr = [];
let movieQueueArr = [];

//watchedBtn & queuedBtn Listeners
refs.watchedBtn.addEventListener('click', getMovieDets);
refs.queuedBtn.addEventListener('click', getMovieQueue);

let dets;

refs.backgroundImg.onclick = evt => {
  console.log(evt.target);
  getMovieDets();
};
//Collection of localStorage watched movies
async function getMovieDets(id) {
  //   console.log(getWatchedMovies());
  refs.collectionEl.textContent = '';
  //Adding the orange color & shadow to the active class
  refs.watchedBtn.classList.add('is_active');
  refs.queuedBtn.classList.remove('is_active');
  id = getWatchedMovies();
  startSpin();

  //Enumerating through id's of locally saved movies to insert them into the array of objects

  movieDetailsArr = [];
  if (id.length === 0) {
    stopSpin();
    refs.collectionEl.innerHTML =
      '<li class="item__empty"><h2>You have not watched any movies yet!</h2></li>';
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
  // console.log(getQueueMovies());
  refs.collectionEl.textContent = '';
  //Adding the orange color & shadow to the active class
  refs.queuedBtn.classList.add('is_active');
  refs.watchedBtn.classList.remove('is_active');

  startSpin();
  id = getQueueMovies();
  if (id.length === 0) {
    stopSpin();
    refs.collectionEl.innerHTML =
      '<li class="item__empty"><h2>You have not added any films to your queue!</h2></li>';
  }
  //Enumerating through id's of locally saved movies to insert them into the array of objects
  let dets;
  movieQueueArr = [];
  for (const item of id) {
    if (item) {
      dets = await fetchMovieDetails(item);
      movieQueueArr.push(dets);

      stopSpin();
    }
  }

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

//Removing movies from watched on modal button clicks

async function fetchMovieDets(id) {
  if (id) {
    details = await fetchMovieDetails(id);
  }
}

// modal events
const modalEl = document.querySelector('.modal-container');

modalEl.addEventListener('click', evt => {
  console.log(movieDetailsArr);

  const watchedBtnEl = document.querySelector('.modal-btn__watched');
  const queueBtnEl = document.querySelector('.modal-btn__queue');
  console.log(watchedBtnEl.textContent);
  console.log(evt.target.textContent);
  console.log(evt.target.id);
  if (watchedBtnEl.textContent === 'add to Watched') {
    let newArr = [];
    for (const item of movieDetailsArr) {
      console.log(dets.id);
      console.log(item.id);
      if (item.id === dets.id) {
      }
    }
    // movieDetailsArr.map((item) => {
    //   // const itemIndex = movieDetailsArr.indexOf(item.id);
    //   // console.log(itemIndex);
    //   console.log(dets);
    //   console.log(dets.id);
    //   console.log(item.id);
    //   console.log(movieDetailsArr.item);
    //   return item.id === dets.id ? movieDetailsArr.pop() : item;

    //   // console.log(result);
    //   // return result;
    // });
    // console.log(dets);
  }
});

// function onWatchedBtnClick() {
//   console.log(dets.id);
// }

// function onQueueBtnClick() {}
