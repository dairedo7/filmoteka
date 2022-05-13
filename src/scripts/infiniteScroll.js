import { getTopMovies, getUpcomingMovies } from './sortingBtns.js';
import { startSpin, stopSpin } from './spinner';

export function infScroll(element) {
  let topMoviesFooter = document.querySelector('.top_movies__footer');
  let upcomingMoviesFooter = document.querySelector('upcoming_movies__footer');

  //Adding IntersectionObserver instance
  const observer = new IntersectionObserver(onEntry, {
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  });

  //Adding elements to observe for intersection
  function onEntry(entries, observer) {
    entries.forEach(entry => {
      const defaultClass = entry.target.classList[1];
      const darkTheme = entry.target.classList[2];
      const darkFooter = 'dark-footer';
      const topMoviesClass = '.top_movies__footer';
      const upcMoviesClass = '.upcoming_movies__footer';

      if (entry.isIntersecting) {
        //Removing observer from footer when out of the top-movies or upcoming-movies scope
        if (!entry.target.classList[1]) {
          observer.unobserve(element);
        }
        //Removing observer when searching for a movie in the input field
        if (
          !element.classList.contains(topMoviesClass) ||
          !element.classList.contains(upcMoviesClass)
        ) {
          observer.unobserve(element);
        }
        //Adding observer for top-movies and upcoming movies collections
        if (
          defaultClass === topMoviesClass ||
          (darkTheme === topMoviesClass && defaultClass === darkFooter)
        ) {
          startSpin();
          getTopMovies();
          stopSpin();
        }
        if (
          defaultClass === upcMoviesClass ||
          (darkTheme === upcMoviesClass && defaultClass === darkFooter)
        ) {
          startSpin();
          getUpcomingMovies();
          stopSpin();
        }
      }
    });
  }
  observer.observe(element);
}
