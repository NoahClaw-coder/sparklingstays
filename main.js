/* ============================================================
   Sparkling Stays — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Language toggle ─────────────────────────────────────── */
  var LANG_KEY = 'ss_lang';
  var currentLang = localStorage.getItem(LANG_KEY) || 'en';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);

    // Swap data-en / data-fr text
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var val = el.getAttribute('data-' + lang);
      if (val !== null) el.textContent = val;
    });

    // Toggle .lang-en / .lang-fr blocks
    document.querySelectorAll('.lang-en').forEach(function (el) {
      el.style.display = lang === 'en' ? '' : 'none';
    });
    document.querySelectorAll('.lang-fr').forEach(function (el) {
      el.style.display = lang === 'fr' ? '' : 'none';
    });

    // Update html lang attribute
    document.documentElement.lang = lang === 'fr' ? 'fr-CA' : 'en-CA';

    // Update toggle button label
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.textContent = lang === 'en' ? 'FR' : 'EN';
      btn.setAttribute('aria-label', lang === 'en' ? 'Switch to French' : 'Switch to English');
    });
  }

  document.querySelectorAll('.lang-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLanguage(currentLang === 'en' ? 'fr' : 'en');
    });
  });

  // Apply stored preference on load
  if (currentLang === 'fr') applyLanguage('fr');

  /* ── Mobile hamburger ────────────────────────────────────── */
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── FAQ accordion ───────────────────────────────────────── */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var isOpen = btn.classList.contains('open');
      var parent = btn.closest('.faq-list');

      // Close all in same list
      if (parent) {
        parent.querySelectorAll('.faq-question.open').forEach(function (q) {
          q.classList.remove('open');
          var a = q.nextElementSibling;
          if (a) a.classList.remove('open');
        });
      }

      // Open clicked (if wasn't open)
      if (!isOpen) {
        btn.classList.add('open');
        var answer = btn.nextElementSibling;
        if (answer) answer.classList.add('open');
      }
    });
  });

  /* ── Smooth scroll for anchor links ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      if (!id) return;
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ── Quote form handling ─────────────────────────────────── */
  var quoteForm = document.getElementById('quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = quoteForm.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      // TODO: Replace with actual form submission endpoint
      setTimeout(function () {
        var msg = document.getElementById('form-success');
        if (msg) {
          msg.style.display = 'block';
          quoteForm.style.display = 'none';
        } else {
          btn.textContent = 'Sent! We will contact you shortly.';
        }
      }, 800);
    });
  }

})();
