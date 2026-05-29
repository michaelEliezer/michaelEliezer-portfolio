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
  // This portfolio is intentionally dark/luxury by default.
  const preferred = saved || 'dark';
  applyTheme(preferred);
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


// ─── CINEMATIC SLIDESHOW INTRO ──────────────────────────────
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const cinematicIntro = document.getElementById('cinematicIntro');
const introSlides = cinematicIntro
  ? Array.from(cinematicIntro.querySelectorAll('.cinematic-slide'))
  : [];
const introSkip = document.getElementById('introSkip');
const brandReplay = document.getElementById('brandReplay');

let introTimers = [];
let pageAnimationsStarted = false;

function clearIntroTimers() {
  introTimers.forEach((timer) => clearTimeout(timer));
  introTimers = [];
}

function setIntroSlide(index) {
  introSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === index);
  });
}

function closeCinematicIntro() {
  if (!cinematicIntro) return;

  cinematicIntro.classList.add('intro-hide');
  document.body.classList.remove('intro-active');
  document.body.classList.add('page-ready');

  introTimers.push(setTimeout(() => {
    cinematicIntro.setAttribute('aria-hidden', 'true');
  }, 900));

  startPageAnimations();
}

function playCinematicIntro({ replay = false } = {}) {
  if (!cinematicIntro || !introSlides.length) return;

  clearIntroTimers();
  setIntroSlide(0);
  cinematicIntro.classList.remove('intro-hide');
  cinematicIntro.setAttribute('aria-hidden', 'false');
  document.body.classList.add('intro-active');

  if (!replay) {
    window.scrollTo(0, 0);
  }

  introTimers.push(setTimeout(() => setIntroSlide(1), 1700));
  introTimers.push(setTimeout(() => setIntroSlide(2), 3400));
  introTimers.push(setTimeout(() => closeCinematicIntro(), 5300));
}

introSkip?.addEventListener('click', () => {
  clearIntroTimers();
  closeCinematicIntro();
});

brandReplay?.addEventListener('click', (event) => {
  event.preventDefault();
  playCinematicIntro({ replay: true });
});

window.addEventListener('load', () => {
  playCinematicIntro();
});


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


// ─── CONTACT FORM FEEDBACK ───────────────────────────────────
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

if (form && note) {
  form.addEventListener('submit', () => {
    note.textContent = 'Sending message...';
    note.style.color = 'var(--accent-warm)';
  });
}


// ─── GSAP ANIMATIONS ─────────────────────────────────────────
function startPageAnimations() {
  if (pageAnimationsStarted) return;
  pageAnimationsStarted = true;

  if (!(window.gsap && window.ScrollTrigger)) {
    document.body.classList.add('fallback-animated');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance after slideshow closes.
  gsap.from('.badge', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power3.out'
  });

  gsap.from('.hero h1', {
    opacity: 0,
    y: 38,
    duration: 1,
    delay: 0.1,
    ease: 'power3.out'
  });

  gsap.from('.hero-sub', {
    opacity: 0,
    y: 35,
    duration: 0.9,
    delay: 0.28,
    ease: 'power3.out'
  });

  gsap.from('.hero-actions', {
    opacity: 0,
    y: 25,
    duration: 0.8,
    delay: 0.42,
    ease: 'power3.out'
  });

  gsap.from('.code-card', {
    opacity: 0,
    x: 80,
    rotate: 4,
    duration: 1.1,
    delay: 0.25,
    ease: 'power3.out'
  });

  gsap.from('.hero-stat', {
    opacity: 0,
    y: 35,
    duration: 0.8,
    delay: 0.6,
    stagger: 0.12,
    ease: 'power3.out'
  });

  gsap.to('.code-card', {
    y: -14,
    rotate: 1.2,
    duration: 3.4,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });

  gsap.utils.toArray('.section').forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 70,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  gsap.utils.toArray('.svc-card').forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 55,
      duration: 0.8,
      delay: index * 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  gsap.utils.toArray('.project-item').forEach((item) => {
    gsap.from(item, {
      opacity: 0,
      x: -45,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  gsap.to('.hero-right', {
    y: -28,
    scale: 1.01,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom 45%',
      scrub: true
    }
  });
}
