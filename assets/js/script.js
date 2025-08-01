const navBar = document.querySelector(".nav-bar");
const openButton = document.getElementById('open-sidebar-button');

// Create a MediaQueryList object to check if the screen width is less than 800px
const media = window.matchMedia("(max-width: 800px)");

// Add an event listener to detect when the media query result changes
media.addEventListener('change', (e) => updateNavBar(e));

// Function to update the navigation bar based on screen size
function updateNavBar(e) {
   const isMobile = e.matches; // true if screen width is under 800px
   console.log(isMobile);
   if (isMobile) {
      // On mobile, make the nav bar inert (non-interactive & inaccessible to assistive tech)
      navBar.setAttribute('inert', '');
   } else {
      // On larger screens, make nav bar interactive again
      navBar.removeAttribute('inert');
   }
}

// Function to open the sidebar (mobile menu)
function openSidebar() {
   navBar.classList.add("show");
   // Set ARIA attribute for accessibility to indicate sidebar is expanded
   openButton.setAttribute('aria-expanded', 'true');
   navBar.removeAttribute('inert');
}

// Function to close the sidebar
function closeSidebar() {
   navBar.classList.remove("show");
   // Update ARIA attribute to indicate sidebar is collapsed
   openButton.setAttribute('aria-expanded', 'false');
   navBar.setAttribute('inert', '');
}

// apply correct state to the nav bar based on current screen size
updateNavBar(media);
