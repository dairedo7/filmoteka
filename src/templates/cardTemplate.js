const collectionEl = document.querySelector('.collection');
export function renderMarkup(res, genres) {
  console.log(res);
  const response = res
    .map(({ id, poster_path, title, genre_ids, release_date, vote_average }) => {
      if (genre_ids.length > 3) {
        const other = 'Other';
        genre_ids[2] = other;
        console.log(genre_ids[2]);
        genre_ids.length = 3;
      }

      return `
        <li class='item'>
          <div class='item__box'>
            <img
              class='item__img'
              id='${id}'
              src='https://image.tmdb.org/t/p/w500${poster_path}'
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

// {{#each results}}
//   <li class='item'>
//     <div class='item__box'>
//       <img
//         class='item__img'
//         id='{{id}}'
//         src='https://image.tmdb.org/t/p/w500{{poster_path}}'
//         alt='{{title}}'
//       />
//     </div>
//     {{#if title}}
//       <h2 class='item__title'>{{title}}</h2>
//     {{/if}}
//     <div class='wrapper'>
//       <ul class='genres'>
//         {{#each genre_ids}}
//           <li class='genres__item'>
//             {{this}}
//           </li>
//         {{/each}}
//       </ul>
//       <span class='item__year'>{{release_date}}</span>
//       <span class='item__rating'>{{vote_average}}</span>
//     </div>
//   </li>
// {{/each}}
