document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('menu__toggle');
    const label = document.querySelector('label[for="menu__toggle"]');
    const links = document.querySelectorAll('.main-menu .nav-link');
  
    function updateAriaExpanded() {
      label.setAttribute('aria-expanded', toggle.checked ? 'true' : 'false');
    }
  
    toggle.addEventListener('change', updateAriaExpanded);
    updateAriaExpanded();
  
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (toggle.checked) {
          toggle.checked = false;
          updateAriaExpanded();
        }
      });
    });


    label.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault(); // Prevent scroll on spacebar
          toggle.checked = !toggle.checked;
          updateAriaExpanded();
        }
      });
  });


