import { renderMarkup } from '../templates/cardTemplate.js';
import { fetchPopularMovies, fetchGenres } from '../scripts/services/API';
import { onMovieCardClick } from './modal.js';
import { getRefs } from '../scripts/refs';

const { collectionEl } = getRefs();

collectionEl.addEventListener('click', evt => {
  if (evt.target === evt.currentTarget) {
    return;
  }
  if (!evt.target.id) {
    return;
  }
  return onMovieCardClick(evt.target.id);
});

let page;

export async function getMovies(page) {
  page = 1;
  const response = await fetchPopularMovies(page);

  const loadGenres = await fetchGenres();

  return renderMarkup(response, loadGenres);
}

getMovies();
