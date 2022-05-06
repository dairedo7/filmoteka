import debounce from "lodash.debounce";
import throttle from "lodash.throttle";
import { fetchMoviesSearchQuery } from './services/API';
import { failure } from './notification';
import { warning } from './notification';
import {success} from './notification';
import { renderMarkup } from './renderMainPage';

let formData = {};
const DEBOUNCE_DELAY = 300;
const STORAGE_KEY = "search-form-state";
const LOCAL_STORAGE_DELAY = 500;
const refs = {
    search: document.querySelector('.header-form'),
    gallery: document.querySelector('.collection'),
}

userData();
refs.search.addEventListener('submit', onFormSubmitSearch);
refs.search.addEventListener('input', debounce(onKeyWordSearch, DEBOUNCE_DELAY));
refs.search.addEventListener('input', throttle(onInputSaveData, LOCAL_STORAGE_DELAY));
// Поиск по ключевому слову
function onKeyWordSearch(evt) {
    evt.preventDefault();
    searchMovie();
}
// Поиск по сабмиту формы
function onFormSubmitSearch(evt) {
    evt.preventDefault();
    searchMovie();
    evt.currentTarget.reset();
    formData = {};
    localStorage.removeItem(STORAGE_KEY);
}
// Очистка страницы
function clearPage () {
    refs.gallery.innerHTML = '';
}
// Функция поиска фильма и уведомлений
async function searchMovie () {
    const inputValue = refs.search.headerInput.value;
    const moviesByKeyWord = await fetchMoviesSearchQuery(inputValue);

   if (inputValue === "") {
        return failure();
   } else {
       clearPage();
           renderMarkup(moviesByKeyWord); 
    success(moviesByKeyWord.total_results);
    }

// else if (moviesByKeyWord.total_pages < 1) {
//         return warning();
//    }

}
// Функция сохранения данных в локальное хранилище
function onInputSaveData (evt) {
   formData[evt.target.name] = evt.target.value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
}
// Функция сохранения данных в локальное хранилище
function userData() {
    const savedUserData = localStorage.getItem(STORAGE_KEY);
    const parsedUserData = JSON.parse(savedUserData);
    if (savedUserData) {
        Object.entries(parsedUserData).forEach(([name, value]) => {
            formData[name] = value;
            refs.search.elements[name].value = value;
        })
    }

}