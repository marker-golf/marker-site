const toggle = document.querySelector('.nav__toggle');
const panel  = document.getElementById('mobile-nav');

if (toggle && panel) {
  toggle.addEventListener('click', () => {
    const isOpen = !panel.hidden;
    panel.hidden = isOpen;
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  });
}
