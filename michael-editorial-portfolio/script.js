// ─── THEME TOGGLE ────────────────────────────────────────────
const themeBtn = document.getElementById('themeToggle');
const icon = themeBtn?.querySelector('.theme-icon');

function applyTheme(theme, save = false) {
  const isDark = theme === 'dark';

  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.dataset.theme = theme;

  if (icon) {
    icon.textContent = isDark ? '☾' : '☀︎';
  }

  if (themeBtn) {
    themeBtn.setAttribute('aria-pressed', String(isDark));
  }

  if (save) {
    localStorage.setItem('portfolioTheme', theme);
  }
}

function initTheme() {
  const saved = localStorage.getItem('portfolioTheme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const preferred = saved || (prefersDark.matches ? 'dark' : 'light');

  applyTheme(preferred);

  if (!saved) {
    prefersDark.addEventListener?.('change', (event) => {
      applyTheme(event.matches ? 'dark' : 'light');
    });
  }
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const next = document.documentElement.classList.contains('dark')
      ? 'light'
      : 'dark';

    applyTheme(next, true);
  });
}

initTheme();


// ─── NAV ACTIVE STATE ────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, {
  rootMargin: '-40% 0px -50% 0px'
});

sections.forEach(section => observer.observe(section));


// ─── FOOTER YEAR ─────────────────────────────────────────────
const yearEl = document.getElementById('footerYear');

if (yearEl) {
  yearEl.textContent = `© ${new Date().getFullYear()} · Frontend Developer`;
}




// ─── HAMBURGER MENU ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function closeMobileMenu() {
  hamburger?.classList.remove('open');
  mobileMenu?.classList.remove('open');
  hamburger?.setAttribute('aria-expanded', 'false');
  mobileMenu?.setAttribute('aria-hidden', 'true');
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');

    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  });

  mobileMenu.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });
}


// ─── SMOOTH SCROLL WITH NAV OFFSET ───────────────────────────
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');

    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();

    const navHeight = document.getElementById('nav')?.offsetHeight || 0;
    const extraGap = 16;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - extraGap;

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });

    history.pushState(null, '', href);
    closeMobileMenu?.();
  });
});

// ─── CONTACT FORM FEEDBACK ───────────────────────────────────
// IMPORTANT:
// Do NOT use e.preventDefault() here because your form uses Netlify.
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

if (form && note) {
  form.addEventListener('submit', () => {
    note.textContent = "Sending message...";
    note.style.color = 'var(--accent-warm)';
  });
}


// ─── GSAP ANIMATIONS ─────────────────────────────────────────
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance
  gsap.from(".badge", {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power3.out"
  });


  gsap.from(".hero-sub", {
    opacity: 0,
    y: 35,
    duration: 0.9,
    delay: 0.3,
    ease: "power3.out"
  });

  gsap.from(".hero-actions", {
    opacity: 0,
    y: 25,
    duration: 0.8,
    delay: 0.45,
    ease: "power3.out"
  });

  gsap.from(".code-card", {
    opacity: 0,
    x: 80,
    rotate: 4,
    duration: 1.1,
    delay: 0.25,
    ease: "power3.out"
  });

  gsap.from(".hero-stat", {
    opacity: 0,
    y: 35,
    duration: 0.8,
    delay: 0.6,
    stagger: 0.12,
    ease: "power3.out"
  });

  // Floating code card
  gsap.to(".code-card", {
    y: -16,
    rotate: 1.5,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  });

  // Scroll reveal sections
  gsap.utils.toArray(".section").forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 70,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 82%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Services cards reveal
  gsap.utils.toArray(".svc-card, .process-card").forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 55,
      duration: 0.8,
      delay: index * 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Project items reveal
  gsap.utils.toArray(".project-item").forEach((item) => {
    gsap.from(item, {
      opacity: 0,
      x: -45,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Hero right visual scroll effect
  gsap.to(".hero-right", {
    y: -28,
    scale: 1.01,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom 45%",
      scrub: true
    }
  });
}