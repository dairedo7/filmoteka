import team from '../data/modalStudents.json';
import markupTeam from '../templates/modalStudents';
import { getRefs } from '../scripts/refs';

const { openModalBtn, closeModalBtn, backdrop } = getRefs();

openModalBtn.addEventListener('click', onOpenModal);
closeModalBtn.addEventListener('click', onCloseModal);
backdrop.addEventListener('click', onBackdropClick);


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


