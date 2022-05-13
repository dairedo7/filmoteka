export function getRefs() {
    return {
        // dark theme
        themeCheckboxEl: document.querySelector('.header-form__checkbox'),
        darkModeMediaQuery: window.matchMedia('(prefers-color-scheme: dark)'),
        // header, render main page
        header: document.querySelector('.header'),
        headerLibrary: document.querySelector('.header-library'),
        libraryLogo: document.querySelector('.library-navigation__logo'),
        libraryNavigation: document.querySelector('.library-navigation'),
        headerNavigation: document.querySelector('.header-box'),
        collectionEl: document.querySelector('.collection'),
        headerTitle: document.querySelector('.header-box__title'),
        buttonsList: document.querySelector('.buttons__list'),
        pagination: document.getElementById('pagination'),
        footer: document.querySelector('footer'),
        // header library
        watchedBtn: document.querySelector('[data-btn="watched"]'),
        queuedBtn: document.querySelector('[data-btn="queue"]'),
        collectionEl: document.querySelector('.collection'),
        backgroundImg: document.querySelector('.collection__item'),
        // modal, render movie details
        backdropEl: document.querySelector('.backdrop'),
        modalContainerEl: document.querySelector('.modal-container'),
        backdropTrailerContainerEl: document.querySelector('.backdrop__trailer'),
        modalEl: document.querySelector('.modal-container'),
        closeBtnEl: document.querySelector('.modal-close-btn'),
        // modal students
        openModalBtn: document.querySelector('[data-team-open]'),
        closeModalBtn: document.querySelector('[data-team-close]'),
        backdrop: document.querySelector('.backdrop-team'),
        // pagination
        container: document.getElementById('pagination'),
        // serch movie
        search: document.querySelector('.header-form'),
        gallery: document.querySelector('.collection'),
        genreSelect: document.querySelector('.genres-form'),
        // sorting btns
        buttonsList: document.querySelector('.buttons__list'),
        topMoviesBtn: document.querySelector('[data-action="top_rated"]'),
        upcomingMoviesBtn: document.querySelector('[data-action="upcoming"]'),
        trendingMoviesBtn: document.querySelector('[data-action="trending"]'),
        // spinner
        spinRef: document.querySelector('.js-spinner'),

        DEBOUNCE_DELAY: 500,
        STORAGE_KEY: 'search-form-state',
        LOCAL_STORAGE_DELAY: 500,
    }
}
