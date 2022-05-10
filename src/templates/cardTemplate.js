const collectionEl = document.querySelector('.collection');
export function renderMarkup(res, genres) {
  const defaultPoster = `https://i.pinimg.com/564x/e4/71/1e/e4711e46bea5264eaab661d643285ff6.jpg`;

  const response = res
    .map(({ id, poster_path, title, genre_ids, release_date, vote_average }) => {
      console.log(defaultPoster);
      const poster = `https://image.tmdb.org/t/p/w500` + poster_path;
      if (genre_ids.length > 3) {
        const other = 'Other';
        genre_ids[2] = other;

        genre_ids.length = 3;
      }

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
              ${genre_ids
                .map(item => {
                  return `
              <li class='genres__item'>${genres[item] || genre_ids[2]}</li> `;
                })
                .join('')}
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
