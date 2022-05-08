//Ссылка на доки библиотеки  https://github.com/nhn/tui.pagination/blob/production/docs/getting-started.md
import axios from 'axios';
import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import { renderMarkup } from '../templates/cardTemplate.js';
import { fetchPopularMovies, fetchGenres } from '../scripts/services/API';

const container = document.getElementById('pagination');
// const search_form = document.querySelector('.header-form__label');
// search_form.addEventListener('submit', handlerKeyWord);

// function handlerKeyWord(e) {
//   e.preventDefault();
//   let value = search_form.elements.header-input.value.trim();

//   fetchMoviePagination(value, page)
//     .then(data => {
//       if (data) {
//         pagination.reset(data.total_pages);
//         getMovies(data.results);
//       }
//     })
//     .catch(console.error);

//   setPagination(value);
// }
// const API_KEY = 'api_key=76293c6bcb8bbcc89a96d2b767d5c3a3';
const PER_PAGE = 20;
const options = {
  totalItems: 2000,
  itemsPerPage: PER_PAGE,
  visiblePages: 7,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};
const pagination = new Pagination(container, options);
let page = pagination.getCurrentPage();
// const errorText = document.querySelector('.header-search__error');

// pagination.on('afterMove', getMovies());
// console.dir(pagination);
// pagination.on('beforeMove', evt => {
//   const { page } = evt;
//   const result = ajax.call({page});

//   if(result) {
//     pagination.movePageTo(page);
//   } else {
//     return false;
//   }
// });

pagination.on('afterMove', loadMovies);
// let page
async function loadMovies(event) {
  // page = 1
  const response = await fetchPopularMovies(event.page);
  console.log(response.results);
  const loadGenres = await fetchGenres();
  // console.log(page)
  // options.page +=1
  return renderMarkup(response.results, loadGenres);
}

// loadMovies()
// function setPagination(value) {
//   pagination.on('afterMove', ({ page }) => {
//     fetchMoviePagination(value, page)
//       .then(data => getMovies(data.results))
//       .catch(console.log);
//   });
// }

// console.log(page)

// async function fetchMoviePagination(value, page) {
//   try {
//     const response = await axios.get(
//       `https://api.themoviedb.org/3/search/movie?${API_KEY}&language=en-US&query=${value}&page=${page}&per_page=${PER_PAGE}&include_adult=false`,
//     );
//     errorText.classList.add('header-search__error-hidden');
//     if (response.data.total_results !== 0) {
//       return response.data;
//     } else {
//       errorText.classList.remove('header-search__error-hidden');
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }
