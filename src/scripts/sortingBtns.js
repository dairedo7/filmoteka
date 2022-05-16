import { renderMarkup } from '../templates/cardTemplate';
import { fetchTopRatedMovies, fetchUpcomingMovies, fetchGenres } from './services/API';
import { getMovies } from './renderMainPage';
import { startSpin, stopSpin } from './spinner';
import { infScroll } from './infiniteScroll';
import { getRefs } from '../scripts/refs';
import { searchMovie } from './pagination';

const {
  collectionEl,
  buttonsList,
  topMoviesBtn,
  upcomingMoviesBtn,
  trendingMoviesBtn,
  container,
  footer,
  search,
  genreSelect,
} = getRefs();

buttonsList.addEventListener('click', onBtnClick);

function onBtnClick(evt) {
  evt.preventDefault();
  if (evt.target === topMoviesBtn) {
    collectionEl.textContent = '';

    footer.classList.add('.top_movies__footer');
    footer.classList.remove('.upcoming_movies__footer');
    container.classList.add('visually-hidden');
    search.reset();
    let currentFooter = footer;

    infScroll(currentFooter);
  }
  if (evt.target === upcomingMoviesBtn) {
    collectionEl.textContent = '';

    footer.classList.add('.upcoming_movies__footer');
    footer.classList.remove('.top_movies__footer');
    container.classList.add('visually-hidden');
    search.reset();
    let currentFooter = footer;

    infScroll(currentFooter);
  }
  if (evt.target === trendingMoviesBtn) {
    collectionEl.textContent = '';

    footer.classList.remove('.upcoming_movies__footer');
    footer.classList.remove('.top_movies__footer');
    pagination.classList.remove('visually-hidden');
    search.reset();
    startSpin();
    getMovies();
    stopSpin();
  }
  genreSelect.reset();
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
