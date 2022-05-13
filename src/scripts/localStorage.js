// WATCHED
let watchedMovies = {};

// 1 get data
export function getData() {
    const savedData = localStorage.getItem('watched-movies');
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    watchedMovies = parsedData;
    return watchedMovies;
    }
}

// 2 set movie
export function setNewWatchedMovie(title, id) {
    watchedMovies[title] = id;
  
  localStorage.setItem('watched-movies', JSON.stringify(watchedMovies));
}

// 3 get [array] of watched movies id
export function getWatchedMovies() {
  if (getData()) {
    const ids = Object.values(watchedMovies);
    return ids;
  }
}

// 4 checked this movie
export function checkedWatchedMovie(title) {
  const isIn = watchedMovies.hasOwnProperty(`${title}`);
  return isIn;
}

// 5 remove movie
export function removeWatchedMovie(title) {
  if (checkedWatchedMovie(title)) {    
    delete watchedMovies.[title];   
      }

  localStorage.setItem('watched-movies', JSON.stringify(watchedMovies));
}



// QUEUE
let queueMovies = {};

// 1 get data
export function getDataQ() {
   const savedData = localStorage.getItem('queue-movies');
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    queueMovies = parsedData;
    return queueMovies;
      }
}

// 2 set movie
export function setNewQueueMovie(title, id) {
    queueMovies[title] = id;
  
  localStorage.setItem('queue-movies', JSON.stringify(queueMovies));
}

// 3 get [array] of queue movies id
export function getQueueMovies() {
  if (getDataQ()) {
    const ids = Object.values(queueMovies);
    return ids;
  }
}

// 4 checked this movie
export function checkedQueueMovie(title) {
  const isIn = queueMovies.hasOwnProperty(`${title}`);
  return isIn;
}

// 5 remove movie
export function removeQueueMovie(title) {
  if (checkedQueueMovie(title)) {    
    delete queueMovies.[title];   
    
  }

  localStorage.setItem('queue-movies', JSON.stringify(queueMovies));
}

