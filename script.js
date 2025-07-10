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
