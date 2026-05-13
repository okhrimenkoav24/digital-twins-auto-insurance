/* Minimal client JS for the Research Hub.
   - Active nav link / dropdown active state
   - Artifacts dropdown behaviour
   - Last-updated timestamp formatting
   - Header shadow on scroll
   - IntersectionObserver-driven scroll reveal for [data-reveal] elements
   - Respects prefers-reduced-motion.
*/

(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- 1. Active nav link / dropdown active state ----------------------------
  var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (path === '' || path === '/') path = 'index.html';

  var artifactPages = ['research.html', 'zine.html', 'simulator.html', 'podcast.html'];
  var isOnArtifact = artifactPages.indexOf(path) !== -1;

  document.querySelectorAll('.nav__link').forEach(function (a) {
    var href = (a.getAttribute('href') || '').toLowerCase().replace(/^\.\//, '');
    if (href === path || (path === 'index.html' && (href === '' || href === 'index.html'))) {
      a.setAttribute('aria-current', 'page');
    }
  });

  document.querySelectorAll('.nav__trigger').forEach(function (btn) {
    if (isOnArtifact) btn.setAttribute('data-active', 'true');
  });

  document.querySelectorAll('.nav__menu a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').toLowerCase().replace(/^\.\//, '');
    if (href === path) a.setAttribute('aria-current', 'page');
  });

  // --- 2. Dropdown behaviour --------------------------------------------------
  var triggers = document.querySelectorAll('.nav__trigger');
  triggers.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = btn.getAttribute('aria-expanded') === 'true';
      triggers.forEach(function (other) { if (other !== btn) other.setAttribute('aria-expanded', 'false'); });
      btn.setAttribute('aria-expanded', String(!open));
    });
  });

  document.addEventListener('click', function (e) {
    triggers.forEach(function (btn) {
      if (btn.getAttribute('aria-expanded') === 'true') {
        var menuId = btn.getAttribute('aria-controls');
        var menu = menuId ? document.getElementById(menuId) : btn.nextElementSibling;
        if (!btn.contains(e.target) && (!menu || !menu.contains(e.target))) {
          btn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      triggers.forEach(function (btn) {
        if (btn.getAttribute('aria-expanded') === 'true') {
          btn.setAttribute('aria-expanded', 'false');
          btn.focus();
        }
      });
    }
  });

  // --- 3. Last-updated timestamps --------------------------------------------
  document.querySelectorAll('[data-updated]').forEach(function (el) {
    var d = el.getAttribute('data-updated');
    if (d) {
      try {
        var date = new Date(d);
        if (!isNaN(date.getTime())) {
          el.textContent = date.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
        }
      } catch (e) { /* keep as-is */ }
    }
  });

  // --- 4. Header shadow on scroll --------------------------------------------
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- 5. Scroll reveal -------------------------------------------------------
  // Any element with [data-reveal] fades + slides into view as it enters the viewport.
  // Variants: [data-reveal] (default fade-up), "left", "right", "scale", "fade".
  // Stagger: [data-delay="1"]..[data-delay="6"] (80ms increments, defined in CSS).
  var revealEls = document.querySelectorAll('[data-reveal]');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    // Reveal everything immediately if motion is reduced or observer is unsupported.
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.12
    });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // --- 6. KPI / bar animation trigger ---------------------------------------
  // Add .is-visible to .kpi and .bar elements when they enter view so the
  // ::after fill animation runs (independent of [data-reveal]).
  var animatedBars = document.querySelectorAll('.kpi, .bar');
  if (animatedBars.length && 'IntersectionObserver' in window && !prefersReduced) {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io2.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.2 });
    animatedBars.forEach(function (el) { io2.observe(el); });
  } else if (prefersReduced) {
    animatedBars.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
