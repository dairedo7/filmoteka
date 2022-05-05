import { renderMarkup } from '../templates/cardTemplate.js';
import { fetchPopularMovies, fetchGenres } from '../scripts/services/API';

let page;

async function getMovies() {
  page = 1;
  const response = await fetchPopularMovies(page);
  const loadGenres = await fetchGenres();
  console.log(loadGenres);

  return renderMarkup(response.results, loadGenres);
}

// function renderMarkup(res) {
//   return collectionEl.insertAdjacentHTML('beforeend', markup(res));
// }

getMovies();
