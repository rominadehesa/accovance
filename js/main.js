/* =============================================================
   ACCOVANCE — interacciones
   - Header sticky: alto real (--header-h) y estado .is-stuck
   - Navegación: scrollspy (aria-current) y menú móvil
   - Acordeones: apertura y cierre accesibles con transición
   - Año dinámico en el pie
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
    var summary = menu.querySelector('summary');
    var closeMenu = function () { if (menu.open) menu.open = false; };

    menu.addEventListener('toggle', function () {
      var open = menu.open;
      document.body.classList.toggle('menu-open', open);
      if (header) header.classList.toggle('is-menu-open', open);
      if (summary) summary.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (e) {
      if (menu.open && !menu.contains(e.target)) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.open) {
        closeMenu();
        if (summary) summary.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 940) closeMenu();
    }, { passive: true });
  }

  /* ---------- Acordeones ---------- */
  var accordions = document.querySelectorAll('[data-accordion]');
  accordions.forEach(function (accordion) {
    accordion.classList.add('is-ready');

    accordion.querySelectorAll('.acc-item').forEach(function (item) {
      var trigger = item.querySelector('.acc-trigger');
      var panel = item.querySelector('.acc-panel');
      if (!trigger || !panel) return;

      var setOpen = function (open) {
        item.classList.toggle('is-open', open);
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.setAttribute('aria-hidden', open ? 'false' : 'true');
        if (open) panel.removeAttribute('inert');
        else panel.setAttribute('inert', '');
      };

      setOpen(false);

      trigger.addEventListener('click', function () {
        setOpen(trigger.getAttribute('aria-expanded') !== 'true');
      });
    });
  });

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

  /* ---------- Video del hero: autoplay con fallback ---------- */
  var heroVideo = document.querySelector('.hero-media__video');
  if (heroVideo) {
    var motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

    var playHeroVideo = function () {
      if (motionQuery && motionQuery.matches) return;
      heroVideo.muted = true;
      heroVideo.playsInline = true;
      heroVideo.setAttribute('webkit-playsinline', '');
      var attempt = heroVideo.play();
      if (attempt && typeof attempt.catch === 'function') {
        attempt.catch(function () {});
      }
    };

    var syncHeroVideo = function () {
      if (motionQuery && motionQuery.matches) {
        heroVideo.autoplay = false;
        heroVideo.pause();
      } else {
        playHeroVideo();
      }
    };

    syncHeroVideo();

    ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough'].forEach(function (eventName) {
      heroVideo.addEventListener(eventName, playHeroVideo);
    });

    var resumeOnInteraction = function () {
      if (heroVideo.paused) playHeroVideo();
    };
    ['touchstart', 'pointerdown', 'click', 'keydown'].forEach(function (eventName) {
      document.addEventListener(eventName, resumeOnInteraction, { passive: true });
    });

    if (motionQuery) {
      if (typeof motionQuery.addEventListener === 'function') {
        motionQuery.addEventListener('change', syncHeroVideo);
      } else if (typeof motionQuery.addListener === 'function') {
        motionQuery.addListener(syncHeroVideo);
      }
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) heroVideo.pause();
      else syncHeroVideo();
    });

    window.addEventListener('pageshow', syncHeroVideo);
  }

  /* ---------- Números: reveal editorial ---------- */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var numberItems = document.querySelectorAll('.steps .step');
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
