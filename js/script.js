/* ============================================================
   PORTFOLIO CUSTOMIZATION
   Update the values below. Leave a value as an empty string to
   hide that optional contact method or project link.
   ============================================================ */
const PORTFOLIO = {
  name: "Fasna KV",
  location: "Thalassery, Kannur, Kerala, India",
  resumePath: "assets/resume.pdf", // Add your PDF at this path to activate the résumé link.
  contacts: {
    email: "",       // e.g. "hello@example.com"
    phone: "",       // e.g. "+919876543210"
    whatsapp: "",    // digits with country code, no +, spaces or dashes
    whatsappMessage: "Hi Fasna, I came across your portfolio and would like to connect.",
    linkedin: "",    // e.g. "https://www.linkedin.com/in/your-profile/"
    github: "",      // e.g. "https://github.com/your-username"
    instagram: ""    // e.g. "https://www.instagram.com/your-profile/"
  },
  projectLinks: {
    pcodDemo: "",
    pcodCode: "",
    portfolioDemo: "",
    portfolioCode: ""
  }
};

(() => {
  "use strict";
  const root = document.documentElement;
  const body = document.body;
  const menuToggle = document.getElementById("menu-toggle");
  const navPanel = document.getElementById("primary-nav");
  const themeToggle = document.getElementById("theme-toggle");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Personal name and location are filled from the single config above.
  document.querySelectorAll("[data-profile='name']").forEach((node) => {
    node.textContent = PORTFOLIO.name || "Your Name";
  });
  const locationText = document.querySelector("[data-contact-location]");
  if (locationText && PORTFOLIO.location) {
    locationText.hidden = false;
    const span = locationText.querySelector("span");
    if (span) span.textContent = PORTFOLIO.location;
  }

  // Contact cards only appear when real details have been supplied.
  const contactValues = {
    email: PORTFOLIO.contacts.email,
    phone: PORTFOLIO.contacts.phone,
    whatsapp: PORTFOLIO.contacts.whatsapp,
    linkedin: PORTFOLIO.contacts.linkedin,
    github: PORTFOLIO.contacts.github,
    instagram: PORTFOLIO.contacts.instagram
  };
  const contactHrefs = {
    email: contactValues.email ? `mailto:${contactValues.email}` : "",
    phone: contactValues.phone ? `tel:${contactValues.phone.replace(/[^\d+*#,;]/g, "")}` : "",
    whatsapp: contactValues.whatsapp ? `https://wa.me/${PORTFOLIO.contacts.whatsapp.replace(/\D/g, "")}${PORTFOLIO.contacts.whatsappMessage ? `?text=${encodeURIComponent(PORTFOLIO.contacts.whatsappMessage)}` : ""}` : "",
    linkedin: contactValues.linkedin,
    github: contactValues.github,
    instagram: contactValues.instagram
  };
  Object.entries(contactHrefs).forEach(([key, href]) => {
    const card = document.querySelector(`[data-contact-card="${key}"]`);
    const social = document.querySelector(`[data-contact="${key}"]`);
    if (href && card) {
      card.href = href;
      card.hidden = false;
      if (["linkedin", "github", "instagram"].includes(key)) {
        card.target = "_blank";
        card.rel = "noopener noreferrer";
      }
      if (key === "email") {
        const label = card.querySelector(`[data-contact-label="${key}"]`);
        if (label) label.textContent = contactValues.email;
      }
      if (key === "phone") {
        const label = card.querySelector(`[data-contact-label="${key}"]`);
        if (label) label.textContent = contactValues.phone;
      }
    }
    if (href && social) {
      social.href = href;
      social.hidden = false;
      if (["linkedin", "github", "instagram"].includes(key)) {
        social.target = "_blank";
        social.rel = "noopener noreferrer";
      }
    }
  });
  const contactEmpty = document.getElementById("contact-empty");
  if (contactEmpty && Object.values(contactHrefs).some(Boolean)) contactEmpty.hidden = true;

  // Resume link: no broken or empty button is shown.
  const resumeLink = document.getElementById("resume-link");
  if (resumeLink && PORTFOLIO.resumePath) {
    resumeLink.href = PORTFOLIO.resumePath;
    // Check local existence via fetch without blocking page interaction.
    fetch(PORTFOLIO.resumePath, { method: "HEAD" })
      .then((response) => { if (response.ok) resumeLink.hidden = false; })
      .catch(() => {});
  }

  // Project links are hidden until configured.
  Object.entries(PORTFOLIO.projectLinks).forEach(([key, url]) => {
    const link = document.querySelector(`[data-project-link="${key}"]`);
    if (!link || !url) return;
    link.href = url;
    link.hidden = false;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    const unavailable = link.closest(".project-links")?.querySelector(".link-unavailable");
    if (unavailable) unavailable.hidden = true;
  });

  // Theme persistence with a sensible dark default.
  const savedTheme = (() => {
    try { return localStorage.getItem("portfolio-theme"); } catch (_) { return null; }
  })();
  const initialTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
  setTheme(initialTheme, false);
  function setTheme(theme, persist = true) {
    root.dataset.theme = theme;
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.setAttribute("data-theme", "dark");
    if (themeToggle) {
      const iconName = theme === "dark" ? "sun" : "moon";
      themeToggle.innerHTML = `<i data-lucide="${iconName}" aria-hidden="true"></i>`;
      themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
      themeToggle.title = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
    }
    if (persist) {
      try { localStorage.setItem("portfolio-theme", theme); } catch (_) {}
    }
    if (window.lucide) window.lucide.createIcons();
  }
  themeToggle?.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  // Mobile navigation: toggle, close after navigation, outside click and Escape.
  function closeMenu() {
    navPanel?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
    if (menuToggle) menuToggle.innerHTML = '<i data-lucide="menu" aria-hidden="true"></i>';
    if (window.lucide) window.lucide.createIcons();
  }
  function openMenu() {
    navPanel?.classList.add("is-open");
    menuToggle?.setAttribute("aria-expanded", "true");
    menuToggle?.setAttribute("aria-label", "Close navigation menu");
    if (menuToggle) menuToggle.innerHTML = '<i data-lucide="x" aria-hidden="true"></i>';
    if (window.lucide) window.lucide.createIcons();
  }
  menuToggle?.addEventListener("click", () => {
    navPanel?.classList.contains("is-open") ? closeMenu() : openMenu();
  });
  navPanel?.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion.matches ? "auto" : "smooth", block: "start" });
        history.replaceState(null, "", link.getAttribute("href"));
      }
      closeMenu();
    });
  });
  document.addEventListener("click", (event) => {
    if (!navPanel?.classList.contains("is-open")) return;
    if (!navPanel.contains(event.target) && !menuToggle?.contains(event.target)) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });

  // Active navigation tracking.
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-link")];
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-25% 0px -60% 0px", threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Reveal animations. Reduced-motion users see content immediately.
  const revealItems = document.querySelectorAll(".reveal");
  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  // Project filtering without page reload.
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const projectCards = [...document.querySelectorAll(".project-card[data-category]")];
  const projectCount = document.querySelector('[data-filter="all"] span');
  if (projectCount) projectCount.textContent = String(projectCards.length).padStart(2, "0");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((candidate) => {
        const selected = candidate === button;
        candidate.classList.toggle("is-selected", selected);
        candidate.setAttribute("aria-pressed", String(selected));
      });
      projectCards.forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.category !== filter;
      });
    });
  });

  // Back-to-top and footer year.
  document.getElementById("back-to-top")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
  });
  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Create Lucide SVGs after all dynamic icon controls have been prepared.
  if (window.lucide) window.lucide.createIcons();
})();
