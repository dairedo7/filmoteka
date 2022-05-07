import './sass/main.scss';
import API from './scripts/services/API';
import renderMainPage from './scripts/renderMainPage';
import { scrollToTop } from './scripts/scroll-to-top';
import header from './scripts/header';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const options = {
  totalItems: 10,
  itemsPerPage: 10,
  visiblePages: 10,
  page: 1,
};

// const pagination = new Pagination('pagination', options);

const container = document.getElementById('pagination');
const pagination = new Pagination(container);
