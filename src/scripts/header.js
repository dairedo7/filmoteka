// import localStorageCollections from './headerLibrary';
import { getRefs } from '../scripts/refs';
import { getTrends } from './searchMovie';
import { getMovies } from './renderMainPage';
import { emptyLibrary } from './emptyLibrary';
const {
  header,
  headerLibrary,
  libraryLogo,
  libraryNavigation,
  headerNavigation,
  collectionEl,
  headerTitle,
  buttonsList,
  pagination,
  footer,
} = getRefs();

libraryNavigation.addEventListener('click', onLibraryClick);
headerNavigation.addEventListener('click', onHeaderClick);
libraryLogo.addEventListener('click', onLogoClick);

function onLibraryClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'A') {
    return;
  }

  if (evt.target.textContent === 'Home') {
    collectionEl.textContent = '';
    getMovies();
    headerLibrary.classList.add('visually-hidden');
    header.classList.remove('visually-hidden');
    pagination.classList.remove('visually-hidden');
    collectionEl.classList.remove('collection__background');
    collectionEl.classList.remove('library__collection');
    buttonsList.classList.remove('visually-hidden');
  }
}

function onHeaderClick(evt) {
  if (evt.target.nodeName !== 'A') {
    return;
  }

  if (evt.target.textContent === 'MY LIBRARY') {
    collectionEl.textContent = '';
    headerLibrary.classList.remove('visually-hidden');
    header.classList.add('visually-hidden');
    collectionEl.innerHTML = '';
    collectionEl.classList.add('collection__background');
    collectionEl.insertAdjacentHTML('beforeend', emptyLibrary);
    pagination.classList.add('visually-hidden');
    buttonsList.classList.add('visually-hidden');
    footer.classList.remove('.top_movies__footer');
    footer.classList.remove('.upcoming_movies__footer');
  }
}

function onLogoClick(evt) {
  evt.preventDefault();
  headerLibrary.classList.add('visually-hidden');
  header.classList.remove('visually-hidden');
  pagination.classList.remove('visually-hidden');
  collectionEl.classList.remove('collection__background');
  collectionEl.classList.remove('library__collection');
  buttonsList.classList.remove('visually-hidden');
  collectionEl.textContent = '';

  getMovies();
}
