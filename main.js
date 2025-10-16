const sidebar = document.getElementById('sidebar');
const dropdown = document.querySelector('.profile-dropdown');
const profileButton = document.querySelector('.profile');

// Sidebar toggle
function toggleSidebar() {
  sidebar.classList.toggle('show');
}

function closeSidebar() {
  sidebar.classList.remove('show');
}

// Profile dropdown toggle
function toggleProfileDropdown(event) {
  event.stopPropagation();
  const isOpen = dropdown.style.display === 'block';
  dropdown.style.display = isOpen ? 'none' : 'block';
  if (profileButton) profileButton.setAttribute('aria-expanded', String(!isOpen));
}

// Close profile dropdown when clicking outside
document.addEventListener('click', (e) => {
  // Profile dropdown
  if (dropdown && dropdown.style.display === 'block') {
    const isClickInside = profileButton && profileButton.contains(e.target);
    const isMenu = dropdown.contains(e.target);
    if (!isClickInside && !isMenu) {
      dropdown.style.display = 'none';
      if (profileButton) profileButton.setAttribute('aria-expanded', 'false');
    }
  }

  // Sidebar close when clicking outside
  if (sidebar && sidebar.classList.contains('show')) {
    const isClickInsideSidebar = sidebar.contains(e.target);
    const isClickOnHamburger = e.target.closest('.hamburger');
    if (!isClickInsideSidebar && !isClickOnHamburger) {
      closeSidebar();
    }
  }

  // Close all open submenus if click outside
  document.querySelectorAll('.has-submenu.open').forEach((item) => {
    const submenu = item.querySelector('.submenu');
    if (submenu && !item.contains(e.target)) {
      submenu.style.maxHeight = "0px";
      item.classList.remove('open');
      const toggle = item.querySelector('.submenu-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Smooth accordion submenu toggle
document.querySelectorAll('.has-submenu').forEach((item) => {
  const toggle = item.querySelector('.submenu-toggle');
  const submenu = item.querySelector('.submenu');

  if (toggle && submenu) {
    // Initially hide submenu
    submenu.style.maxHeight = "0px";
    submenu.style.overflow = "hidden";
    submenu.style.transition = "max-height 0.3s ease";

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = item.classList.contains('open');

      // Close other open submenus
      document.querySelectorAll('.has-submenu.open').forEach((otherItem) => {
        if (otherItem !== item) {
          const otherSubmenu = otherItem.querySelector('.submenu');
          otherSubmenu.style.maxHeight = "0px";
          otherItem.classList.remove('open');
          const otherToggle = otherItem.querySelector('.submenu-toggle');
          if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current submenu
      if (!isOpen) {
        item.classList.add('open');
        submenu.style.maxHeight = submenu.scrollHeight + "px";
      } else {
        submenu.style.maxHeight = "0px";
        item.classList.remove('open');
      }

      toggle.setAttribute('aria-expanded', String(!isOpen));
    });
  }
});
