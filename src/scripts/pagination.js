//Ссылка на доки библиотеки  https://github.com/nhn/tui.pagination/blob/production/docs/getting-started.md
import axios from 'axios';
import Pagination from 'tui-pagination';
import debounce from 'lodash.debounce';
import { renderMarkup } from '../templates/cardTemplate.js';
import { fetchPopularMovies, fetchGenres, fetchMoviesSearchQuery } from '../scripts/services/API';
import { getTrends, searchMovie } from './searchMovie.js';
import { getMovies } from './headerLibrary.js';
import { getRefs } from '../scripts/refs';
const { container } = getRefs();

const DEBOUNCE_DELAY = 300;
const search = document.querySelector('.header-form');
const collectionEl = document.querySelector('.collection');
const form = document.querySelector('.header-form__input');

const PER_PAGE = 20;
const options = {
  totalItems: 10000,
  itemsPerPage: PER_PAGE,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};
export const pagination = new Pagination(container, options);
let page = pagination.getCurrentPage();

pagination.on('afterMove', getMovies);
