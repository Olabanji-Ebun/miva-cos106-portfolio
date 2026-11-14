/**
 * main.js
 * Shared UI helpers:
 * - Theme switcher (Dark / Light mode) with localStorage persistence
 * - Responsive mobile navigation toggle with accessibility & scroll-lock
 * - Dynamic footer year
 */

const THEME_STORAGE_KEY = "cos106_theme";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileNav();
  setFooterYear();
});

/**
 * Theme Controller: Dark / Light Mode with localStorage and system preference sync
 */
function initTheme() {
  const toggleBtns = document.querySelectorAll("[data-theme-toggle]");
  if (!toggleBtns.length) return;

  function getActiveTheme() {
    return document.documentElement.getAttribute("data-theme") || "light";
  }

  function updateToggleButtons(theme) {
    const isDark = theme === "dark";
    const label = isDark ? "Switch to light theme" : "Switch to dark theme";

    toggleBtns.forEach((btn) => {
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
      btn.setAttribute("aria-pressed", String(isDark));
    });
  }

  function setTheme(theme, save = true) {
    document.documentElement.setAttribute("data-theme", theme);
    if (save) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch (err) {
        console.warn("Could not save theme preference to localStorage:", err);
      }
    }
    updateToggleButtons(theme);
  }

  // Set initial button states based on current document theme
  updateToggleButtons(getActiveTheme());

  // Attach click listener to all toggle buttons (desktop / mobile)
  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = getActiveTheme();
      const nextTheme = current === "dark" ? "light" : "dark";
      setTheme(nextTheme, true);
    });
  });

  // Listen to OS system color-scheme changes if user hasn't explicitly set a preference
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", (e) => {
      try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (!stored) {
          setTheme(e.matches ? "dark" : "light", false);
        }
      } catch (err) {
        // Fallback silently if storage access is restricted
      }
    });
  }
}

/**
 * Mobile Navigation Drawer Controller
 */
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

/**
 * Dynamic Footer Year
 */
function setFooterYear() {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}
