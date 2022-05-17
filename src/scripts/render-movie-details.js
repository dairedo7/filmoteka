import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getRefs } from '../scripts/refs';

const { modalContainerEl } = getRefs();

export function renderMovieDetails(movieDetails) {
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

  let genre;
  if (genres.length === 1) {
    genre = genres.map(({ name }) => `${name}`);
  } else if (genres.length > 2) {
    const twoGenres = genres.map(({ name }) => `${name}`).slice(0, 2);
    twoGenres.splice(2, 0, 'other');
    genre = twoGenres.join(', ');
  } else {
    genre = genres.map(({ name }) => `${name}`).join(', ');
  }

  const defaultPoster = `https://i.pinimg.com/564x/e4/71/1e/e4711e46bea5264eaab661d643285ff6.jpg`;
  const poster = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const movieDetailsEl = `<img src="${
    poster_path ? poster : defaultPoster
  }" alt="постер" class="modal-img" />
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
            <p class="modal-values">${parseInt(popularity)}</p>
          </li>
          <li class="modal-item">
            <p class="modal-key">Original Title</p>
            <p class="modal-values">${original_title}</p>
          </li>
          <li class="modal-item">
            <p class="modal-key">Genre</p>
            <p class="modal-values">${genre}</p>
          </li>
          <li class="modal-item">
            <p class="modal-key">Trailer</p>
            <p class="modal-values"><button type="button" class="btn modal-play-btn fa-brands fa-youtube"></button></p>
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
