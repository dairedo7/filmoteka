import { checkedWatchedMovie } from './localStorage';
import { checkedQueueMovie } from './localStorage';

export function renderWatchedQueueButtons(usedDetails, modalButtonsEl) {
  const { title } = usedDetails;

  const isMovieWathed = checkedWatchedMovie(title);
  const isMovieQueue = checkedQueueMovie(title);

  const watchedQueueBtnEl = `<button class="modal-btn__watched modal-btn btn">${
    isMovieWathed ? `remove from` : `add to`
  } Watched</button>
          <button class="modal-btn__queue modal-btn btn">${
            isMovieQueue ? `remove from` : `add to`
          } queue</button>`;

  modalButtonsEl.innerHTML = watchedQueueBtnEl;
}
