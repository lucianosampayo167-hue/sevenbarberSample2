// =========================================================
// SEVEN BARBER · Interacciones
// (WhatsApp e Instagram son enlaces directos en index.html)
// =========================================================

(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".main-nav a");

  // Menú móvil: abrir / cerrar
  function setMenu(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }

  toggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("open"));
  });

  // Cerrar el menú al elegir una sección o al presionar Escape
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  // Sombra en el encabezado al hacer scroll
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Resaltar en el menú la sección visible
  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { observer.observe(s); });
  }

  // Año automático en el pie
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
