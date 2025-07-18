document.addEventListener("DOMContentLoaded", () => {
  // --- Navbar Scroll Effect & Active Link (inchangé) ---
  const nav = document.querySelector("nav");
  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll("nav .nav-links a");

  window.addEventListener("scroll", () => {
    // Effet de scroll sur la navbar
    if (window.scrollY > 10) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
    // Mise à jour du lien actif
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // --- Lightbox Gallery ---
  const galleryImages = document.querySelectorAll(".gallery-grid img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".close-lightbox");

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });
  });

  // Function to close the lightbox
  const closeLightbox = () => {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  // Close lightbox when clicking the close button or the background
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      // Only close if clicking the background itself
      closeLightbox();
    }
  });

  // --- Contact Form ---
  const contactForm = document.querySelector("#contact form");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission

    // You can add logic here to handle the form data
    // For now, we just show an alert and reset the form.
    alert("Merci pour votre message ! Nous vous recontacterons bientôt.");
    contactForm.reset();
  });

  // --- LOGIQUE DU MENU BURGER (NOUVELLE VERSION) ---
  const menuBurger = document.querySelector(".menu-burger");
  const navLinksContainer = document.querySelector(".nav-links");
  const burgerIcon = menuBurger.querySelector("i");

  const toggleMenu = () => {
    // Ajoute une classe à la <nav> pour gérer l'état ouvert/fermé
    nav.classList.toggle("menu-open");

    // Change l'icône du burger
    if (nav.classList.contains("menu-open")) {
      burgerIcon.classList.remove("fa-bars");
      burgerIcon.classList.add("fa-xmark");
    } else {
      burgerIcon.classList.remove("fa-xmark");
      burgerIcon.classList.add("fa-bars");
    }
  };

  // Écoute le clic sur le bouton du menu
  menuBurger.addEventListener("click", toggleMenu);

  // Écoute le clic sur chaque lien du menu pour le fermer
  navLinksContainer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("menu-open")) {
        toggleMenu();
      }
    });
  });
});

const nuancier = document.getElementById("nuancier");
const flapsColors = [
  // Argentés, blancs et gris clairs
  "#F5F5F5",
  "#E8E8E8",
  "#DCDCDC",
  "#C9C9C9",
  "#BDBDBD",
  // Gris moyens et foncés (aspect carbone)
  "#A4A4A4",
  "#8C8C8C",
  "#616161",
  "#424242",
  // Noirs
  "#212121",
  "#000000",
  // Rose / Magenta
  "#D81B60",
  // Bleus (du foncé au plus clair)
  "#1A237E",
  "#283593",
  "#0D47A1",
  "#1565C0",
  "#0277BD",
  "#00838F",
  // Verts
  "#00695C",
  "#2E7D32",
  "#558B2F",
  "#9E9D24",
  // Jaunes
  "#FDD835",
  "#FFB300",
  // Oranges
  "#FB8C00",
  "#F4511E",
  // Rouges
  "#D84315",
  "#C62828",
  "#A61B29",
  "#880E4F",
  // Bleus et couleurs du bas de l'éventail
  "#455A64",
  "#37474F",
  "#263238",
  "#3949AB",
  "#5E35B1",
];
const flaps = [];
const initialAngle = 110; // L'angle de départ (état fermé)

// --- Création des volets (Flaps) ---
for (let i = 0; i < flapsColors.length; i++) {
  const flap = document.createElement("div");
  flap.className = "flap";

  // Calcule et stocke l'angle final pour ce volet
  flap.finalAngle = i * 8 + initialAngle;

  if (i === flapsColors.length - 1) {
    flap.style.backgroundColor = "black";
    flap.innerHTML = `
        <img src="./img/Raccoon-Logo.svg" alt="Raccoon">
        <p>RACCOON</p>
    `;
  } else {
    const color = flapsColors[i];
    flap.style.backgroundColor = color;
  }

  // On n'applique plus la rotation ici, le CSS s'en charge pour l'état initial.
  nuancier.appendChild(flap);
  flaps.push(flap);
}

// --- Logique d'animation au scroll ---
function animateNuancier() {
  const rect = nuancier.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // Le point où l'animation commence (quand le nuancier apparaît en bas)
  const animationStartPoint = viewportHeight;

  // Le point où l'animation se termine (quand le nuancier est au milieu de l'écran)
  const animationEndPoint = viewportHeight / 1.5;

  // Calculer la progression de l'animation (une valeur de 0 à 1)
  const totalDistance = animationStartPoint - animationEndPoint;
  const distanceScrolled = animationStartPoint - rect.top;

  // On s'assure que le progrès reste entre 0 et 1
  let progress = Math.max(0, Math.min(1, distanceScrolled / totalDistance));

  // Appliquer la rotation à chaque volet en fonction du progrès
  flaps.forEach((flap) => {
    // On calcule l'angle actuel en interpolant entre l'angle initial et final
    const currentAngle =
      initialAngle + (flap.finalAngle - initialAngle) * progress;
    flap.style.transform = `rotate(${currentAngle}deg)`;
  });
}

// Écoute l'événement de scroll sur la page
window.addEventListener("scroll", () => {
  // requestAnimationFrame est utilisé pour optimiser les performances
  // et éviter que l'animation ne soit saccadée.
  window.requestAnimationFrame(animateNuancier);
});

// Appelle la fonction une première fois au chargement pour s'assurer que
// tout est bien positionné si le nuancier est déjà visible.
animateNuancier();
