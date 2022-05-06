const refs = {
header: document.querySelector('.header'),
headerLibrary: document.querySelector('.header-library'),
libraryLogo: document.querySelector('.library-navigation__logo'),
libraryNavigation: document.querySelector('.library-navigation'),
headerNavigation: document.querySelector('.header-box'),
}
console.log(refs.libraryLogo);

refs.libraryNavigation.addEventListener('click', onLibraryClick);
refs.headerNavigation.addEventListener('click', onHeaderClick);
refs.libraryLogo.addEventListener('click', onLogoClick);

function onLibraryClick(evt) {
    evt.preventDefault();
if (evt.target.nodeName !== "A") {
    return;
    }
    console.log(evt.target.textContent);
    
    if (evt.target.textContent === 'Home') {
        refs.headerLibrary.classList.add('visually-hidden');
                refs.header.classList.remove('visually-hidden');

    }
};


function onHeaderClick(evt) {
    console.log(evt.target.textContent);
       evt.preventDefault();
if (evt.target.nodeName !== "A") {
    return;
    }

    if (evt.target.textContent === 'MY LIBRARY') {
        refs.headerLibrary.classList.remove('visually-hidden');
        refs.header.classList.add('visually-hidden');
    } 
};

function onLogoClick(evt) {
       evt.preventDefault();
 refs.headerLibrary.classList.add('visually-hidden');
refs.header.classList.remove('visually-hidden');
};



