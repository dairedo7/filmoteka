// import localStorageCollections from './headerLibrary';
import { getMovies } from './headerLibrary';
const refs = {
  header: document.querySelector('.header'),
  headerLibrary: document.querySelector('.header-library'),
  libraryLogo: document.querySelector('.library-navigation__logo'),
  libraryNavigation: document.querySelector('.library-navigation'),
  headerNavigation: document.querySelector('.header-box'),
  collectionEl: document.querySelector('.collection'),
  headerTitle: document.querySelector('.header-box__title'),
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
  }
}

function onLogoClick(evt) {
  console.log(evt.target);
  evt.preventDefault();

  refs.headerLibrary.classList.add('visually-hidden');
  refs.header.classList.remove('visually-hidden');
  refs.collectionEl.textContent = '';
  getMovies();
}
