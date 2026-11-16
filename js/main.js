const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

if (menuButton && navigation) {
  const narrowViewport = window.matchMedia('(max-width: 38rem)');

  function setMenuOpen(open) {
    navigation.hidden = narrowViewport.matches && !open;
    menuButton.setAttribute('aria-expanded', String(open));
  }

  function updateLayout() {
    menuButton.hidden = !narrowViewport.matches;
    setMenuOpen(false);
  }

  menuButton.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  narrowViewport.addEventListener('change', updateLayout);
  updateLayout();
}
