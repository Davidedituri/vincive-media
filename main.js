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

  /* ---- work card video modal (YouTube / Vimeo) ---- */
  function vinciveGetEmbedUrl(url){
    // youtube-nocookie.com + modestbranding/rel/controls params keep this feeling
    // like a native Vincive player instead of a YouTube page dropped on top of the site
    let m = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/)([\w-]{11})/);
    if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`;
    m = url.match(/vimeo\.com\/(\d+)/);
    if (m) return `https://player.vimeo.com/video/${m[1]}?autoplay=1&byline=0&title=0&portrait=0&dnt=1`;
    return null;
  }

  const videoCards = document.querySelectorAll('[data-video]');
  const videoModal = document.getElementById('videoModal');
  const videoModalFrame = document.getElementById('videoModalFrame');
  const videoModalTitle = document.getElementById('videoModalTitle');

  function openVideoModal(url, title){
    const embed = vinciveGetEmbedUrl(url);
    if (!embed || !videoModal || !videoModalFrame) return;
    videoModalFrame.innerHTML = `<iframe src="${embed}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    if (videoModalTitle) videoModalTitle.textContent = title || '';
    videoModal.classList.add('is-open');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal(){
    if (!videoModal || !videoModalFrame) return;
    videoModal.classList.remove('is-open');
    videoModal.setAttribute('aria-hidden', 'true');
    videoModalFrame.innerHTML = '';
    document.body.style.overflow = '';
  }

  videoCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const titleEl = card.querySelector('h3');
      openVideoModal(card.dataset.video, titleEl ? titleEl.textContent : '');
    });
  });

  if (videoModal) {
    videoModal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeVideoModal));
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVideoModal();
  });

});
