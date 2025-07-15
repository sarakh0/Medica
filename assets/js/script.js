const navBar = document.querySelector(".nav-bar");
const openButton = document.getElementById('open-sidebar-button');

const media = window.matchMedia("(width < 700px");

media.addEventListener('change', (e)=> updateNavBar(e))

function updateNavBar(e) {
   const isMobile = e.matches;
   console.log(isMobile);
   if (isMobile) {
      navBar.setAttribute('inert', '');
   } else {
      navBar.removeAttribute('inert');
   }
}

function openSidebar() {
   navBar.classList.add("show");
   openButton.setAttribute('aria-expanded', 'true');
   navBar.removeAttribute('inert');
}


function closeSidebar() {
   navBar.classList.remove("show");
   openButton.setAttribute('aria-expanded', 'false');
   navBar.setAttribute('inert', '');
}

updateNavBar(media);

