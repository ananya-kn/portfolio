/* =============================================
   ANANYA K N — script.js
   Exact replica of Sathyam's bento-portfolio
   ============================================= */

/* ── 1. THEME ──────────────────────────────── */
const html      = document.documentElement;
const themeIcon = document.getElementById('themeIcon');
const gradRed   = document.getElementById('gradRed');
const gradPurple= document.getElementById('gradPurple');

const MOON_SVG = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const SUN_SVG  = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

let isDark = true;

function applyTheme(dark) {
  isDark = dark;
  html.classList.toggle('dark',  dark);
  html.classList.toggle('light', !dark);
  themeIcon.innerHTML = dark ? MOON_SVG : SUN_SVG;
  // swap gradients
  gradRed.style.opacity    = dark ? '1' : '0';
  gradPurple.style.opacity = dark ? '0' : '1';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

function toggleTheme() {
  applyTheme(!isDark);
}

// init
(function() {
  const saved = localStorage.getItem('theme');
  applyTheme(saved ? saved === 'dark' : true);
})();

/* ── 2. FOOTER YEAR ─────────────────────────── */
document.getElementById('yr').textContent = new Date().getFullYear();

/* ── 3. NAV SLIDING INDICATOR ───────────────── */
const navShell     = document.getElementById('navShell');
const navIndicator = document.getElementById('navIndicator');
const navItems     = document.querySelectorAll('.nav-item');

function moveIndicator(btn) {
  const shellRect = navShell.getBoundingClientRect();
  const btnRect   = btn.getBoundingClientRect();
  navIndicator.style.left  = (btnRect.left - shellRect.left) + 'px';
  navIndicator.style.width = btnRect.width + 'px';
}

navItems.forEach(btn => {
  btn.addEventListener('click', () => {
    navItems.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    moveIndicator(btn);
  });
});

// set initial indicator position
window.addEventListener('load', () => {
  const active = document.querySelector('.nav-item.active');
  if (active) moveIndicator(active);
});
window.addEventListener('resize', () => {
  const active = document.querySelector('.nav-item.active');
  if (active) moveIndicator(active);
});

/* ── 4. FILTER LOGIC ────────────────────────── */
const cards = document.querySelectorAll('.card[data-category]');

function setFilter(filter, btn) {
  // update nav
  navItems.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  moveIndicator(btn);

  cards.forEach(card => {
    const cat = card.dataset.category;
    const show =
      filter === 'all'     ? true :
      filter === 'about'   ? (cat === 'about' || cat === 'all') :
      filter === 'projects'? (cat === 'projects' || cat === 'all') :
      true;

    if (show) {
      card.classList.remove('hidden-filter', 'grayed');
      card.style.display = '';
    } else {
      card.classList.add('hidden-filter');
      card.style.display = 'none';
    }
  });

  // re-trigger fall-in for visible cards
  triggerFallIn();
}

/* ── 5. FALL-IN ANIMATION ───────────────────── */
function triggerFallIn() {
  const visible = [...document.querySelectorAll('.card:not(.hidden-filter)')];
  visible.forEach((card, i) => {
    card.classList.remove('landed');
    card.style.opacity = '0';
    // random slight offset for natural feel
    const xRange = [-8, -4, 0, 4, 8];
    const rRange = [-3, -1.5, 0, 1.5, 3];
    const yRange = [40, 55, 70, 85, 100];
    const rx = xRange[Math.floor(Math.random()*xRange.length)];
    const rot= rRange[Math.floor(Math.random()*rRange.length)];
    const ry = yRange[Math.floor(Math.random()*yRange.length)];
    card.style.setProperty('--fall-x', rx + 'px');
    card.style.setProperty('--fall-y', -(ry) + 'px');
    card.style.setProperty('--fall-rot', rot + 'deg');
    card.style.setProperty('--fall-delay', (i * 0.07) + 's');
    card.style.setProperty('--fall-dur', '0.85s');
    card.style.setProperty('--thud-delay', (i * 0.07 + 0.55) + 's');

    // add thud ring if not present
    if (!card.querySelector('.thud-ring')) {
      const ring = document.createElement('div');
      ring.className = 'thud-ring';
      card.prepend(ring);
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.classList.add('landed');
      });
    });
  });
}

// initial fall-in on page load
window.addEventListener('load', () => {
  setTimeout(triggerFallIn, 100);
});

/* ── 6. DRAG & DROP ─────────────────────────── */
let dragSrc  = null;
let ghost    = null;
let offsetX  = 0;
let offsetY  = 0;

const grid = document.getElementById('gridContainer');

cards.forEach(card => {
  card.addEventListener('mousedown', startDrag);
  card.addEventListener('touchstart', startDragTouch, { passive: true });
});

function startDrag(e) {
  if (e.button !== 0) return;
  if (e.target.closest('a, button')) return;
  initDrag(e.currentTarget, e.clientX, e.clientY);
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup',   onDragEnd);
}

function startDragTouch(e) {
  if (e.target.closest('a, button')) return;
  const t = e.touches[0];
  initDrag(e.currentTarget, t.clientX, t.clientY);
  window.addEventListener('touchmove', onDragMoveTouch, { passive: false });
  window.addEventListener('touchend',  onDragEndTouch);
}

function initDrag(card, cx, cy) {
  dragSrc = card;
  const rect = card.getBoundingClientRect();
  offsetX = cx - rect.left;
  offsetY = cy - rect.top;

  // create ghost
  ghost = card.cloneNode(true);
  ghost.classList.add('drag-ghost');
  ghost.style.width  = rect.width  + 'px';
  ghost.style.height = rect.height + 'px';
  ghost.style.top    = rect.top    + 'px';
  ghost.style.left   = rect.left   + 'px';
  document.body.appendChild(ghost);

  card.classList.add('dragging');
  document.body.style.userSelect = 'none';
}

function moveGhost(cx, cy) {
  if (!ghost) return;
  ghost.style.left = (cx - offsetX) + 'px';
  ghost.style.top  = (cy - offsetY) + 'px';
}

function onDragMove(e)      { moveGhost(e.clientX, e.clientY); updateDropTarget(e.clientX, e.clientY); }
function onDragMoveTouch(e) { e.preventDefault(); const t = e.touches[0]; moveGhost(t.clientX, t.clientY); updateDropTarget(t.clientX, t.clientY); }

function updateDropTarget(cx, cy) {
  cards.forEach(c => c.classList.remove('drag-over'));
  const el = document.elementFromPoint(cx, cy);
  if (!el) return;
  const target = el.closest('.card');
  if (target && target !== dragSrc) target.classList.add('drag-over');
}

function onDragEnd(e)      { endDrag(e.clientX, e.clientY); window.removeEventListener('mousemove', onDragMove); window.removeEventListener('mouseup', onDragEnd); }
function onDragEndTouch(e) { const t = e.changedTouches[0]; endDrag(t.clientX, t.clientY); window.removeEventListener('touchmove', onDragMoveTouch); window.removeEventListener('touchend', onDragEndTouch); }

function endDrag(cx, cy) {
  if (!dragSrc) return;
  dragSrc.classList.remove('dragging');
  cards.forEach(c => c.classList.remove('drag-over'));

  const el = document.elementFromPoint(cx, cy);
  if (el) {
    const target = el.closest('.card');
    if (target && target !== dragSrc && grid.contains(target)) {
      swapCards(dragSrc, target);
    }
  }

  if (ghost) { ghost.remove(); ghost = null; }
  dragSrc = null;
  document.body.style.userSelect = '';
}

function swapCards(a, b) {
  const allCards = [...grid.querySelectorAll('.card')];
  const ia = allCards.indexOf(a);
  const ib = allCards.indexOf(b);

  // get grid area references
  const aNext = a.nextSibling;
  const bNext = b.nextSibling;

  if (aNext === b) {
    grid.insertBefore(b, a);
  } else if (bNext === a) {
    grid.insertBefore(a, b);
  } else {
    grid.insertBefore(a, bNext);
    grid.insertBefore(b, aNext);
  }

  // brief bounce after swap
  [a, b].forEach(card => {
    card.style.transition = 'transform 0.3s cubic-bezier(.22,1,.36,1)';
    card.style.transform = 'scale(0.93)';
    setTimeout(() => { card.style.transform = ''; }, 200);
  });
}

/* ── 7. MOUSE GLOW ON CARDS ─────────────────── */
cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  * 100).toFixed(1);
    const y = ((e.clientY - r.top)  / r.height * 100).toFixed(1);
    card.style.backgroundImage = card.classList.contains('theme-card')
      ? ''
      : `radial-gradient(320px circle at ${x}% ${y}%, rgba(${isDark ? '255,255,255' : '0,0,0'},0.03), transparent 70%)`;
  });
  card.addEventListener('mouseleave', () => {
    if (!card.classList.contains('theme-card')) card.style.backgroundImage = '';
  });
});

/* ── 8. TECH ICON TOOLTIP ───────────────────── */
const techTooltip = document.getElementById('techTooltip');

document.querySelectorAll('.ti').forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    techTooltip.textContent = icon.dataset.title || '';
    techTooltip.style.opacity = '1';
  });
  icon.addEventListener('mouseleave', () => {
    techTooltip.style.opacity = '0';
  });
});

/* ── 9. PROJECT DESC TOOLTIP ────────────────── */
const descTooltip = document.getElementById('descTooltip');

document.querySelectorAll('.proj-desc-text, .ptag-more').forEach(el => {
  const text = el.dataset.full || el.dataset.techs;
  if (!text) return;

  el.addEventListener('mouseenter', e => {
    descTooltip.textContent = text;
    descTooltip.style.opacity = '1';
    positionTooltip(e);
  });
  el.addEventListener('mousemove', positionTooltip);
  el.addEventListener('mouseleave', () => {
    descTooltip.style.opacity = '0';
  });
});

function positionTooltip(e) {
  const x = e.clientX + 14;
  const y = e.clientY - 50;
  const vw = window.innerWidth;
  const tw = 280;
  descTooltip.style.left = (x + tw > vw ? vw - tw - 10 : x) + 'px';
  descTooltip.style.top  = Math.max(8, y) + 'px';
}

/* ── 10. GRADIENT CARD THEME CYCLE ──────────── */
const gradientCard = document.querySelector('.theme-card');
const gradientSets = [
  ['linear-gradient(45deg,#ef4444,#ec4899,#f87171,#ec4899,#ef4444)',
   'linear-gradient(45deg,#8b5cf6,#3b82f6,#a855f7,#3b82f6,#8b5cf6)'],
  ['linear-gradient(45deg,#06b6d4,#3b82f6,#0ea5e9,#3b82f6,#06b6d4)',
   'linear-gradient(45deg,#10b981,#06b6d4,#22c55e,#06b6d4,#10b981)'],
  ['linear-gradient(45deg,#f59e0b,#f97316,#fbbf24,#f97316,#f59e0b)',
   'linear-gradient(45deg,#ef4444,#f59e0b,#ef4444,#f59e0b,#ef4444)'],
  ['linear-gradient(45deg,#6366f1,#8b5cf6,#a855f7,#8b5cf6,#6366f1)',
   'linear-gradient(45deg,#ec4899,#6366f1,#8b5cf6,#6366f1,#ec4899)'],
];
let gIdx = 0;

if (gradientCard) {
  gradientCard.addEventListener('click', (e) => {
    if (e.target.closest('button')) return; // don't cycle when clicking theme btn
    gIdx = (gIdx + 1) % gradientSets.length;
    gradRed.style.background    = gradientSets[gIdx][0];
    gradPurple.style.background = gradientSets[gIdx][1];
  });
}

/* ── 11. TYPING EFFECT — hero name ──────────── */
const strong = document.querySelector('.profile-text strong');
if (strong) {
  const name = strong.textContent;
  strong.textContent = '';
  strong.style.borderRight = '2px solid currentColor';
  let i = 0;
  const type = () => {
    if (i < name.length) {
      strong.textContent += name[i++];
      setTimeout(type, 65);
    } else {
      // blink cursor for 2s then remove
      setTimeout(() => { strong.style.borderRight = 'none'; }, 2000);
    }
  };
  setTimeout(type, 700);
}

/* ── 12. SCROLL PROGRESS BAR ────────────────── */
const bar = document.createElement('div');
bar.style.cssText = `
  position:fixed; top:0; left:0; height:2px; z-index:9999;
  background:linear-gradient(90deg,#6366f1,#ec4899,#06b6d4);
  background-size: 200% 100%;
  width:0%; transition:width 0.12s linear;
  animation: barShift 3s linear infinite;
`;
document.body.appendChild(bar);

const styleEl = document.createElement('style');
styleEl.textContent = `@keyframes barShift { 0%{background-position:0%} 100%{background-position:200%} }`;
document.head.appendChild(styleEl);

window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  bar.style.width = Math.min(pct, 100) + '%';
});

/* ── 13. SMOOTH TILT ON CARDS ───────────────── */
cards.forEach(card => {
  if (card.classList.contains('theme-card')) return;

  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const dx = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2);
    const dy = (e.clientY - r.top   - r.height / 2) / (r.height / 2);
    card.style.transform = `translateY(-3px) scale(1.02) rotateX(${dy*-3}deg) rotateY(${dx*3}deg)`;
    card.style.transition = 'transform 0.06s linear, box-shadow 0.3s, border-color 0.3s';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.3s, border-color 0.3s';
  });
});

console.log('%c Ananya K N Portfolio ', 'background:#6366f1;color:white;padding:4px 8px;border-radius:4px;font-weight:bold;');
