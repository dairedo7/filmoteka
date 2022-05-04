export function scrollToTop() {
  const scrollUpBtn = document.querySelector('.scroll-top');

  window.onscroll = () => {
    if (window.scrollY > 450) {
      scrollUpBtn.removeAttribute('disabled', '');
      scrollUpBtn.classList.remove('scroll-top_hide');
    } else if (window.scrollY < 450) {
      scrollUpBtn.setAttribute('disabled', '');
      scrollUpBtn.classList.add('scroll-top_hide');
    }
  };

  scrollUpBtn.addEventListener('click', () => {
    window.scrollTo(0, 0);
  });
}
