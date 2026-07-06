/* ═══════════════════════════════════════════
   VINCIVE MEDIA — main.js
   Nav, hamburger, scroll reveal, active links
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav scroll effect ── */
  const nav = document.getElementById('mainNav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ── Hamburger menu ── */
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('navMenu');

  if (burger && menu) {
    let open = false;

    const toggleMenu = (state) => {
      open = state;
      menu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';

      const b1 = document.getElementById('b1');
      const b2 = document.getElementById('b2');
      const b3 = document.getElementById('b3');
      if (b1) b1.style.cssText = open ? 'transform:rotate(45deg) translate(5px,5px)' : '';
      if (b2) b2.style.opacity = open ? '0' : '1';
      if (b3) b3.style.cssText = open ? 'transform:rotate(-45deg) translate(5px,-5px)' : '';
    };

    burger.addEventListener('click', () => toggleMenu(!open));

    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => toggleMenu(false));
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && open) toggleMenu(false);
    });
  }

  /* ── Active nav link ── */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPath = href.replace(/\/$/, '') || '/';
    if (currentPath === linkPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
      link.classList.add('active');
    }
  });

  /* ── Scroll reveal ── */
  const revealItems = document.querySelectorAll('.reveal');
  if (revealItems.length > 0) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(el => obs.observe(el));
  }

  /* ── Smooth anchor scroll (for same-page links) ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Contact form (pages/contact.html) ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      if (btn) {
        const original = btn.textContent;
        btn.textContent = 'Sent ✓';
        btn.style.background = '#2d7a2d';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          form.reset();
        }, 3000);
      }
    });
  }

});
