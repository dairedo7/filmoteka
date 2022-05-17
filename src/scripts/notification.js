import Notiflix from 'notiflix';
// Функции уведомлений (просто импортируем туда где хотим использовать и вызываем)

export function success(title) {
  Notiflix.Notify.success(`${title} movies found`);
}

export function failure() {
  Notiflix.Notify.failure('Sorry, no matches found for your search query!');
}
export function missingTrailer() {
  Notiflix.Report.info(
    'Missing trailer!',
    'Knowledge rests not upon truth alone, but upon error also." <br/><br/>- Carl Gustav Jung',
    'Okay',
  );
}

export function warning() {
  Notiflix.Notify.warning('Please, enter your request');
}

// Объект визуальных настроек
Notiflix.Notify.init({
  distance: '20px',
  clickToClose: true,
  fontFamily: 'Roboto',
  fontSize: '14px',
  cssAnimationStyle: 'zoom', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'

  success: {
    background: '#1c1c1cf5',
    notiflixIconColor: '#ff6b08',
  },

  failure: {
    background: '#1c1c1cf5',
    notiflixIconColor: '#ff6b08',
  },

  warning: {
    background: '#1c1c1cf5',
    notiflixIconColor: '#ff6b08',
  },

  info: {
    background: '#1c1c1cf5',
    notiflixIconColor: '#ff6b08',
  },
});

Notiflix.Report.init({
  backgroundColor: '#1c1c1cf5',
  fontFamily: 'Roboto',

  info: {
    svgColor: '#ff6b08',
    titleColor: '#ffffff',
    messageColor: '#ffffff',
    buttonBackground: '#ff6b08',
    backOverlayColor: 'rgba(0, 0, 0,0.5)',
  },
});
