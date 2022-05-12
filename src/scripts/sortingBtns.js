import { renderMarkup } from '../templates/cardTemplate';
import { fetchTopRatedMovies, fetchUpcomingMovies, fetchGenres } from './services/API';
import { getMovies } from './renderMainPage';
import { startSpin, stopSpin } from './spinner';
import { infScroll } from './infiniteScroll';

const collectionEl = document.querySelector('.collection');
const buttonsList = document.querySelector('.buttons__list');
const topMoviesBtn = document.querySelector('[data-action="top_rated"]');
const upcomingMoviesBtn = document.querySelector('[data-action="upcoming"]');
const trendingMoviesBtn = document.querySelector('[data-action="trending"]');
const pagination = document.getElementById('pagination');
const footer = document.querySelector('footer');

buttonsList.addEventListener('click', onBtnClick);

function onBtnClick(evt) {
  //   console.log(evt.target === topMoviesBtn);

  evt.preventDefault();
  if (evt.target === topMoviesBtn) {
    collectionEl.textContent = '';
    pagination.classList.add('visually-hidden');
    footer.classList.add('.top_movies__footer');
    footer.classList.remove('.upcoming_movies__footer');
    let currentFooter = footer;

    infScroll(currentFooter);
  }
  if (evt.target === upcomingMoviesBtn) {
    collectionEl.textContent = '';
    pagination.classList.add('visually-hidden');
    footer.classList.add('.upcoming_movies__footer');
    footer.classList.remove('.top_movies__footer');
    let currentFooter = footer;

    infScroll(currentFooter);
  }
  if (evt.target === trendingMoviesBtn) {
    collectionEl.textContent = '';

    pagination.classList.remove('visually-hidden');
    footer.classList.remove('.upcoming_movies__footer');
    footer.classList.remove('.top_movies__footer');
    startSpin();
    getMovies();
    stopSpin();
  }
}

//Receiving the collection of top-rated movies
let topPage = 0;
export async function getTopMovies() {
  upcomingPage = 0;
  topPage += 1;
  const response = await fetchTopRatedMovies(topPage);
  const loadGenres = await fetchGenres();
  console.log(response);

  return renderMarkup(response, loadGenres);
}

//Receiving the collection of the upcoming movies
let upcomingPage = 0;
export async function getUpcomingMovies() {
  topPage = 0;
  upcomingPage += 1;
  const response = await fetchUpcomingMovies(upcomingPage);
  const loadGenres = await fetchGenres();
  console.log(response);

  return renderMarkup(response, loadGenres);
}
