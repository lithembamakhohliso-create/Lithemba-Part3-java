/* ============================================
   EASY EVENT HIRE — main.js
   Shared JS: nav, accordion, scroll animations
   ============================================ */

// ── Hamburger nav ────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
}

// ── Active nav link ──────────────────────────────
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.href === location.href) link.classList.add('active');
});

// ── Scroll fade-in ───────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── Accordion ────────────────────────────────────
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = btn.nextElementSibling;
    const isOpen = btn.classList.contains('open');
    // close all
    document.querySelectorAll('.accordion-btn').forEach(b => {
      b.classList.remove('open');
      b.nextElementSibling.classList.remove('open');
    });
    if (!isOpen) {
      btn.classList.add('open');
      body.classList.add('open');
    }
  });
});

// ── Gallery lightbox ─────────────────────────────
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img     = item.querySelector('img');
      const caption = item.dataset.caption || '';
      const lbImg   = document.getElementById('lb-img');
      const lbCap   = document.getElementById('lb-caption');
      if (lbImg && img) { lbImg.src = img.src; lbImg.alt = caption; }
      if (lbCap) lbCap.textContent = caption;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.getElementById('lb-close')?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}
