/* =============================================================
   ACCOVANCE — interacciones
   - Hero: luz que sigue al cursor + parallax del logo
   - Header sticky: alto real (--header-h) + estado .is-stuck
   - Navegación: scrollspy (aria-current) y menú móvil
   - Barra de progreso de lectura
   - Fallback de animaciones de scroll para navegadores sin
     `animation-timeline: view()`
   ============================================================= */
(function () {
  'use strict';

  var supportsTimeline = window.CSS && CSS.supports && CSS.supports('animation-timeline: view()');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Hero: mousemove / mouseleave ---------- */
  var hero = document.querySelector('[data-hero]');
  if (hero) {
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = e.clientX - r.left;
      var y = e.clientY - r.top;
      hero.style.setProperty('--mx', x + 'px');
      hero.style.setProperty('--my', y + 'px');
      hero.style.setProperty('--px', ((x / r.width - 0.5) * -28) + 'px');
      hero.style.setProperty('--py', ((y / r.height - 0.5) * -20) + 'px');
    });
    hero.addEventListener('mouseleave', function () {
      hero.style.setProperty('--px', '0px');
      hero.style.setProperty('--py', '0px');
    });
  }

  /* ---------- Header: alto real y estado fijo ---------- */
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

  /* ---------- Barra de progreso de lectura ---------- */
  var progress = document.querySelector('.scroll-progress');
  var supportsScrollTimeline = window.CSS && CSS.supports && CSS.supports('animation-timeline: scroll()');
  if (progress && !supportsScrollTimeline) {
    document.documentElement.classList.add('no-scroll-timeline');
  }

  /* ---------- Año dinámico en el pie ---------- */
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

  /* ---------- Scrollspy ---------- */
  var linkSelector = '[data-nav]';
  var links = Array.prototype.slice.call(document.querySelectorAll(linkSelector));
  if (links.length && 'IntersectionObserver' in window) {
    var current = '';
    var setActive = function (id) {
      if (id === current) return;
      current = id;
      links.forEach(function (link) {
        var on = link.getAttribute('data-nav') === id;
        link.classList.toggle('is-active', on);
        if (on) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
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

    document.querySelectorAll('main section[id], #inicio').forEach(function (section) {
      if (section.id) scrollSpy.observe(section);
    });
  }

  /* ---------- Acordeón (Servicios / Diferencial) en mobile ---------- */
  var accordions = Array.prototype.slice.call(document.querySelectorAll('.accordion'));
  if (accordions.length) {
    var MOBILE_MQ = window.matchMedia('(max-width: 760px)');
    var mobileOpen = new WeakMap();

    var applyAccordion = function (isMobile) {
      accordions.forEach(function (group) {
        group.querySelectorAll('details').forEach(function (item, i) {
          if (isMobile) {
            if (!mobileOpen.has(item)) mobileOpen.set(item, i === 0);
            item.open = mobileOpen.get(item);
          } else {
            item.open = true;
          }
        });
      });
    };

    accordions.forEach(function (group) {
      group.querySelectorAll('details').forEach(function (item) {
        item.addEventListener('toggle', function () {
          if (MOBILE_MQ.matches) mobileOpen.set(item, item.open);
        });
      });
    });

    applyAccordion(MOBILE_MQ.matches);
    var onMQ = function (e) { applyAccordion(e.matches); };
    if (MOBILE_MQ.addEventListener) MOBILE_MQ.addEventListener('change', onMQ);
    else if (MOBILE_MQ.addListener) MOBILE_MQ.addListener(onMQ);
  }

  /* ---------- Actualización en scroll (stuck + progreso fallback) ---------- */
  var ticking = false;
  var update = function () {
    ticking = false;
    var y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle('is-stuck', y > 8);
    if (progress && !supportsScrollTimeline) {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      progress.style.setProperty('--progress', p.toFixed(4));
    }
  };
  var onScroll = function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  update();

  /* ---------- Fallback de animaciones de scroll ---------- */
  if (!supportsTimeline && !reduceMotion) {
    document.documentElement.classList.add('no-timeline');

    var targets = document.querySelectorAll('.sv-up, .sv-reveal, .sv-stag > *');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

      targets.forEach(function (el) { io.observe(el); });
    } else {
      targets.forEach(function (el) { el.classList.add('is-in-view'); });
    }
  }
})();
