const themeCheckboxEl = document.querySelector('.switch-checkbox');
const scrollTopBtnEl = document.querySelector('.scroll-top');
const headerEl = document.querySelector('.header');
const footerEl = document.querySelector('.footer');
const modalEl = document.querySelector('.modal');
const modalCloseBtnEl = document.querySelector('.modal-close-btn');
const backDropModalEl = document.querySelector('.backdrop');
const modalTitle = document.querySelector('.modal-title');
const container = document.querySelector('.modal-container');

console.log('themeCheckboxEl :>> ', themeCheckboxEl);

if (localStorage.getItem('style') == 'dark') {
  document.body.classList.toggle('dark');
  headerEl.classList.toggle('dark-header');
  footerEl.classList.toggle('dark-footer');
  scrollTopBtnEl.classList.toggle('dark-scroll-top');
  modalEl.classList.toggle('dark-modal');
  modalCloseBtnEl.classList.toggle('dark-modalCloseBtn');
  backDropModalEl.classList.toggle('dark-modalBackdrop');
}

themeCheckboxEl.addEventListener('change', changeTheme);

function changeTheme() {
  document.body.classList.toggle('dark');
  if (document.body.getAttribute('class') == 'dark') {
    localStorage.setItem('style', 'dark');
  } else {
    localStorage.setItem('style', '');
  }
  toggleClass();
}

function toggleClass() {
  footerEl.classList.toggle('dark-footer');
  scrollTopBtnEl.classList.toggle('dark-scroll-top');
  headerEl.classList.toggle('dark-header');
  modalEl.classList.toggle('dark-modal');
  modalCloseBtnEl.classList.toggle('dark-modalCloseBtn');
  backDropModalEl.classList.toggle('dark-modalBackdrop');
}
