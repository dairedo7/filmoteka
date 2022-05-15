import { fetchMovieDetails } from './services/API';
import { renderMovieDetails } from './render-movie-details';
import { renderWatchedQueueButtons } from './render-watched-queue-btn';
import { startSpin, stopSpin } from './spinner';
import { getRefs } from '../scripts/refs';

import { fetchMovieTrailer } from './services/API';
import { makeTrailer } from '../templates/trailer-play';

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
import { missingTrailer } from './notification';

const { backdropEl, modalContainerEl, backdropTrailerContainerEl, modalEl, closeBtnEl } = getRefs();

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
modalEl.addEventListener('click', evt => {
  const watchedBtnEl = document.querySelector('.modal-btn__watched');
  const queueBtnEl = document.querySelector('.modal-btn__queue');
  const trailerBtnEl = document.querySelector('.modal-play-btn');

  if (watchedBtnEl === evt.target) {
    onWatchedBtnClick();
  } else if (queueBtnEl === evt.target) {
    onQueueBtnClick();
  } else if (trailerBtnEl === evt.target) {
    onTrailerBtnClick();
  }
});

// trailer btn
async function onTrailerBtnClick() {
  window.removeEventListener('keydown', onEscPress);
  backdropTrailerContainerEl.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscClick);
  startSpin();

  const { id } = details;
  const trailer = await fetchMovieTrailer(id);
  console.log(trailer);
  if (!trailer) {
    stopSpin();
    missingTrailer();
    backdropTrailerContainerEl.classList.add('is-hidden');
    return;
  } else {
    makeTrailer(trailer);

    stopSpin();
  }
}

// watched btn
function onWatchedBtnClick() {
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
closeBtnEl.addEventListener('click', onCloseBtnClick);
function onCloseBtnClick() {
  backdropEl.classList.add('is-hidden');
  window.removeEventListener('keydown', onEscPress);
  document.body.style.overflow = '';
}
function trailerClosed() {
  backdropTrailerContainerEl.innerHTML = '';
  backdropTrailerContainerEl.classList.add('is-hidden');
  window.removeEventListener('keydown', onEscClick);
  window.addEventListener('keydown', onEscPress);
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

backdropTrailerContainerEl.addEventListener('click', onBackdropTrailerClick);

function onBackdropTrailerClick(event) {
  if (event.currentTarget === event.target) {
    trailerClosed();
  }
}
export function onEscClick(event) {
  if (event.code === 'Escape') {
    trailerClosed();
  }
}
