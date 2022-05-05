import markup from '../templates/cardTemplate.hbs';
import { fetchPopularMovies } from '../scripts/services/API';

const collectionEl = document.querySelector('.collection');

let page;
async function getMovies() {
  page = 1;
  const response = await fetchPopularMovies(page);
  console.log(response);
  return renderMarkup(response);
}

function renderMarkup(res) {
  return collectionEl.insertAdjacentHTML('beforeend', markup(res));
}

getMovies();
console.log(getMovies(page));
