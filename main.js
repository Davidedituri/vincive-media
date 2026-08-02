/* ============================================================
   VINCIVE MEDIA — main.js
   Nav scroll state, mobile menu, scroll-reveal, project filters.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- footer year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- nav scroll state ---- */
  const nav = document.getElementById('siteNav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- mobile nav toggle ---- */
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('is-open');
      toggle.classList.toggle('is-active');
      document.body.style.overflow = links.classList.contains('is-open') ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- scroll reveal ---- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
      io.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---- project filters (projects.html) ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card[data-category]');
  if (filterBtns.length && workCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const filter = btn.dataset.filter;

        workCards.forEach(card => {
          const cats = card.dataset.category || '';
          const show = filter === 'all' || cats.split(' ').includes(filter);
          card.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  /* ---- hero video: ensure autoplay on mobile / after user gesture ---- */
  const heroVideo = document.querySelector('.hero-media video');
  if (heroVideo) {
    const tryPlay = () => heroVideo.play().catch(() => {});
    tryPlay();
    document.addEventListener('touchstart', tryPlay, { once: true, passive: true });
    document.addEventListener('click', tryPlay, { once: true });
  }

});
