import { renderMarkup } from '../templates/cardTemplate.js';
import { fetchPopularMovies, fetchGenres } from '../scripts/services/API';
import { onMovieCardClick } from './modal.js';
import { onBtnTrailerClick } from '../templates/trailer-play.js';
import { getRefs } from '../scripts/refs';
import { paginationMain } from './pagination.js';
const { collectionEl } = getRefs();

collectionEl.addEventListener('click', evt => {
  if (evt.target === evt.currentTarget) {
    return;
  }
  if (!evt.target.id) {
    return;
  }
  if (evt.target.classList.contains('btn')) {
    console.log(evt.target);
    return onBtnTrailerClick(evt.target.id);
  }
  return onMovieCardClick(evt.target.id);
});

let page;

export async function getMovies() {
  collectionEl.innerHTML = '';
  page = 1;
  paginationMain.reset();
  const response = await fetchPopularMovies(page);

  const loadGenres = await fetchGenres();
  // pagination.reset(response.total_results);
  return renderMarkup(response, loadGenres);
}

getMovies();
