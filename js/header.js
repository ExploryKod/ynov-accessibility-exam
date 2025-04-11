document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('menu__toggle');
    const links = document.querySelectorAll('.main-menu .nav-link');

    links.forEach(link => {
      link.addEventListener('click', () => {
        // Only uncheck if menu is open and checkbox is checked
        if (toggle.checked) {
          toggle.checked = false;
        }
      });
    });
  });