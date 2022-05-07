const themeBtnEl = document.querySelector('.header-theme');
const scrollTopBtnEl = document.querySelector('.scroll-top');
const footerEl = document.querySelector('.footer');
const modalEl = document.querySelector('.modal');
const modalCloseBtnEl = document.querySelector('.modal-close-btn');

if (localStorage.getItem('style') == 'dark') {
  document.body.classList.toggle('dark');
  footerEl.classList.toggle('dark-footer');
  scrollTopBtnEl.classList.toggle('dark-scroll-top');
  modalEl.classList.toggle('dark-modal');
  modalCloseBtnEl.classList.toggle('dark-modalCloseBtn');
}

themeBtnEl.addEventListener('click', changeTheme);

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
  modalEl.classList.toggle('dark-modal');
  modalCloseBtnEl.classList.toggle('dark-modalCloseBtn');
}

console.log(modalEl.children);
