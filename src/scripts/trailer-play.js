const backdropTrailerContainerEl = document.querySelector('.backdrop__trailer');
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
