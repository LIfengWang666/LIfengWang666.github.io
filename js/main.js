const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

if (menuButton && navigation) {
  const narrowViewport = window.matchMedia('(max-width: 40rem)');

  function setMenuOpen(open) {
    navigation.hidden = narrowViewport.matches && !open;
    menuButton.setAttribute('aria-expanded', String(open));
  }

  function updateLayout() {
    menuButton.hidden = !narrowViewport.matches;
    if (narrowViewport.matches && navigation.contains(document.activeElement)) {
      menuButton.focus();
    }
    setMenuOpen(false);
  }

  menuButton.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  navigation.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (link && narrowViewport.matches) {
      document.getElementById(link.hash.slice(1))?.focus();
      setMenuOpen(false);
    }
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
