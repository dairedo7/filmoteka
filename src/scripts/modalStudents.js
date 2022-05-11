import team from '../data/modalStudents.json';
import markupTeam from '../templates/modalStudents';

const refs = {
  openModalBtn: document.querySelector('[data-team-open]'),
  closeModalBtn: document.querySelector('[data-team-close]'),
  backdrop: document.querySelector('.backdrop-team'),
  // teamList: document.querySelector('.list-team'),
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);


function onOpenModal() {
    window.addEventListener('keydown', onEsc)
  document.body.classList.add('show-modal');
  const teamList = document.querySelector('.list-team');
  teamList.innerHTML = markupTeam(team);
  document.body.style.overflow = 'hidden';

};


function onCloseModal() {
  document.body.classList.remove('show-modal');
    window.removeEventListener('keydown', onEsc)
  document.body.style.overflow = '';

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


