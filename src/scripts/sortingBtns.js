import { renderMarkup } from '../templates/cardTemplate';
import { fetchTopRatedMovies, fetchUpcomingMovies, fetchGenres } from './services/API';
import { getMovies } from './renderMainPage';
import { startSpin, stopSpin } from './spinner';
import { infScroll } from './infiniteScroll';
import { getRefs } from '../scripts/refs';

const {
  collectionEl,
  buttonsList,
  topMoviesBtn,
  upcomingMoviesBtn,
  trendingMoviesBtn,
  container,
  footer,
} = getRefs();

buttonsList.addEventListener('click', onBtnClick);

function onBtnClick(evt) {
  evt.preventDefault();
  if (evt.target === topMoviesBtn) {
    collectionEl.textContent = '';
    container.classList.add('visually-hidden');
    footer.classList.add('.top_movies__footer');
    footer.classList.remove('.upcoming_movies__footer');
    let currentFooter = footer;

    infScroll(currentFooter);
  }
  if (evt.target === upcomingMoviesBtn) {
    collectionEl.textContent = '';
    container.classList.add('visually-hidden');
    footer.classList.add('.upcoming_movies__footer');
    footer.classList.remove('.top_movies__footer');
    let currentFooter = footer;

    infScroll(currentFooter);
  }
  if (evt.target === trendingMoviesBtn) {
    collectionEl.textContent = '';

    container.classList.remove('visually-hidden');
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

  return renderMarkup(response, loadGenres);
}

//Receiving the collection of the upcoming movies
let upcomingPage = 0;
export async function getUpcomingMovies() {
  topPage = 0;
  upcomingPage += 1;
  const response = await fetchUpcomingMovies(upcomingPage);
  const loadGenres = await fetchGenres();

  return renderMarkup(response, loadGenres);
}
