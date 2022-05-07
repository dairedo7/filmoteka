import { fetchMovieDetails } from './services/API';
import { renderMovieDetails } from './render-movie-details';
import { renderWatchedQueueButtons } from './render-watched-queue-btn';

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

export function onMovieCardClick(id) {
  backdropEl.classList.remove('is-hidden');

  if (id) {
    fetchMovieDetails(id)
      .then(details => {
        getData();
        getDataQ();

        renderMovieDetails(details);

        const modalButtonsEl = document.querySelector('.modal-buttons');
        renderWatchedQueueButtons(details, modalButtonsEl);

        const watchedBtnEl = document.querySelector('.modal-btn__watched');
        watchedBtnEl.addEventListener('click', onWatchedBtnClick);
        function onWatchedBtnClick() {
          const { title, id } = details;
          if (checkedWatchedMovie(title)) {
            removeWatchedMovie(title);
          } else {
            setNewWatchedMovie(title, id);
          }
          renderWatchedQueueButtons(details, modalButtonsEl);
        }

        const queueBtnEl = document.querySelector('.modal-btn__queue');
        queueBtnEl.addEventListener('click', onQueueBtnClick);
        function onQueueBtnClick() {
          const { title, id } = details;
          if (checkedQueueMovie(title)) {
            removeQueueMovie(title);
          } else {
            setNewQueueMovie(title, id);
          }
          renderWatchedQueueButtons(details, modalButtonsEl);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
}

// modal closing
const closeBtnEl = document.querySelector('.modal-close-btn');
closeBtnEl.addEventListener('click', onCloseBtnClick);
function onCloseBtnClick() {
  backdropEl.classList.add('is-hidden');
}

backdropEl.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
if (event.currentTarget === event.target) {
onCloseBtnClick()  }
};

  window.addEventListener('keydown', onEscPress);

  function onEscPress(event) {

  if (event.code === 'Escape') {
onCloseBtnClick()
  }
}
