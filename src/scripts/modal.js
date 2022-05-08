import { fetchMovieDetails } from './services/API';
import { renderMovieDetails } from './render-movie-details';
import { renderWatchedQueueButtons } from './render-watched-queue-btn';
import { startSpin, stopSpin } from './spinner';

let watchedMovies = {};
import { getData } from './localStorage';
import { setNewWatchedMovie } from './localStorage';
import { checkedWatchedMovie } from './localStorage';
import { removeWatchedMovie } from './localStorage';

let queueMovies = {};
import { getDataQ } from './localStorage';
import { setNewQueueMovie } from './localStorage';
import { checkedQueueMovie } from './localStorage';
import { removeQueueMovie } from './localStorage';

const backdropEl = document.querySelector('.backdrop');
const modalContainerEl = document.querySelector('.modal-container');

let details;
let modalButtonsEl;

//  open modal
export async function onMovieCardClick(id) {
  modalContainerEl.innerHTML = '';
  backdropEl.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscPress);
  document.body.style.overflow = 'hidden';

  startSpin();

  if (id) {
    details = await fetchMovieDetails(id);
  }

  getData();
  getDataQ();

  renderMovieDetails(details);

  modalButtonsEl = document.querySelector('.modal-buttons');
  renderWatchedQueueButtons(details, modalButtonsEl);
  stopSpin();
}

// modal events
const modalEl = document.querySelector('.modal-container');
modalEl.addEventListener('click', evt => {
  const watchedBtnEl = document.querySelector('.modal-btn__watched');
  const queueBtnEl = document.querySelector('.modal-btn__queue');

  if (watchedBtnEl === evt.target) {
    onWatchedBtnClick();
  } else if (queueBtnEl === evt.target) {
    onQueueBtnClick();
  }
});

// watched btn
function onWatchedBtnClick() {
  console.log(details);
  const { title, id } = details;
  if (checkedWatchedMovie(title)) {
    removeWatchedMovie(title);
  } else {
    setNewWatchedMovie(title, id);
  }
  renderWatchedQueueButtons(details, modalButtonsEl);
}

// queue btn
function onQueueBtnClick() {
  const { title, id } = details;
  if (checkedQueueMovie(title)) {
    removeQueueMovie(title);
  } else {
    setNewQueueMovie(title, id);
  }
  renderWatchedQueueButtons(details, modalButtonsEl);
}

// modal closing
const closeBtnEl = document.querySelector('.modal-close-btn');
closeBtnEl.addEventListener('click', onCloseBtnClick);
function onCloseBtnClick() {
  backdropEl.classList.add('is-hidden');
  window.removeEventListener('keydown', onEscPress);
  document.body.style.overflow = '';
}

backdropEl.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseBtnClick();
  }
}

function onEscPress(event) {
  if (event.code === 'Escape') {
    onCloseBtnClick();
  }
}
