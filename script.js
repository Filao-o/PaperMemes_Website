// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===== MOBILE BURGER =====
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

// ===== REVEAL ON SCROLL =====
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = !answer.hidden;

    // Close all
    document.querySelectorAll('.faq-answer').forEach(a => { a.hidden = true; });
    document.querySelectorAll('.faq-question').forEach(b => b.setAttribute('aria-expanded', 'false'));

    // Toggle current
    if (!isOpen) {
      answer.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ===== SUITE ACCORDION =====
(function () {
  const DURATION = 5000; // ms per item
  const items = document.querySelectorAll('.suite-item');
  if (!items.length) return;

  let current   = 0;
  let timer     = null;
  let startTime = null;
  let rafId     = null;

  function getBar(item) {
    return item.querySelector('.suite-item-progress-bar');
  }

  function activate(index, resetTimer = true) {
    // Deactivate all
    items.forEach((item, i) => {
      item.classList.remove('suite-item--active');
      item.setAttribute('aria-selected', 'false');
      const bar = getBar(item);
      bar.style.transition = 'none';
      bar.style.width = '0%';
    });

    // Activate selected
    const active = items[index];
    active.classList.add('suite-item--active');
    active.setAttribute('aria-selected', 'true');
    current = index;

    // Switch image
    document.querySelectorAll('.suite-img').forEach(el => {
      el.classList.add('suite-img--hidden');
    });
    const activeImg = document.querySelector(`.suite-img[data-index="${index}"]`);
    if (activeImg) activeImg.classList.remove('suite-img--hidden');

    // Start progress bar
    if (resetTimer) {
      startProgressBar(index);
    }
  }

  function startProgressBar(index) {
    cancelAnimationFrame(rafId);
    clearTimeout(timer);
    startTime = performance.now();

    const bar = getBar(items[index]);
    bar.style.transition = `width ${DURATION}ms linear`;
    // Force reflow
    bar.getBoundingClientRect();
    bar.style.width = '100%';

    timer = setTimeout(() => {
      const next = (current + 1) % items.length;
      activate(next);
    }, DURATION);
  }

  // Click / keyboard interaction
  items.forEach((item, i) => {
    item.addEventListener('click', () => {
      if (i !== current) activate(i);
    });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (i !== current) activate(i);
      }
    });
  });

  // Pause on hover
  const suiteSection = document.querySelector('.suite');
  if (suiteSection) {
    suiteSection.addEventListener('mouseenter', () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
      const bar = getBar(items[current]);
      bar.style.transition = 'none';
      // Freeze width in place
      const computed = window.getComputedStyle(bar).width;
      bar.style.width = computed;
    });
    suiteSection.addEventListener('mouseleave', () => {
      startProgressBar(current);
    });
  }

  // Init
  activate(0);
})();

// ===== HERO PIXEL CANVAS =====
(function () {
  var canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var pixels = [];
  var animId = 0;
  var lastFrame = performance.now();
  var COLORS = [
    'rgba(255,255,255,0.08)',
    'rgba(255,255,255,0.14)',
    'rgba(255,255,255,0.10)',
    'rgba(255,255,255,0.06)',
    'rgba(255,255,255,0.18)',
  ];
  var GAP = 6, SPEED = 30;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function rand(a, b) { return Math.random() * (b - a) + a; }

  function createPixel(x, y, w, h) {
    var color = COLORS[Math.floor(Math.random() * COLORS.length)];
    var dx = x - w / 2, dy = y - h / 2;
    var speed = rand(0.08, 0.4) * Math.min(SPEED, 100) * 0.001;
    var p = {
      x: x, y: y, color: color,
      speed: speed,
      size: 0,
      sizeStep: rand(0.12, 0.28),
      minSize: 0.5,
      maxSize: rand(0.5, 2),
      delay: reducedMotion ? 0 : Math.sqrt(dx*dx + dy*dy) * 0.65,
      counter: 0,
      counterStep: rand(1.8, 3.2) + (w + h) * 0.008,
      isIdle: false, isReverse: false, isShimmer: false,
    };
    p.draw = function() {
      var off = 1 - p.size * 0.5;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x + off, p.y + off, p.size, p.size);
    };
    p.shimmer = function() {
      if (p.size >= p.maxSize) p.isReverse = true;
      else if (p.size <= p.minSize) p.isReverse = false;
      if (p.isReverse) p.size -= p.speed; else p.size += p.speed;
    };
    p.appear = function() {
      p.isIdle = false;
      if (p.counter <= p.delay) { p.counter += p.counterStep; return; }
      if (p.size >= p.maxSize) p.isShimmer = true;
      if (p.isShimmer) p.shimmer(); else p.size += p.sizeStep;
      p.draw();
    };
    return p;
  }

  function init() {
    var w = Math.floor(canvas.parentElement.offsetWidth);
    var h = Math.floor(canvas.parentElement.offsetHeight);
    canvas.width = w; canvas.height = h;
    pixels = [];
    for (var x = 0; x < w; x += GAP) {
      for (var y = 0; y < h; y += GAP) {
        pixels.push(createPixel(x, y, w, h));
      }
    }
  }

  function loop() {
    animId = requestAnimationFrame(loop);
    var now = performance.now();
    if (now - lastFrame < 16.67) return;
    lastFrame = now;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < pixels.length; i++) pixels[i].appear();
  }

  init();
  loop();

  var ro = new ResizeObserver(function() { init(); });
  ro.observe(canvas.parentElement);
})();

// ===== HERO FADE-IN =====
(function () {
  var ctas = document.getElementById('heroCtas');
  var band = document.getElementById('heroBottomBand');
  function show() {
    setTimeout(function() {
      if (ctas) ctas.classList.add('visible');
    }, 450);
    setTimeout(function() {
      if (band) band.classList.add('visible');
    }, 600);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', show);
  } else {
    show();
  }
})();

// ===== HERO BOTTOM TICKER =====
(function () {
  var ticker = document.getElementById('heroBottomTicker');
  if (!ticker) return;
  var pos = 0;
  function step() {
    pos -= 0.6;
    var setWidth = ticker.scrollWidth / 4;
    if (pos <= -setWidth) pos = 0;
    ticker.style.transform = 'translateX(' + pos + 'px)';
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
})();

// ===== WHY CARDS GRID PATTERN =====
(function () {
  const CELL = 20;

  function genSquares(count) {
    return Array.from({ length: count || 5 }, () => [
      Math.floor(Math.random() * 4) + 7,
      Math.floor(Math.random() * 6) + 1,
    ]);
  }

  function buildSVG(squares) {
    const id = 'gp' + Math.random().toString(36).slice(2, 7);
    const rects = squares.map(function (s) {
      return '<rect stroke-width="0" width="' + (CELL + 1) + '" height="' + (CELL + 1) + '" x="' + (s[0] * CELL) + '" y="' + (s[1] * CELL) + '" />';
    }).join('');
    return '<svg aria-hidden="true" class="why-card-grid" xmlns="http://www.w3.org/2000/svg">'
      + '<defs><pattern id="' + id + '" width="' + CELL + '" height="' + CELL + '" patternUnits="userSpaceOnUse" x="-12" y="4">'
      + '<path d="M.5 ' + CELL + 'V.5H' + CELL + '" fill="none" />'
      + '</pattern></defs>'
      + '<rect width="100%" height="100%" stroke-width="0" fill="url(#' + id + ')" />'
      + '<svg x="-12" y="4" class="why-card-grid-squares">' + rects + '</svg>'
      + '</svg>';
  }

  document.querySelectorAll('.why-card').forEach(function (card) {
    const wrap = document.createElement('div');
    wrap.className = 'why-card-pattern';
    wrap.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('div');
    inner.className = 'why-card-pattern-gradient';
    inner.innerHTML = buildSVG(genSquares());
    wrap.appendChild(inner);
    card.insertBefore(wrap, card.firstChild);
  });
})();

// ===== GLOW CARDS =====
(function () {
  document.addEventListener('pointermove', (e) => {
    document.querySelectorAll('[data-glow]').forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left).toFixed(2);
      const y = (e.clientY - rect.top).toFixed(2);
      const xp = ((e.clientX - rect.left) / rect.width).toFixed(2);
      const yp = ((e.clientY - rect.top) / rect.height).toFixed(2);
      card.style.setProperty('--x', x);
      card.style.setProperty('--y', y);
      card.style.setProperty('--xp', xp);
      card.style.setProperty('--yp', yp);
    });
  }, { passive: true });
})();

// ===== PLATFORMS TICKER =====
(function () {
  const ticker = document.querySelector('.platforms-ticker');
  if (!ticker) return;

  let pos = 0;
  const speed = 0.6; // px per frame (~36px/s at 60fps)

  function step() {
    pos -= speed;
    const setWidth = ticker.scrollWidth / 4;
    if (pos <= -setWidth) pos = 0;
    ticker.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
})();

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id     = a.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
