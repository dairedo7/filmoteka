const backdropEl = document.querySelector('.backdrop');
const closeBtnEl = document.querySelector('.modal-close-btn');
closeBtnEl.addEventListener('click', onCloseBtnClick);
function onCloseBtnClick() {
  backdropEl.classList.add('is-hidden');
}
