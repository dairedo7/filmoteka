import { onEscClick } from '../scripts/modal';
import { startSpin, stopSpin } from '../scripts/spinner';
import { fetchMovieTrailer } from '../scripts/services/API';
import { getRefs } from '../scripts/refs';

const { backdropTrailerContainerEl } = getRefs();
export function makeTrailer(trailerData) {
  const { key } = trailerData;

  const trailerEl = `<iframe
        class="trailer"
        
        src="https://www.youtube.com/embed/${key}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>`;

  backdropTrailerContainerEl.innerHTML = trailerEl;
}

export async function onBtnTrailerClick(id) {
  backdropTrailerContainerEl.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscClick);
  startSpin();

  const trailer = await fetchMovieTrailer(id);
  makeTrailer(trailer);

  stopSpin();
}
