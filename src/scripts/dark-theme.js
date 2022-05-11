const themeCheckboxEl = document.querySelector('.header-form__checkbox');

function onChangeCheckbox() {
  if (localStorage.getItem('onChange') == 'true') {
    themeCheckboxEl.checked = true;
  }
}

function checkboxDis() {
  if (localStorage.getItem('onChange') == '') {
    themeCheckboxEl.checked = false;
  }
}

function getBodyStyle() {
  if (localStorage.getItem('style') == 'dark') {
    document.body.classList.toggle('dark');
  }
}
getBodyStyle();

themeCheckboxEl.addEventListener('change', changeTheme);

function changeTheme() {
  document.body.classList.toggle('dark');
  if (document.body.getAttribute('class') == 'dark') {
    localStorage.setItem('onChange', 'true');
    localStorage.setItem('style', 'dark');
  } else {
    localStorage.setItem('onChange', '');
    localStorage.setItem('style', '');
  }
}

window.matchMedia('(prefers-color-scheme: dark)').addListener(event => {
  event.matches && changeTheme();
  // if (document.body.getAttribute('class') == 'dark') {
  //   localStorage.setItem('onChange', 'true');
  //   localStorage.setItem('style', 'dark');
  // }
  onChangeCheckbox();
});

window.matchMedia('(prefers-color-scheme: light)').addListener(event => {
  event.matches && changeTheme();
  // if (document.body.getAttribute('class') == '') {
  //   localStorage.setItem('onChange', '');
  //   localStorage.setItem('style', '');
  // }
  checkboxDis();
});
