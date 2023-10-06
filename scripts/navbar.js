// nav por su ID
const navbar = document.getElementById("navbarSupportedContent");

// activar 
const section = document.getElementById("navbarSupportedContent"); 

// Función para cambiar el fondo de la barra de navegación al hacer scroll
function changeNavbarBackground() {
  if (window.scrollY >= section.offsetTop) {
    // Si el scroll supera la posición de la sección deseada
    navbar.classList.add("navbar-scrolled");
  } else {
    // Si el scroll está por encima de la posición de la sección deseada
    navbar.classList.remove("navbar-scrolled");
  }
}

// Agrega un evento scroll al documento que llame a la función cuando se hace scroll
window.addEventListener("scroll", changeNavbarBackground);