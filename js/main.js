/* =====================================================
   NICHOLAS MWANGI — PLUMBER PORTFOLIO
   Main JavaScript: nav, gallery filter, lightbox,
   video modal, stat counters, form, scroll effects.
   ===================================================== */

(function () {
  'use strict';

  /* ---------- HELPERS ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ============================================================
     1. NAVBAR — sticky background + mobile toggle
     ============================================================ */
  const navbar = $('#navbar');
  const navToggle = $('#navToggle');
  const navLinks = $('#navLinks');

  function handleScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll-to-top button
    const toTop = $('#toTop');
    if (toTop) {
      if (window.scrollY > 600) {
        toTop.classList.add('show');
      } else {
        toTop.classList.remove('show');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile nav toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked
  $$('#navLinks a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Close mobile nav when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });

  /* ============================================================
     2. SCROLL TO TOP
     ============================================================ */
  const toTop = $('#toTop');
  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     3. STAT COUNTERS — animate when hero is in view
     ============================================================ */
  const statNums = $$('.stat-num');
  let countersRun = false;

  function animateCounter(el, target) {
    const duration = 1800;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  function checkCounters() {
    if (countersRun) return;
    const heroStats = $('.hero-stats');
    if (!heroStats) return;

    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      countersRun = true;
      statNums.forEach((el) => {
        const target = parseInt(el.dataset.target, 10) || 0;
        animateCounter(el, target);
      });
    }
  }

  window.addEventListener('scroll', checkCounters, { passive: true });
  window.addEventListener('load', checkCounters);
  checkCounters();

  /* ============================================================
     4. GALLERY — filter + lightbox
     ============================================================ */
  const filterBtns = $$('.filter-btn');
  const galleryItems = $$('.gallery-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      galleryItems.forEach((item) => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    });
  });

  // Lightbox
  const lightbox = $('#lightbox');
  const lightboxImg = $('#lightboxImg');
  const lightboxCaption = $('#lightboxCaption');
  const lightboxClose = $('#lightboxClose');
  const lightboxPrev = $('#lightboxPrev');
  const lightboxNext = $('#lightboxNext');

  let currentLightboxIndex = 0;
  let visibleItems = [];

  function updateVisibleItems() {
    visibleItems = galleryItems.filter((item) => !item.classList.contains('hide'));
  }

  function openLightbox(index) {
    updateVisibleItems();
    if (index < 0) index = visibleItems.length - 1;
    if (index >= visibleItems.length) index = 0;
    currentLightboxIndex = index;

    const item = visibleItems[index];
    if (!item) return;

    const img = $('img', item);
    const caption = $('.cap-title', item);

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      updateVisibleItems();
      const visibleIdx = visibleItems.indexOf(item);
      openLightbox(visibleIdx);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => openLightbox(currentLightboxIndex - 1));
  lightboxNext.addEventListener('click', () => openLightbox(currentLightboxIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox(currentLightboxIndex - 1);
    if (e.key === 'ArrowRight') openLightbox(currentLightboxIndex + 1);
  });

  /* ============================================================
     5. VIDEO MODAL — open thumbnails in modal player
     ============================================================ */
  const videoThumbs = $$('.video-thumb');
  const videoModal = $('#videoModal');
  const videoModalPlayer = $('#videoModalPlayer');
  const videoModalClose = $('#videoModalClose');

  function openVideoModal(src, poster) {
    videoModalPlayer.src = src;
    if (poster) videoModalPlayer.poster = poster;
    videoModal.classList.add('open');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    videoModalPlayer.play().catch(() => {
      // Autoplay may be blocked — user can press play.
    });
  }

  function closeVideoModal() {
    videoModalPlayer.pause();
    videoModalPlayer.removeAttribute('src');
    videoModalPlayer.load();
    videoModal.classList.remove('open');
    videoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  videoThumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const src = thumb.dataset.video;
      const poster = thumb.dataset.poster;
      openVideoModal(src, poster);
    });
  });

  videoModalClose.addEventListener('click', closeVideoModal);
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('open')) {
      closeVideoModal();
    }
  });

  /* ============================================================
     6. CONTACT FORM — front-end validation + mailto fallback
     ============================================================
     Since this is a static site, the form composes a WhatsApp
     message with the user's input and opens WhatsApp Web / app.
     Swap to a real backend (Formspree, Vercel function) later.
  */
  const contactForm = $('#contactForm');
  const formNote = $('#formNote');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = $('#name').value.trim();
      const phone = $('#phone').value.trim();
      const location = $('#location').value.trim();
      const service = $('#service').value;
      const message = $('#message').value.trim();

      // Validation
      if (!name || !phone || !location || !service) {
        formNote.textContent = 'Please fill in your name, phone, location and select a service.';
        formNote.className = 'form-note error';
        return;
      }

      // Compose WhatsApp message
      const waNumber = '254712345678'; // <-- change to Nicholas's real WhatsApp number
      const text =
        `Hello Nicholas, I'd like to request a quote.%0A%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Phone:* ${encodeURIComponent(phone)}%0A` +
        `*Location:* ${encodeURIComponent(location)}%0A` +
        `*Service:* ${encodeURIComponent(service)}%0A` +
        `*Details:* ${encodeURIComponent(message || '—')}`;

      const waUrl = `https://wa.me/${waNumber}?text=${text}`;

      formNote.textContent = 'Opening WhatsApp with your details…';
      formNote.className = 'form-note success';

      setTimeout(() => {
        window.open(waUrl, '_blank');
        contactForm.reset();
        setTimeout(() => {
          formNote.textContent = '';
          formNote.className = 'form-note';
        }, 4000);
      }, 600);
    });
  }

  /* ============================================================
     7. SCROLL REVEAL — fade up elements as they enter viewport
     ============================================================ */
  const revealEls = $$(
    '.section-head, .service-card, .gallery-item, .testimonial-card, .video-card, .about-text p, .about-checks, .contact-info, .contact-form, .footer-col'
  );

  // Add base style for reveal
  const style = document.createElement('style');
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  revealEls.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback — just show everything
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ============================================================
     8. FOOTER YEAR
     ============================================================ */
  const yearEl = $('#year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ============================================================
     9. SMOOTH SCROLL — for older browsers without CSS smooth
     ============================================================ */
  $$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });

  console.log('%cNicholas Mwangi — Plumbing Portfolio', 'color:#e76f51;font-weight:bold;font-size:14px;');
  console.log('%cBuilt with HTML, CSS & JS. Ready for Vercel.', 'color:#b4c0d2;');
})();
