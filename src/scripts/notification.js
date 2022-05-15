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
  width: '280px',
  position: 'right-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '20px',
  opacity: 1,
  borderRadius: '5px',
  rtl: false,
  timeout: 3000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: true,
  pauseOnHover: true,

  ID: 'NotiflixNotify',
  className: 'notiflix-notify',
  zindex: 4000,
  fontFamily: 'Roboto',
  fontSize: '14px',
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: 'zoom', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
  closeButton: false,
  useIcon: true,
  useFontAwesome: false,
  fontAwesomeIconStyle: 'basic', // 'basic' - 'shadow'
  fontAwesomeIconSize: '34px',

  success: {
    background: '#1c1c1cf5',
    textColor: '#fff',
    childClassName: 'notiflix-notify-success',
    notiflixIconColor: '#ff6b08',
    fontAwesomeClassName: 'fas fa-check-circle',
    fontAwesomeIconColor: '#ff6b08',
    backOverlayColor: 'rgba(50,198,130,0.2)',
  },

  failure: {
    background: '#1c1c1cf5',
    textColor: '#fff',
    childClassName: 'notiflix-notify-failure',
    notiflixIconColor: '#ff6b08',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: '#ff6b08',
    backOverlayColor: 'rgba(255,85,73,0.2)',
  },

  warning: {
    background: '#1c1c1cf5',
    textColor: '#fff',
    childClassName: 'notiflix-notify-warning',
    notiflixIconColor: '#ff6b08',
    fontAwesomeClassName: 'fas fa-exclamation-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(238,191,49,0.2)',
  },

  info: {
    background: '#1c1c1cf5',
    textColor: '#fff',
    childClassName: 'notiflix-notify-info',
    notiflixIconColor: '#ff6b08',
    fontAwesomeClassName: 'fas fa-info-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(38,192,211,0.2)',
  },
});
