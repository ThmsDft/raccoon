document.addEventListener("DOMContentLoaded", () => {
  // --- Navbar Scroll Effect & Active Link (inchangé) ---
  const nav = document.querySelector("nav");
  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll("nav .nav-links a");

  window.addEventListener("scroll", () => {
    // Effet de scroll sur la navbar
    if (window.scrollY > 50) {
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
});
