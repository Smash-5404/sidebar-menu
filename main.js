const sidebar = document.getElementById('sidebar')
const dropdown = document.querySelector('.profile-dropdown')
const profileButton = document.querySelector('.profile')

function toggleSidebar() {
  sidebar.classList.toggle('show')
}

function closeSidebar() {
  sidebar.classList.remove('show')
}

function toggleProfileDropdown(event) {
  event.stopPropagation()
  const isOpen = dropdown.style.display === 'block'
  dropdown.style.display = isOpen ? 'none' : 'block'
  if (profileButton) {
    profileButton.setAttribute('aria-expanded', String(!isOpen))
  }
}

document.addEventListener('click', (e) => {
  if (dropdown && dropdown.style.display === 'block') {
    const isClickInside = profileButton && profileButton.contains(e.target)
    const isMenu = dropdown.contains(e.target)
    if (!isClickInside && !isMenu) {
      dropdown.style.display = 'none'
      if (profileButton) {
        profileButton.setAttribute('aria-expanded', 'false')
      }
    }
  }
})

// Submenu toggle logic - only one open at a time
document.querySelectorAll('.has-submenu').forEach((item) => {
  const toggle = item.querySelector('.submenu-toggle')
  const submenu = item.querySelector('.submenu')
  if (toggle && submenu) {
    toggle.addEventListener('click', () => {
      const isOpen = item.classList.contains('open')

      // Close all other submenus first
      document.querySelectorAll('.has-submenu').forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('open')
          const otherToggle = otherItem.querySelector('.submenu-toggle')
          const otherSubmenu = otherItem.querySelector('.submenu')
          if (otherToggle && otherSubmenu) {
            otherToggle.setAttribute('aria-expanded', 'false')
          }
        }
      })

      // Toggle current submenu
      item.classList.toggle('open')
      toggle.setAttribute('aria-expanded', String(!isOpen))
    })
  }
})