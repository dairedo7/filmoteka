const refs = {
    openModalBtn: document.querySelector('[data-team-open]'),
    closeModalBtn: document.querySelector('[data-team-close]'),
    backdrop: document.querySelector('.backdrop-team'),
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);


function onOpenModal() {
    window.addEventListener('keydown', onEsc)
  document.body.classList.add('show-modal');
};

function onCloseModal() {
  document.body.classList.remove('show-modal');
    window.removeEventListener('keydown', onEsc)

};

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
      onCloseModal()
  }
};

function onEsc(event) {
if (event.code === 'Escape') {
    onCloseModal()
}
};
