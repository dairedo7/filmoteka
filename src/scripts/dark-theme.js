const themeCheckboxEl = document.querySelector('.header-form__checkbox');
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function themeOnPcUser() {
  if (darkModeMediaQuery.matches === true) {
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
  console.log(`Тёмный режим ${darkModeOn ? '🌚 включен' : '🌞 выключен'}.`);
});

themeCheckboxEl.addEventListener('change', () => document.body.classList.toggle('dark'));

// window.matchMedia('(prefers-color-scheme: dark)').addListener(event => {
//   if (window.matchMedia('(prefers-color-scheme: dark)').matches === true) {
//     event.matches && changeTheme();
//     console.log('Активирована черная тема');
//     checkboxEnable();
//   }
// });

// function checkboxEnable() {
//   if (localStorage.getItem('onChange') == 'true') {
//     themeCheckboxEl.checked = true;
//   }
// }
// checkboxEnable();

// function checkboxDisable() {
//   if (localStorage.getItem('onChange') == '') {
//     themeCheckboxEl.checked = false;
//   }
// }
// checkboxDisable();

// function getBodyStyle() {
//   if (localStorage.getItem('style') == 'dark') {
//     document.body.classList.toggle('dark');
//   }
// }
// getBodyStyle();

// themeCheckboxEl.addEventListener('change', changeTheme);

// function changeTheme() {
//   document.body.classList.toggle('dark');
//   if (document.body.getAttribute('class') == 'dark') {
//     localStorage.setItem('onChange', 'true');
//     localStorage.setItem('style', 'dark');
//   } else {
//     localStorage.setItem('onChange', '');
//     localStorage.setItem('style', '');
//   }
// }
