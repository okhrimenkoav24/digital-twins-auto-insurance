/* Minimal client JS for the Research Hub.
   Goals: mark active nav link based on URL, drive the Artifacts dropdown,
   expose updated-at timestamp, and respect prefers-reduced-motion. */

(function () {
  'use strict';

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

  // Mark the Artifacts dropdown trigger as active when on an artifact subpage
  document.querySelectorAll('.nav__trigger').forEach(function (btn) {
    if (isOnArtifact) btn.setAttribute('data-active', 'true');
  });

  // Mark the active item inside the dropdown menu as well
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
      // close all other dropdowns first
      triggers.forEach(function (other) { if (other !== btn) other.setAttribute('aria-expanded', 'false'); });
      btn.setAttribute('aria-expanded', String(!open));
    });
  });

  // Close on outside click
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

  // Close on Escape
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
      } catch (e) { /* keep whatever was in the element */ }
    }
  });
})();
