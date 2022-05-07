import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

const modalContainerEl = document.querySelector('.modal-container');
export function renderMovieDetails(movieDetails) {
  // id
  const {
    genres,

    original_title,
    overview,
    popularity,
    poster_path,
    title,
    vote_average,
    vote_count,
  } = movieDetails;
  const twoGenres = genres.map(({ name }) => `${name}`).slice(0, 2);
  twoGenres.splice(2, 0, 'other');

  const movieDetailsEl = `<img src="https://image.tmdb.org/t/p/original${poster_path}" alt="постер" class="modal-img" />
      <div class="modal-description">
        <h2 class="modal-title">${title}</h2>
        <ul class="modal-list">
          <li class="modal-item">
            <p class="modal-key">Vote / Votes</p>
            <p class="modal-values">
              <span class="modal-vote">${vote_average}</span><span class="modal-slash"> / </span
              ><span class="modal-votes">${vote_count}</span>
            </p>
          </li>
          <li class="modal-item">
            <p class="modal-key">Popularity</p>
            <p class="modal-values">${popularity}</p>
          </li>
          <li class="modal-item">
            <p class="modal-key">Original Title</p>
            <p class="modal-values">${original_title}</p>
          </li>
          <li class="modal-item">
            <p class="modal-key">Genre</p>
            <p class="modal-values">${twoGenres.join(', ')}</p>
          </li>
        </ul>
        <div class="modal-overview">
          <p>About</p>
          <p class="modal-text">
            ${overview}
          </p>
        </div>
        <div class="modal-buttons">
        </div>
      </div>`;

  modalContainerEl.innerHTML = movieDetailsEl;
}
