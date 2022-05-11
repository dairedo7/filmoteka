const collectionEl = document.querySelector('.collection');
export function renderWatched(res, genres) {
  const defaultPoster = `https://i.pinimg.com/564x/e4/71/1e/e4711e46bea5264eaab661d643285ff6.jpg`;

  const response = res
    .map(({ id, poster_path, title, genres, release_date, vote_average }) => {
      const getGenres = genres.map(({ name }) => name).slice(0, 2);
      getGenres.splice(2, 0, 'Other');
      const poster = `https://image.tmdb.org/t/p/w500` + poster_path;

      return `
        <li class='item'>
          <div class='item__box'>
            <img
              class='item__img'
              id='${id}'
              src='${poster_path ? poster : defaultPoster}'
              alt='${title}'
            />
          </div>

          <h2 class='item__title'>${title}</h2>

          <div class='wrapper'>
            <ul class='genres'>

              <li class='genres__item'>${getGenres.join(', ')}</li> 

            </ul>
            <span class='item__year'>${release_date}</span>
            <span class='item__rating'>${vote_average}</span>
          </div>
        </li>
    `;
    })
    .join('');
  // console.log(response);
  return collectionEl.insertAdjacentHTML('beforeend', response);
}
