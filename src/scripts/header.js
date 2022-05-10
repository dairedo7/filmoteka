// import localStorageCollections from './headerLibrary';
import { getTrends } from './searchMovie';
import { getMovies } from './headerLibrary';
import { emptyLibrary } from './emptyLibrary';
const refs = {
  header: document.querySelector('.header'),
  headerLibrary: document.querySelector('.header-library'),
  libraryLogo: document.querySelector('.library-navigation__logo'),
  libraryNavigation: document.querySelector('.library-navigation'),
  headerNavigation: document.querySelector('.header-box'),
  collectionEl: document.querySelector('.collection'),
  headerTitle: document.querySelector('.header-box__title'),

  pagination: document.getElementById('pagination'),
};

refs.libraryNavigation.addEventListener('click', onLibraryClick);
refs.headerNavigation.addEventListener('click', onHeaderClick);
refs.libraryLogo.addEventListener('click', onLogoClick);

function onLibraryClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'A') {
    return;
  }

  if (evt.target.textContent === 'Home') {
    refs.collectionEl.textContent = '';
    getMovies();
    refs.headerLibrary.classList.add('visually-hidden');
    refs.header.classList.remove('visually-hidden');
    refs.pagination.classList.remove('visually-hidden');
    refs.collectionEl.classList.remove('collection__background');
    refs.collectionEl.classList.remove('library__collection');
  }
}

function onHeaderClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'A') {
    return;
  }

  if (evt.target.textContent === 'MY LIBRARY') {
    refs.collectionEl.textContent = '';
    refs.headerLibrary.classList.remove('visually-hidden');
    refs.header.classList.add('visually-hidden');
    refs.collectionEl.innerHTML = '';
    refs.collectionEl.classList.add('collection__background');
    refs.collectionEl.insertAdjacentHTML('beforeend', emptyLibrary);
    refs.pagination.classList.add('visually-hidden');
  }
}

function onLogoClick(evt) {
  evt.preventDefault();

  refs.headerLibrary.classList.add('visually-hidden');
  refs.header.classList.remove('visually-hidden');
  refs.pagination.classList.remove('visually-hidden');
  refs.collectionEl.classList.remove('collection__background');
  refs.collectionEl.classList.remove('library__collection');
  refs.collectionEl.textContent = '';
  getMovies();
}
