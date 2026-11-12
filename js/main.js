/**
 * main.js
 * Shared UI helpers: responsive mobile navigation toggle & dynamic footer year.
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  setFooterYear();
});

function initMobileNav() {
  const toggleBtn = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");

  if (!toggleBtn || !navMenu) return;

  function setMenuState(isOpen) {
    navMenu.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  }

  toggleBtn.addEventListener("click", () => {
    const isOpen = !navMenu.classList.contains("is-open");
    setMenuState(isOpen);
  });

  // Close drawer when a navigation link is selected on mobile
  navMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuState(false);
    }
  });

  // Close drawer when clicking anywhere outside the header/menu
  document.addEventListener("click", (event) => {
    if (
      navMenu.classList.contains("is-open") &&
      !event.target.closest(".site-header")
    ) {
      setMenuState(false);
    }
  });

  // Allow closing with Escape key for keyboard accessibility
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
      setMenuState(false);
      toggleBtn.focus();
    }
  });

  // Unlock page scroll if viewport resizes back to desktop width
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860 && navMenu.classList.contains("is-open")) {
      setMenuState(false);
    }
  });
}

function setFooterYear() {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}
