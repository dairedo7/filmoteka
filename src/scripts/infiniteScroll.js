import { renderMarkup } from '../templates/cardTemplate.js';
import { renderWatched } from '../templates/libraryTemplate.js';
import { getTopMovies, getUpcomingMovies } from './sortingBtns.js';
import { startSpin, stopSpin } from './spinner';
import { searchMovie } from './searchMovie';
export function infScroll(element) {
  let topMoviesFooter = document.querySelector('.top_movies__footer');
  let upcomingMoviesFooter = document.querySelector('upcoming_movies__footer');

  //Adding IntersectionObserver instance
  const observer = new IntersectionObserver(onEntry, {
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  });

  function onEntry(entries, observer) {
    entries.forEach(entry => {
      let target = entry;
      console.log(entry);
      if (entry.isIntersecting) {
        // console.log(!entry.target.classList[1]);
        if (!entry.target.classList[1]) {
          observer.unobserve(element);
        }
        if (entry.target.classList[1] === '.top_movies__footer') {
          startSpin();
          getTopMovies();
          stopSpin();
          // observer.unobserve(element);
        }
        if (entry.target.classList[1] === '.upcoming_movies__footer') {
          // observer.unobserve(element);
          // if (!element.classList.contains('.top_movies__footer')) {
          //   observer.unobserve(element);
          // }

          startSpin();
          getUpcomingMovies();
          stopSpin();
        }
        // console.log();
      }
      // if(entry.target)
    });
  }
  observer.observe(element);
}
