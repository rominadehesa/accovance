/* =============================================================
   ACCOVANCE — interacciones
   - Header sticky: alto real (--header-h) y estado .is-stuck
   - Navegación: scrollspy (aria-current) y menú móvil
   - Año dinámico en el pie
   Sin efectos de cursor, progreso de lectura ni acordeones.
   ============================================================= */
(function () {
  'use strict';

  /* ---------- Header: alto real y estado sticky ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var setHeaderHeight = function () {
      var h = Math.round(header.getBoundingClientRect().height);
      if (h > 0) document.documentElement.style.setProperty('--header-h', h + 'px');
    };
    setHeaderHeight();
    window.addEventListener('resize', setHeaderHeight, { passive: true });
    window.addEventListener('load', setHeaderHeight);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(setHeaderHeight);
    }
    if ('ResizeObserver' in window) {
      new ResizeObserver(setHeaderHeight).observe(header);
    }
  }

  /* ---------- Año dinámico ---------- */
  var year = document.getElementById('footer-year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Menú móvil ---------- */
  var menu = document.getElementById('nav-menu');
  if (menu) {
    var closeMenu = function () { if (menu.open) menu.open = false; };

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (e) {
      if (menu.open && !menu.contains(e.target)) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.open) {
        closeMenu();
        var summary = menu.querySelector('summary');
        if (summary) summary.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 940) closeMenu();
    }, { passive: true });
  }

  /* ---------- Scrollspy (solo secciones del menú) ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  if (links.length && 'IntersectionObserver' in window) {
    var sectionIds = [];
    links.forEach(function (link) {
      var id = link.getAttribute('data-nav');
      if (id && sectionIds.indexOf(id) === -1) sectionIds.push(id);
    });

    var sections = sectionIds
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    if (sections.length) {
      var current = '';
      var setActive = function (id) {
        if (id === current) return;
        current = id;
        links.forEach(function (link) {
          var on = link.getAttribute('data-nav') === id;
          link.classList.toggle('is-active', on);
          if (on) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      };

      var scrollSpy = new IntersectionObserver(function (entries) {
        var visible = entries.filter(function (en) { return en.isIntersecting; });
        if (!visible.length) return;
        visible.sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
        setActive(visible[0].target.id);
      }, {
        rootMargin: '-25% 0px -60% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      });

      sections.forEach(function (section) { scrollSpy.observe(section); });
    }
  }

  /* ---------- Números: reveal editorial ---------- */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var numberItems = document.querySelectorAll('.rows .row, .steps .step');
    if (numberItems.length) {
      try {
        document.documentElement.classList.add('js-motion');
        var numberObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in-view');
              numberObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });

        numberItems.forEach(function (item) { numberObserver.observe(item); });
      } catch (err) {
        document.documentElement.classList.remove('js-motion');
      }
    }
  }

  /* ---------- Estado sticky en scroll ---------- */
  var ticking = false;
  var update = function () {
    ticking = false;
    var y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle('is-stuck', y > 8);
  };
  var onScroll = function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  update();
})();
