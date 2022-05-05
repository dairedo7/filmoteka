// import { fetchGenres } from '../scripts/services/API';
import { fetchMoviesSearchQuery } from '../scripts/services/API';
import markup from '../templates/cardTemplate.hbs';
import {failure} from './notification';
import { renderMarkup } from './renderMainPage';
import { fetchPopularMovies } from '../scripts/services/API';


const refs = {
    search: document.querySelector('.header-form'),
    gallery: document.querySelector('.collection'),
}

refs.search.addEventListener('submit', onFormSubmitSearch);
refs.search.addEventListener('input', onKeyWordSearch);

async function onKeyWordSearch(evt) {
      evt.preventDefault();
    clearPage();
    const inputValue = evt.currentTarget.elements.headerInput.value;
    // console.log(inputValue);
    const moviesByKeyWord = await fetchMoviesSearchQuery(inputValue);
    // if (moviesByKeyWord.results.length !== 0) {
        
    // }

       renderMarkup(moviesByKeyWord); 

}

async function onFormSubmitSearch(evt) {
    evt.preventDefault();
    clearPage();
   
    const inputValue = evt.currentTarget.elements.headerInput.value;
    const moviesByName = await fetchMoviesSearchQuery(inputValue);
//доделать другие уведомления
    if (inputValue === "" || moviesByName.results.length === 0) {
        return failure();
    }

   renderMarkup(moviesByName); 
}

function clearPage () {
    refs.gallery.innerHTML = '';
}

// function renderMarkup(res) {
//   return refs.gallery.insertAdjacentHTML('beforeend', markup(res));
// }
// const genres = fetchGenres();
// console.log(genres.then(response => console.log(response)));

// console.log(movieName);
// fetchGenres().then(response => console.log(response));