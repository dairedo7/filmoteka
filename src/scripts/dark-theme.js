import { getRefs } from '../scripts/refs';
const { themeCheckboxEl, darkModeMediaQuery } = getRefs();

function themeOnPcUser() {
  if (darkModeMediaQuery.matches) {
    document.body.classList.add('dark');
    themeCheckboxEl.checked = true;
  } else {
    document.body.classList.remove('dark');
    themeCheckboxEl.checked = false;
  }
}
themeOnPcUser();

darkModeMediaQuery.addListener(event => {
  document.body.classList.add('dark');
  themeCheckboxEl.checked = true;

  const darkModeOn = event.matches;

  if (darkModeOn === false) {
    document.body.classList.remove('dark');
    themeCheckboxEl.checked = false;
  }
});

themeCheckboxEl.addEventListener('change', () => document.body.classList.toggle('dark'));
