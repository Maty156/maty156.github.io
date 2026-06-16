/* ================================================
   MATYAS ABRAHAM — Portfolio v2 Script
   ================================================ */

/* ── Custom Cursor ── */
const cursorDot     = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
  let mx = -100, my = -100, ox = -100, oy = -100;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top  = my + 'px';
  });

  (function followOutline() {
    ox += (mx - ox) * 0.14;
    oy += (my - oy) * 0.14;
    cursorOutline.style.left = ox + 'px';
    cursorOutline.style.top  = oy + 'px';
    requestAnimationFrame(followOutline);
  })();

  document.querySelectorAll('a, button, .bcard, .acard, .skill-pills span').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.style.transform = 'translate(-50%,-50%) scale(1.8)';
      cursorOutline.style.borderColor = 'rgba(255,255,255,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursorOutline.style.transform = 'translate(-50%,-50%) scale(1)';
      cursorOutline.style.borderColor = 'rgba(255,255,255,0.5)';
    });
  });
}

/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Mobile nav toggle ── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const icon = navToggle.querySelector('i');
  icon.className = navLinks.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    if (navToggle) navToggle.querySelector('i').className = 'fas fa-bars';
  });
});

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a[href^="#"]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => observer.observe(s));

/* ── Scroll reveal ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = entry.target.parentElement.querySelectorAll('.stagger');
      siblings.forEach((el, idx) => {
        if (el === entry.target) {
          setTimeout(() => el.classList.add('visible'), idx * 90);
        }
      });
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .stagger').forEach(el => revealObs.observe(el));

/* ── System Dashboard Init ── */
// (Dashboard is static/CSS animated for performance)

/* ── Contact form ── */
const form   = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = 'Sending… <i class="fas fa-spinner fa-spin"></i>';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      status.style.color = 'var(--green)';
      status.textContent = '✓ Message sent! I\'ll get back to you soon.';
      form.reset();
    } else {
      throw new Error();
    }
  } catch {
    status.style.color = '#f87171';
    status.textContent = '✗ Something went wrong. Try emailing me directly.';
  } finally {
    btn.disabled = false;
    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
  }
});

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Easter egg: Konami code ── */
const KONAMI = [38,38,40,40,37,39,37,39,66,65];
let konamiIdx = 0;
document.addEventListener('keydown', e => {
  if (e.keyCode === KONAMI[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === KONAMI.length) {
      document.getElementById('easter-egg').classList.add('active');
      konamiIdx = 0;
    }
  } else {
    konamiIdx = 0;
  }
});
document.getElementById('easter-egg')?.addEventListener('click', function(e) {
  if (e.target === this) this.classList.remove('active');
});
