import { getRefs } from '../scripts/refs';
const { spinRef } = getRefs();

function startSpin() {
  spinRef.classList.add('is-open');
}

function stopSpin() {
  setTimeout(function () {
    spinRef.classList.remove('is-open');
  }, 250);
}

export { startSpin, stopSpin };
