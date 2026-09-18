/* ==========================================================================
   IRISSH TREATS — script.js
   Shoranur, Kerala — Interactive Logic
   ========================================================================== */

document.documentElement.classList.add('js-ready');

/* ---------------------------------------------------------
   0. PAGE LOAD REVEAL
--------------------------------------------------------- */
(function initPageReveal() {
  const root = document.documentElement;
  const reveal = document.getElementById('pageReveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let done = false;

  function finishReveal() {
    if (done) return;
    done = true;
    root.classList.add('is-loaded');
    if (!reveal) return;
    if (prefersReducedMotion) {
      reveal.classList.add('is-done');
      return;
    }
    requestAnimationFrame(() => {
      reveal.classList.add('is-done');
    });
  }

  if (document.readyState === 'complete') {
    finishReveal();
  } else {
    window.addEventListener('load', finishReveal, { once: true });
    setTimeout(finishReveal, 2200);
  }
})();

/* ---------------------------------------------------------
   WhatsApp helpers
--------------------------------------------------------- */
const WHATSAPP_NUMBER = '917034535501';
const ORDER_MESSAGE = "Hi! I'd like to place an order at Irissh Treats.";

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ---------------------------------------------------------
   1. NAVBAR — Glass on scroll
--------------------------------------------------------- */
const navbar = document.getElementById('navbar');

function onScrollNav() {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}
onScrollNav();
window.addEventListener('scroll', onScrollNav, { passive: true });

/* ---------------------------------------------------------
   2. MOBILE MENU
--------------------------------------------------------- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      hamburger.focus();
    }
  });
}

/* ---------------------------------------------------------
   3. SCROLL PROGRESS BAR
--------------------------------------------------------- */
const scrollProgress = document.getElementById('scrollProgress');
function updateProgress() {
  if (!scrollProgress) return;
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });

/* ---------------------------------------------------------
   4. HERO — Cinematic product stage
--------------------------------------------------------- */
const heroBgs = [
  'images/irissh-hero-bg.webp',
  'images/hero_bakery_bg.webp',
  'images/hero_bg_restaurant.webp',
  'images/hero-bg-new.webp',
  'images/hero-bg.webp',
  'images/irissh-hero-bg.webp',
  'images/hero_bakery_bg.webp'
];

const heroProducts = [
  {
    name: 'Kunafa Pistachio',
    eyebrow: 'Cheese Cakes',
    tagline: 'Pure Delights, Baked with Love.',
    blurb: 'Cheese cake with crispy kunafa & pistachio — crafted fresh for every celebration.',
    img: 'images/hero-menu-kunafa-pistachio.jpg',
    bg: 'images/irissh-hero-bg.webp',
    orderMessage: "Hi! I'd like to order Kunafa Pistachio cake from Irissh Treats."
  },
  {
    name: 'Belgium Chocolate',
    eyebrow: 'Chocolate Cakes',
    tagline: 'Rich. Smooth. Irresistible.',
    blurb: 'Deep Belgium chocolate layers finished for birthdays, parties & sweet moments.',
    img: 'images/hero-menu-belgium-chocolate.jpg',
    bg: 'images/hero-bg.webp',
    orderMessage: "Hi! I'd like to order Belgium Chocolate cake from Irissh Treats."
  },
  {
    name: 'Red Velvet',
    eyebrow: 'Cheese Cakes',
    tagline: 'Classic. Romantic. Unforgettable.',
    blurb: 'Velvety red cheese cake — a timeless favourite for celebrations.',
    img: 'images/hero-menu-red-velvet.jpg',
    bg: 'images/hero-bg-new.webp',
    orderMessage: "Hi! I'd like to order Red Velvet cake from Irissh Treats."
  },
  {
    name: 'Lotus Bite',
    eyebrow: 'Vanilla Cakes',
    tagline: 'Caramel. Crunch. Comfort.',
    blurb: 'Soft vanilla cake with lotus biscuit crunch — sweet, golden and comforting.',
    img: 'images/hero-menu-lotus-bite.jpg',
    bg: 'images/hero_bakery_bg.webp',
    orderMessage: "Hi! I'd like to order Lotus Bite cake from Irissh Treats."
  },
  {
    name: 'Pistachio Louah',
    eyebrow: 'Signature Desserts',
    tagline: 'Creamy. Nutty. Dreamy.',
    blurb: 'Pistachio Nutella Louah — rich cream cup with golden crunch and pistachio finish.',
    img: 'images/hero-menu-louah.jpg',
    bg: 'images/irissh-hero-bg.webp',
    orderMessage: "Hi! I'd like to order Pistachio Nutella Louah from Irissh Treats."
  },
  {
    name: 'Pistachio Salankatiya',
    eyebrow: 'Signature Desserts',
    tagline: 'Layered. Luxurious. Fresh.',
    blurb: 'Vibrant pistachio salankatiya cup — smooth cream, nutty crunch, pure indulgence.',
    img: 'images/hero-menu-salankatiya.jpg',
    bg: 'images/hero-bg.webp',
    orderMessage: "Hi! I'd like to order Pistachio Salankatiya from Irissh Treats."
  },
  {
    name: 'Zinger Burger',
    eyebrow: 'Continental',
    tagline: 'Crispy. Stacked. Satisfying.',
    blurb: 'Golden fried chicken burger with cheese, fresh veggies & house sauce — served hot.',
    img: 'images/hero-menu-chicken-burger.jpg',
    bg: 'images/hero_bakery_bg.webp',
    orderMessage: "Hi! I'd like to order Zinger Burger from Irissh Treats."
  },
  {
    name: 'Classic Mojito',
    eyebrow: 'Continental',
    tagline: 'Cool. Fresh. Zesty.',
    blurb: 'Icy mint-lime mojito — a bright, refreshing sip with every craving.',
    img: 'images/hero-menu-mojito.jpg',
    bg: 'images/hero_bg_restaurant.webp',
    orderMessage: "Hi! I'd like to order Classic Mojito from Irissh Treats."
  },
  {
    name: 'Royal Falooda',
    eyebrow: 'Continental',
    tagline: 'Layered. Chilled. Royal.',
    blurb: 'Tall falooda with ice cream, nuts, jelly & rose syrup — a cool classic treat.',
    img: 'images/hero-menu-falooda.jpg',
    bg: 'images/irissh-hero-bg.webp',
    orderMessage: "Hi! I'd like to order Royal Falooda from Irissh Treats."
  },
  {
    name: 'Loaded Milkshakes',
    eyebrow: 'Continental',
    tagline: 'Thick. Topped. Indulgent.',
    blurb: 'Freakshake-style loaded milkshakes piled high with cream, syrup & crunch.',
    img: 'images/hero-menu-milkshakes.jpg',
    bg: 'images/hero-bg-new.webp',
    orderMessage: "Hi! I'd like to order a Loaded Milkshake from Irissh Treats."
  }
];

let currentHeroIndex = 0;
let heroAutoplayTimer = null;
let heroSwapTimer = null;
let heroBgToggle = false;

const heroSection = document.getElementById('home');
const imgPlateCenter = document.getElementById('imgPlateCenter');
const imgPlateLeft = document.getElementById('imgPlateLeft');
const imgPlateRight = document.getElementById('imgPlateRight');
const labelCenter = document.getElementById('labelCenter');
const labelLeft = document.getElementById('labelLeft');
const labelRight = document.getElementById('labelRight');
const plateLeft = document.getElementById('plateLeft');
const plateRight = document.getElementById('plateRight');
const plateCenter = document.getElementById('plateCenter');
const currentSlideNum = document.getElementById('currentSlideNum');
const totalSlideNum = document.getElementById('totalSlideNum');
const heroPrevBtn = document.getElementById('heroPrevBtn');
const heroNextBtn = document.getElementById('heroNextBtn');
const heroEyebrow = document.getElementById('heroEyebrow');
const heroTitle = document.getElementById('heroTitle');
const heroSubtext = document.getElementById('heroSubtext');
const heroCtaBtn = document.getElementById('heroCtaBtn');
const heroBgA = document.getElementById('heroBgA');
const heroBgB = document.getElementById('heroBgB');

function pad2(n) {
  return String(n).padStart(2, '0');
}

function neighborIndex(offset) {
  const total = heroProducts.length;
  return ((currentHeroIndex + offset) % total + total) % total;
}

function crossfadeHeroBg(index, instant = false) {
  const product = heroProducts[((index % heroProducts.length) + heroProducts.length) % heroProducts.length];
  const url = (product && product.bg) || heroBgs[index % heroBgs.length];
  const incoming = heroBgToggle ? heroBgA : heroBgB;
  const outgoing = heroBgToggle ? heroBgB : heroBgA;
  if (!incoming || !outgoing) return;

  incoming.style.backgroundImage = `url('${url}')`;
  incoming.style.transform = '';

  if (instant) {
    incoming.classList.add('is-active');
    outgoing.classList.remove('is-active');
    heroBgToggle = !heroBgToggle;
    return;
  }

  requestAnimationFrame(() => {
    incoming.classList.add('is-active');
    outgoing.classList.remove('is-active');
    heroBgToggle = !heroBgToggle;
  });
}

function updateHeroDish(index, direction = 0) {
  const total = heroProducts.length;
  currentHeroIndex = ((index % total) + total) % total;

  const center = heroProducts[currentHeroIndex];
  const left = heroProducts[neighborIndex(-1)];
  const right = heroProducts[neighborIndex(1)];

  if (direction !== 0 && heroSection) {
    heroSection.classList.remove('slide-next', 'slide-prev', 'is-entering');
    heroSection.classList.add('is-swapping', direction > 0 ? 'slide-next' : 'slide-prev');
    if (heroTitle) heroTitle.classList.add('is-fading');
    if (heroSubtext) heroSubtext.classList.add('is-fading');

    clearTimeout(heroSwapTimer);
    heroSwapTimer = setTimeout(() => {
      applyHeroContent(center, left, right, total);
      crossfadeHeroBg(currentHeroIndex);
      heroSection.classList.remove('is-swapping');
      heroSection.classList.add('is-entering');
      if (heroTitle) heroTitle.classList.remove('is-fading');
      if (heroSubtext) heroSubtext.classList.remove('is-fading');
      requestAnimationFrame(() => {
        setTimeout(() => {
          heroSection.classList.remove('is-entering', 'slide-next', 'slide-prev');
          resetPlateTransforms();
        }, 650);
      });
    }, 280);
  } else {
    applyHeroContent(center, left, right, total);
  }
}

function resetPlateTransforms() {
  if (plateCenter) plateCenter.style.transform = '';
  if (plateLeft) plateLeft.style.transform = '';
  if (plateRight) plateRight.style.transform = '';
}

function applyHeroContent(center, left, right, total) {
  if (currentSlideNum) currentSlideNum.textContent = pad2(currentHeroIndex + 1);
  if (totalSlideNum) totalSlideNum.textContent = pad2(total);

  if (imgPlateCenter) {
    imgPlateCenter.src = center.img;
    imgPlateCenter.alt = center.name + ' at Irissh Treats in Shoranur';
  }
  if (imgPlateLeft) {
    imgPlateLeft.src = left.img;
    imgPlateLeft.alt = left.name + ' at Irissh Treats in Shoranur';
  }
  if (imgPlateRight) {
    imgPlateRight.src = right.img;
    imgPlateRight.alt = right.name + ' at Irissh Treats in Shoranur';
  }

  if (labelCenter) labelCenter.textContent = center.name;
  if (labelLeft) labelLeft.textContent = left.name;
  if (labelRight) labelRight.textContent = right.name;

  if (heroEyebrow) heroEyebrow.textContent = center.eyebrow;
  if (heroTitle) heroTitle.textContent = center.tagline;
  if (heroSubtext) heroSubtext.textContent = center.blurb;
  if (heroCtaBtn) heroCtaBtn.href = whatsappLink(center.orderMessage || ORDER_MESSAGE);

  const accentRing = document.querySelector('.yellow-accent-ring circle');
  if (accentRing) {
    accentRing.style.transform = `rotate(${-50 + (currentHeroIndex * 28)}deg)`;
  }
}

function nextHeroDish() { updateHeroDish(currentHeroIndex + 1, 1); }
function prevHeroDish() { updateHeroDish(currentHeroIndex - 1, -1); }

function resetHeroAutoplay() {
  clearInterval(heroAutoplayTimer);
  heroAutoplayTimer = setInterval(nextHeroDish, 6000);
}

if (heroPrevBtn) heroPrevBtn.addEventListener('click', () => { prevHeroDish(); resetHeroAutoplay(); });
if (heroNextBtn) heroNextBtn.addEventListener('click', () => { nextHeroDish(); resetHeroAutoplay(); });
if (plateLeft) plateLeft.addEventListener('click', () => { prevHeroDish(); resetHeroAutoplay(); });
if (plateRight) plateRight.addEventListener('click', () => { nextHeroDish(); resetHeroAutoplay(); });

document.addEventListener('keydown', (e) => {
  if (window.scrollY < 500) {
    if (e.key === 'ArrowLeft') { prevHeroDish(); resetHeroAutoplay(); }
    if (e.key === 'ArrowRight') { nextHeroDish(); resetHeroAutoplay(); }
  }
});

let touchStartX = 0;
if (heroSection) {
  heroSection.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  heroSection.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) nextHeroDish(); else prevHeroDish();
      resetHeroAutoplay();
    }
  }, { passive: true });
}

/* Floating particles */
const particlesCanvas = document.getElementById('heroParticles');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (particlesCanvas && !prefersReducedMotion) {
  const ctx = particlesCanvas.getContext('2d');
  let particles = [];
  let particleRaf = 0;

  function resizeParticles() {
    const rect = heroSection ? heroSection.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
    particlesCanvas.width = rect.width;
    particlesCanvas.height = rect.height;
    const count = Math.min(48, Math.floor(rect.width / 28));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      r: Math.random() * 1.8 + 0.4,
      speed: Math.random() * 0.25 + 0.08,
      drift: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.45 + 0.15
    }));
  }

  function drawParticles() {
    ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    for (const p of particles) {
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -4) {
        p.y = particlesCanvas.height + 4;
        p.x = Math.random() * particlesCanvas.width;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(234, 219, 250, ${p.alpha})`;
      ctx.fill();
    }
    particleRaf = requestAnimationFrame(drawParticles);
  }

  resizeParticles();
  drawParticles();
  window.addEventListener('resize', resizeParticles, { passive: true });
}

/* Mouse parallax — keep plates centered & fully visible */
const heroStageEl = document.getElementById('heroStage');
const isMobileHero = () => window.matchMedia('(max-width: 860px)').matches;

if (heroSection && heroStageEl && !prefersReducedMotion) {
  let rafId = 0;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  function renderHeroParallax() {
    if (isMobileHero()) {
      heroStageEl.style.transform = '';
      if (plateCenter) plateCenter.style.transform = '';
      if (plateLeft) plateLeft.style.transform = '';
      if (plateRight) plateRight.style.transform = '';
      rafId = 0;
      return;
    }

    currentX += (targetX - currentX) * 0.07;
    currentY += (targetY - currentY) * 0.07;

    const rotY = currentX * 3;
    const rotX = -currentY * 2;
    heroStageEl.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;

    // Must keep translateX(-50%) — plate-center is left:50%
    if (plateCenter) {
      plateCenter.style.transform = `translateX(calc(-50% + ${currentX * -8}px)) translateY(${currentY * -5}px) translateZ(40px)`;
    }
    if (plateLeft) {
      plateLeft.style.transform = `perspective(900px) rotateY(${12 + currentX * 2}deg) translateY(18px) scale(0.9) translate3d(${currentX * 4}px, ${currentY * 3}px, 0)`;
    }
    if (plateRight) {
      plateRight.style.transform = `perspective(900px) rotateY(${-12 + currentX * 2}deg) translateY(18px) scale(0.9) translate3d(${currentX * 4}px, ${currentY * 3}px, 0)`;
    }

    const bg = document.getElementById('heroImg');
    if (bg) {
      bg.style.transform = `scale(1.08) translate3d(${currentX * -8}px, ${currentY * -5}px, 0)`;
    }

    const activeBg = document.querySelector('.hero-bg-slide.is-active');
    if (activeBg) {
      activeBg.style.transform = `scale(1.04) translate3d(${currentX * -10}px, ${currentY * -6}px, 0)`;
    }

    const stillMoving = Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001;
    if (stillMoving) {
      rafId = requestAnimationFrame(renderHeroParallax);
    } else {
      rafId = 0;
    }
  }

  function requestParallaxFrame() {
    if (!rafId) rafId = requestAnimationFrame(renderHeroParallax);
  }

  heroSection.addEventListener('mousemove', (e) => {
    if (isMobileHero()) return;
    const rect = heroSection.getBoundingClientRect();
    targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    requestParallaxFrame();
  }, { passive: true });

  heroSection.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
    requestParallaxFrame();
  });

  window.addEventListener('resize', () => {
    if (isMobileHero()) {
      heroStageEl.style.transform = '';
      if (plateCenter) plateCenter.style.transform = '';
      if (plateLeft) plateLeft.style.transform = '';
      if (plateRight) plateRight.style.transform = '';
    }
  }, { passive: true });
}

if (heroSection) {
  updateHeroDish(0, 0);
  resetHeroAutoplay();

  /* Preload hero assets */
  [...new Set([
    ...heroBgs,
    ...heroProducts.map((p) => p.img),
    ...heroProducts.map((p) => p.bg).filter(Boolean)
  ])].forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

/* ---------------------------------------------------------
   5. INTERSECTION OBSERVER — Scroll reveals
--------------------------------------------------------- */
const revealTargets = document.querySelectorAll('[data-animate]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

/* ---------------------------------------------------------
   6. MENU GRID — Products from tools/products.json
--------------------------------------------------------- */
const products = [
  {
    "name": "Blueberry Cheese Cake",
    "category": "cakes",
    "desc": "Creamy cheese cake finished with a glossy blueberry topping — soft, fruity and celebration-ready.",
    "img": "images/menu/cakes/cheese-blueberry.jpg",
    "orderMessage": "Hi! I'd like to order Blueberry Cheese Cake from Irissh Treats.",
    "price": "₹140"
  },
  {
    "name": "Crunchy Kinder Cheese Cake",
    "category": "cakes",
    "desc": "Rich cheese cake loaded with Kinder crunch and chocolate — a favourite for birthdays.",
    "img": "images/menu/cakes/cheese-crunchy-kinder.jpg",
    "orderMessage": "Hi! I'd like to order Crunchy Kinder Cheese Cake from Irissh Treats.",
    "price": "₹140"
  },
  {
    "name": "Kunafa Pistachio Cheese Cake",
    "category": "cakes",
    "desc": "Cheese cake layered with crispy kunafa and pistachio — our signature celebration cake.",
    "img": "images/menu/cakes/cheese-kunafa-pistachio.jpg",
    "orderMessage": "Hi! I'd like to order Kunafa Pistachio Cheese Cake from Irissh Treats.",
    "price": "₹140"
  },
  {
    "name": "Lotus Cheese Cake",
    "category": "cakes",
    "desc": "Silky cheese cake with Lotus biscuit cream and caramel notes in every bite.",
    "img": "images/menu/cakes/cheese-lotus-cheese.jpg",
    "orderMessage": "Hi! I'd like to order Lotus Cheese Cake from Irissh Treats.",
    "price": "₹140"
  },
  {
    "name": "Oreo Cheese Cake",
    "category": "cakes",
    "desc": "Cookies-and-cream cheese cake topped with Oreo crunch — classic and indulgent.",
    "img": "images/menu/cakes/cheese-oreo.jpg",
    "orderMessage": "Hi! I'd like to order Oreo Cheese Cake from Irissh Treats.",
    "price": "₹140"
  },
  {
    "name": "Red Velvet Cheese Cake",
    "category": "cakes",
    "desc": "Soft red velvet cheese cake with a smooth finish — timeless for any celebration.",
    "img": "images/menu/cakes/cheese-red-velvet.jpg",
    "orderMessage": "Hi! I'd like to order Red Velvet Cheese Cake from Irissh Treats.",
    "price": "₹900"
  },
  {
    "name": "Belgium Chocolate Cake",
    "category": "cakes",
    "desc": "Deep Belgium chocolate layers for true chocolate lovers — rich and smooth.",
    "img": "images/menu/cakes/chocolate-belgium-chocolate.jpg",
    "orderMessage": "Hi! I'd like to order Belgium Chocolate Cake from Irissh Treats.",
    "price": "₹1200"
  },
  {
    "name": "Black Forest Cake",
    "category": "cakes",
    "desc": "Chocolate sponge with cherry and cream — the evergreen classic.",
    "img": "images/menu/cakes/chocolate-black-forest.jpg",
    "orderMessage": "Hi! I'd like to order Black Forest Cake from Irissh Treats.",
    "price": "₹700"
  },
  {
    "name": "Choco Truffle Cake",
    "category": "cakes",
    "desc": "Dense chocolate truffle cake with a smooth ganache finish.",
    "img": "images/menu/cakes/chocolate-choco-truffle.jpg",
    "orderMessage": "Hi! I'd like to order Choco Truffle Cake from Irissh Treats.",
    "price": "₹1000"
  },
  {
    "name": "Milky Nut Cake",
    "category": "cakes",
    "desc": "Milk chocolate cake topped with roasted nuts and creamy layers.",
    "img": "images/menu/cakes/chocolate-milky-nut.jpg",
    "orderMessage": "Hi! I'd like to order Milky Nut Cake from Irissh Treats.",
    "price": "₹1200"
  },
  {
    "name": "Snickers Cake",
    "category": "cakes",
    "desc": "Chocolate, peanut and caramel Snickers-inspired cake — bold and satisfying.",
    "img": "images/menu/cakes/chocolate-snickers.jpg",
    "orderMessage": "Hi! I'd like to order Snickers Cake from Irissh Treats.",
    "price": "₹1200"
  },
  {
    "name": "Pistachio Nutella Cake",
    "category": "cakes",
    "desc": "Pistachio meets Nutella in a rich dual-flavour celebration cake.",
    "img": "images/menu/cakes/mixed-flavour-pistachio-nutella.jpg",
    "orderMessage": "Hi! I'd like to order Pistachio Nutella Cake from Irissh Treats.",
    "price": "₹1200"
  },
  {
    "name": "Red Bee Cake",
    "category": "cakes",
    "desc": "Bold mixed-flavour cake with a bright signature finish.",
    "img": "images/menu/cakes/mixed-flavour-red-bee.jpg",
    "orderMessage": "Hi! I'd like to order Red Bee Cake from Irissh Treats.",
    "price": "₹1000"
  },
  {
    "name": "Vancho Cake",
    "category": "cakes",
    "desc": "Half vanilla, half chocolate — the perfect shareable classic.",
    "img": "images/menu/cakes/mixed-flavour-vancho.jpg",
    "orderMessage": "Hi! I'd like to order Vancho Cake from Irissh Treats.",
    "price": "₹1000"
  },
  {
    "name": "Blueberry Vanilla Cake",
    "category": "cakes",
    "desc": "Soft vanilla cake finished with blueberry topping — light and fruity.",
    "img": "images/menu/cakes/vanilla-blue-berry.jpg",
    "orderMessage": "Hi! I'd like to order Blueberry Vanilla Cake from Irissh Treats.",
    "price": "₹900"
  },
  {
    "name": "Butterscotch Cake",
    "category": "cakes",
    "desc": "Golden butterscotch cake with caramel crunch — warm and comforting.",
    "img": "images/menu/cakes/vanilla-butterscotch.jpg",
    "orderMessage": "Hi! I'd like to order Butterscotch Cake from Irissh Treats.",
    "price": "₹1000"
  },
  {
    "name": "Classic Vanilla Cake",
    "category": "cakes",
    "desc": "Soft classic vanilla sponge — clean, light and always in demand.",
    "img": "images/menu/cakes/vanilla-classic-vanilla-1.jpg",
    "orderMessage": "Hi! I'd like to order Classic Vanilla Cake from Irissh Treats.",
    "price": "₹1000"
  },
  {
    "name": "Fresh Fruit Cake",
    "category": "cakes",
    "desc": "Vanilla cake topped with a medley of fresh seasonal fruits.",
    "img": "images/menu/cakes/vanilla-fresh-fruit.jpg",
    "orderMessage": "Hi! I'd like to order Fresh Fruit Cake from Irissh Treats.",
    "price": "₹1500"
  },
  {
    "name": "Honey Almond Cake",
    "category": "cakes",
    "desc": "Honey-kissed vanilla cake finished with toasted almonds.",
    "img": "images/menu/cakes/vanilla-honey-almond.jpg",
    "orderMessage": "Hi! I'd like to order Honey Almond Cake from Irissh Treats.",
    "price": "₹1000"
  },
  {
    "name": "Lotus Bite Cake",
    "category": "cakes",
    "desc": "Vanilla cake with Lotus biscuit crunch and caramel sweetness.",
    "img": "images/menu/cakes/vanilla-lotus-bite.jpg",
    "orderMessage": "Hi! I'd like to order Lotus Bite Cake from Irissh Treats.",
    "price": "₹1200"
  },
  {
    "name": "Mango Classic Cake",
    "category": "cakes",
    "desc": "Tropical mango vanilla cake — bright, fruity and fresh.",
    "img": "images/menu/cakes/vanilla-mango-classic.jpg",
    "orderMessage": "Hi! I'd like to order Mango Classic Cake from Irissh Treats.",
    "price": "₹900"
  },
  {
    "name": "Strawberry Cake",
    "category": "cakes",
    "desc": "Soft vanilla cake with strawberry cream finish.",
    "img": "images/menu/cakes/vanilla-strawberry.jpg",
    "orderMessage": "Hi! I'd like to order Strawberry Cake from Irissh Treats.",
    "price": "₹900"
  },
  {
    "name": "White Forest Cake",
    "category": "cakes",
    "desc": "White chocolate and cherry white forest — elegant and light.",
    "img": "images/menu/cakes/vanilla-white-forest.jpg",
    "orderMessage": "Hi! I'd like to order White Forest Cake from Irissh Treats.",
    "price": "₹700"
  },
  {
    "name": "Chocolate Hebba Cake",
    "category": "desserts",
    "desc": "Soft chocolate Hebba cake cup — rich, moist and perfect for a quick treat.",
    "img": "images/menu/desserts/hebba-cake-chocolate-hebba-cake.jpg",
    "orderMessage": "Hi! I'd like to order Chocolate Hebba Cake from Irissh Treats.",
    "price": "₹360"
  },
  {
    "name": "Pista Hebba Cake",
    "category": "desserts",
    "desc": "Pistachio Hebba cake cup with a nutty cream finish.",
    "img": "images/menu/desserts/hebba-cake-pista-hebba-cake.jpg",
    "orderMessage": "Hi! I'd like to order Pista Hebba Cake from Irissh Treats.",
    "price": "₹360"
  },
  {
    "name": "Belgium Chocolate Koshari",
    "category": "desserts",
    "desc": "Belgium chocolate Koshari dessert cup with layered richness.",
    "img": "images/menu/desserts/koshari-belgium-chocolate-koshari.jpg",
    "orderMessage": "Hi! I'd like to order Belgium Chocolate Koshari from Irissh Treats.",
    "price": "₹360"
  },
  {
    "name": "Kinder Koshari",
    "category": "desserts",
    "desc": "Kinder-loaded Koshari cup — creamy, crunchy and chocolatey.",
    "img": "images/menu/desserts/koshari-kinder-koshari.jpg",
    "orderMessage": "Hi! I'd like to order Kinder Koshari from Irissh Treats.",
    "price": "₹360"
  },
  {
    "name": "Chocolate Kinder Louah",
    "category": "desserts",
    "desc": "Chocolate Louah cup topped with Kinder crunch.",
    "img": "images/menu/desserts/louah-chocolate-kinder-louah.jpg",
    "orderMessage": "Hi! I'd like to order Chocolate Kinder Louah from Irissh Treats.",
    "price": "₹340"
  },
  {
    "name": "Kinder Nutella Louah",
    "category": "desserts",
    "desc": "Louah cup blended with Kinder and Nutella cream.",
    "img": "images/menu/desserts/louah-kinder-nutella-louah.jpg",
    "orderMessage": "Hi! I'd like to order Kinder Nutella Louah from Irissh Treats.",
    "price": "₹350"
  },
  {
    "name": "Nutella Pistachio Kinder Louah",
    "category": "desserts",
    "desc": "Triple-hit Louah — Nutella, pistachio and Kinder in every spoon.",
    "img": "images/menu/desserts/louah-nutella-pistachio-kinder-louah.jpg",
    "orderMessage": "Hi! I'd like to order Nutella Pistachio Kinder Louah from Irissh Treats.",
    "price": "₹340"
  },
  {
    "name": "Pistachio Lotus Louah",
    "category": "desserts",
    "desc": "Pistachio Louah with Lotus biscuit crunch.",
    "img": "images/menu/desserts/louah-pistachio-lotus-louah.jpg",
    "orderMessage": "Hi! I'd like to order Pistachio Lotus Louah from Irissh Treats.",
    "price": "₹350"
  },
  {
    "name": "Pistachio Nutella Louah",
    "category": "desserts",
    "desc": "Signature pistachio and Nutella Louah — creamy and indulgent.",
    "img": "images/menu/desserts/louah-pistachio-nutella-louah.jpg",
    "orderMessage": "Hi! I'd like to order Pistachio Nutella Louah from Irissh Treats.",
    "price": "₹350"
  },
  {
    "name": "Trio Louah",
    "category": "desserts",
    "desc": "Three-flavour Louah cup for those who want it all.",
    "img": "images/menu/desserts/louah-trio-louah.jpg",
    "orderMessage": "Hi! I'd like to order Trio Louah from Irissh Treats.",
    "price": "₹350"
  },
  {
    "name": "Lotus Salankatiya",
    "category": "desserts",
    "desc": "Lotus biscuit Salankatiya with caramel cream layers.",
    "img": "images/menu/desserts/salankatiya-lotus-salankatiya.jpg",
    "orderMessage": "Hi! I'd like to order Lotus Salankatiya from Irissh Treats.",
    "price": "₹350"
  },
  {
    "name": "Nutella Lotus Salankatiya",
    "category": "desserts",
    "desc": "Nutella and Lotus Salankatiya — sweet caramel-chocolate bliss.",
    "img": "images/menu/desserts/salankatiya-nutella-lotus-salankatiya.jpg",
    "orderMessage": "Hi! I'd like to order Nutella Lotus Salankatiya from Irissh Treats.",
    "price": "₹350"
  },
  {
    "name": "Nutella Salankatiya",
    "category": "desserts",
    "desc": "Classic Nutella Salankatiya cup with rich chocolate cream.",
    "img": "images/menu/desserts/salankatiya-nutella-salankatiya.jpg",
    "orderMessage": "Hi! I'd like to order Nutella Salankatiya from Irissh Treats.",
    "price": "₹350"
  },
  {
    "name": "Pistachio Lotus Salankatiya",
    "category": "desserts",
    "desc": "Pistachio cream meets Lotus crunch in a layered cup.",
    "img": "images/menu/desserts/salankatiya-pistachio-lotus-salankatiya.jpg",
    "orderMessage": "Hi! I'd like to order Pistachio Lotus Salankatiya from Irissh Treats.",
    "price": "₹350"
  },
  {
    "name": "Pistachio Nutella Salankatiya",
    "category": "desserts",
    "desc": "Pistachio and Nutella Salankatiya — a dual-flavour favourite.",
    "img": "images/menu/desserts/salankatiya-pistachio-nutella-salankatiya.jpg",
    "orderMessage": "Hi! I'd like to order Pistachio Nutella Salankatiya from Irissh Treats.",
    "price": "₹340"
  },
  {
    "name": "Pistachio Salankatiya",
    "category": "desserts",
    "desc": "Vibrant pistachio Salankatiya with crushed nut finish.",
    "img": "images/menu/desserts/salankatiya-pistachio-salankatiya.jpg",
    "orderMessage": "Hi! I'd like to order Pistachio Salankatiya from Irissh Treats.",
    "price": "₹350"
  },
  {
    "name": "Trio Salankatiya",
    "category": "desserts",
    "desc": "Trio-flavour Salankatiya cup — layered, rich and shareable.",
    "img": "images/menu/desserts/salankatiya-trio-salankatiya.jpg",
    "orderMessage": "Hi! I'd like to order Trio Salankatiya from Irissh Treats.",
    "price": "₹350"
  },
  {
    "name": "Dynamite Wings",
    "category": "starters",
    "desc": "Spicy glazed hot wings served with dipping sauce — bold heat in every bite.",
    "price": "₹220",
    "img": "images/menu/continental/glazed-chicken-wings.jpg",
    "orderMessage": "Hi! I'd like to order Dynamite Wings from Irissh Treats."
  },
  {
    "name": "Fried BBQ Wings",
    "category": "starters",
    "desc": "Crispy fried BBQ wings with a sticky glaze and side dip.",
    "price": "₹220",
    "img": "images/menu/continental/fried-bbq-wings.jpg",
    "orderMessage": "Hi! I'd like to order Fried BBQ Wings from Irissh Treats."
  },
  {
    "name": "Normal Fries",
    "category": "starters",
    "desc": "Classic golden crispy fries — perfect as a side or snack.",
    "price": "₹110",
    "img": "images/menu/continental/normal-fries.jpg",
    "orderMessage": "Hi! I'd like to order Normal Fries from Irissh Treats."
  },
  {
    "name": "Creamy Fries",
    "category": "starters",
    "desc": "Crispy fries tossed in a creamy house sauce.",
    "price": "₹140",
    "img": "images/menu/continental/creamy-fries.jpg",
    "orderMessage": "Hi! I'd like to order Creamy Fries from Irissh Treats."
  },
  {
    "name": "Chicken Loaded Fries",
    "category": "starters",
    "desc": "Loaded fries topped with chicken bites, sauces and fresh garnish.",
    "price": "₹230",
    "img": "images/menu/continental/loaded-chicken-fries.jpg",
    "orderMessage": "Hi! I'd like to order Chicken Loaded Fries from Irissh Treats."
  },
  {
    "name": "Zinger Loaded Fries",
    "category": "starters",
    "desc": "Loaded fries with crispy zinger chicken and signature sauces.",
    "price": "₹230",
    "img": "images/menu/continental/zinger-loaded-fries.jpg",
    "orderMessage": "Hi! I'd like to order Zinger Loaded Fries from Irissh Treats."
  },
  {
    "name": "Cheese Chicken Loaded Fries",
    "category": "starters",
    "desc": "Loaded fries with chicken, melted cheese sauce and toppings.",
    "price": "₹240",
    "img": "images/menu/continental/cheese-chicken-loaded-fries.jpg",
    "orderMessage": "Hi! I'd like to order Cheese Chicken Loaded Fries from Irissh Treats."
  },
  {
    "name": "Zinger Burger",
    "category": "burgers-wraps",
    "desc": "Crispy zinger-style chicken burger with fresh veggies and house sauce. Served with fries.",
    "price": "₹170",
    "img": "images/menu/continental/crispy-chicken-burger.jpg",
    "orderMessage": "Hi! I'd like to order Zinger Burger from Irissh Treats."
  },
  {
    "name": "Cheese Burger",
    "category": "burgers-wraps",
    "desc": "Juicy cheese burger stacked with melted cheese, lettuce and tomato. Served with fries.",
    "price": "₹220",
    "img": "images/menu/continental/cheese-burger.jpg",
    "orderMessage": "Hi! I'd like to order Cheese Burger from Irissh Treats."
  },
  {
    "name": "Dynamite Burger",
    "category": "burgers-wraps",
    "desc": "Spicy dynamite chicken burger with a fiery kick — served hot with fries.",
    "price": "₹190",
    "img": "images/menu/continental/dynamite-burger.jpg",
    "orderMessage": "Hi! I'd like to order Dynamite Burger from Irissh Treats."
  },
  {
    "name": "Zinger Wrap",
    "category": "burgers-wraps",
    "desc": "Crispy zinger wrap packed with chicken, veggies and sauces. Served with fries.",
    "price": "₹170",
    "img": "images/menu/continental/crispy-chicken-wrap.jpg",
    "orderMessage": "Hi! I'd like to order Zinger Wrap from Irissh Treats."
  },
  {
    "name": "Fried Chicken Shawarma",
    "category": "burgers-wraps",
    "desc": "Fried chicken shawarma wrap with fresh fillings and house sauces.",
    "price": "₹140",
    "img": "images/menu/continental/fried-chicken-shawarma.jpg",
    "orderMessage": "Hi! I'd like to order Fried Chicken Shawarma from Irissh Treats."
  },
  {
    "name": "Zinger Cheese Wrap",
    "category": "burgers-wraps",
    "desc": "Zinger wrap loaded with cheese, chicken and veggies. Served with fries.",
    "price": "₹180",
    "img": "images/menu/continental/zinger-cheese-wrap.jpg",
    "orderMessage": "Hi! I'd like to order Zinger Cheese Wrap from Irissh Treats."
  },
  {
    "name": "Vegetable Club",
    "category": "sandwiches",
    "desc": "Triple-layer vegetable club sandwich with fresh veggies and sauces. Served with fries.",
    "price": "₹160",
    "img": "images/menu/continental/vegetable-club.jpg",
    "orderMessage": "Hi! I'd like to order Vegetable Club from Irissh Treats."
  },
  {
    "name": "Chicken Club",
    "category": "sandwiches",
    "desc": "Classic chicken club sandwich with crispy chicken, lettuce and tomato. Fries on the side.",
    "price": "₹180",
    "img": "images/menu/continental/chicken-club-sandwich.jpg",
    "orderMessage": "Hi! I'd like to order Chicken Club from Irissh Treats."
  },
  {
    "name": "Mix Club",
    "category": "sandwiches",
    "desc": "Mixed club sandwich stacked with chicken and veggies — a hearty café favourite.",
    "price": "₹190",
    "img": "images/menu/continental/mix-club.jpg",
    "orderMessage": "Hi! I'd like to order Mix Club from Irissh Treats."
  },
  {
    "name": "Steam Momo",
    "category": "momos",
    "desc": "Soft steamed momos served with dipping sauce.",
    "price": "₹110",
    "img": "images/menu/continental/steam-momo.jpg",
    "orderMessage": "Hi! I'd like to order Steam Momo from Irissh Treats."
  },
  {
    "name": "Fried Momo",
    "category": "momos",
    "desc": "Crispy fried momos with dipping sauce on the side.",
    "price": "₹110",
    "img": "images/menu/continental/fried-momo.jpg",
    "orderMessage": "Hi! I'd like to order Fried Momo from Irissh Treats."
  },
  {
    "name": "Schezwan Momo",
    "category": "momos",
    "desc": "Momos tossed in spicy Schezwan sauce — bold and flavourful.",
    "price": "₹140",
    "img": "images/menu/continental/schezwan-momo.jpg",
    "orderMessage": "Hi! I'd like to order Schezwan Momo from Irissh Treats."
  },
  {
    "name": "Dynamite Momo",
    "category": "momos",
    "desc": "Dynamite-style spicy momos with a fiery house finish.",
    "price": "₹150",
    "img": "images/menu/continental/dynamite-momo.jpg",
    "orderMessage": "Hi! I'd like to order Dynamite Momo from Irissh Treats."
  },
  {
    "name": "Combo 499",
    "category": "combos",
    "desc": "2 energy drinks, club sandwich, 2 burgers and fries — great for sharing.",
    "price": "₹499",
    "img": "images/Combo_499.png",
    "orderMessage": "Hi! I'd like to order Combo 499 from Irissh Treats."
  },
  {
    "name": "Combo 799",
    "category": "combos",
    "desc": "Loaded feast combo with drinks, club sandwich, burgers and fries.",
    "price": "₹799",
    "img": "images/Combo_799.png",
    "orderMessage": "Hi! I'd like to order Combo 799 from Irissh Treats."
  },
  {
    "name": "Loaded Milkshakes",
    "category": "milkshakes",
    "desc": "Thick freakshake-style milkshakes — strawberry, chocolate Oreo and caramel banana.",
    "price": "₹169",
    "img": "images/menu/continental/loaded-milkshakes.jpg",
    "orderMessage": "Hi! I'd like to order Loaded Milkshakes from Irissh Treats."
  },
  {
    "name": "Ice Cream Sundaes",
    "category": "milkshakes",
    "desc": "Scoops piled with chocolate, Oreo, strawberry brownie, fudge and candy toppings.",
    "price": "₹179",
    "img": "images/menu/continental/ice-cream-sundaes.jpg",
    "orderMessage": "Hi! I'd like to order Ice Cream Sundaes from Irissh Treats."
  },
  {
    "name": "Classic Mojito",
    "category": "mojitos",
    "desc": "Icy mint-lime mojito with fresh mint, lime wedges and crushed ice.",
    "price": "₹129",
    "img": "images/menu/continental/classic-mojito.jpg",
    "orderMessage": "Hi! I'd like to order Classic Mojito from Irissh Treats."
  },
  {
    "name": "Royal Falooda",
    "category": "falooda",
    "desc": "Tall layered falooda with ice cream, nuts, jelly, sabja and rose syrup.",
    "price": "₹179",
    "img": "images/menu/continental/royal-falooda.jpg",
    "orderMessage": "Hi! I'd like to order Royal Falooda from Irissh Treats."
  }
];
const menuCategories = [
  {
    "id": "all",
    "label": "All"
  },
  {
    "id": "starters",
    "label": "Starters"
  },
  {
    "id": "burgers-wraps",
    "label": "Burgers & Wraps"
  },
  {
    "id": "sandwiches",
    "label": "Sandwiches"
  },
  {
    "id": "momos",
    "label": "Momos"
  },
  {
    "id": "combos",
    "label": "Combos"
  },
  {
    "id": "desserts",
    "label": "Desserts"
  },
  {
    "id": "milkshakes",
    "label": "Milkshakes"
  },
  {
    "id": "mojitos",
    "label": "Mojitos"
  },
  {
    "id": "falooda",
    "label": "Falooda"
  },
  {
    "id": "cakes",
    "label": "Cakes"
  }
];

const track = document.getElementById('carouselTrack');
const dotsWrap = document.getElementById('carouselDots');
const filtersWrap = document.getElementById('menuFilters');
const productName = document.getElementById('productName');
const productDesc = document.getElementById('productDesc');
const productPrice = document.getElementById('productPrice');
const orderNowBtn = document.getElementById('orderNowBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let activeIndex = 0;
let activeCategory = 'all';
let autoTimer = null;
let visibleProducts = products.slice();

function getVisibleProducts() {
  if (activeCategory === 'all') return products.slice();
  return products.filter((p) => p.category === activeCategory);
}

function buildFilters() {
  if (!filtersWrap) return;
  filtersWrap.innerHTML = '';
  menuCategories.forEach((cat) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'menu-filter-tab';
    btn.setAttribute('role', 'tab');
    btn.dataset.category = cat.id;
    btn.textContent = cat.label;
    btn.setAttribute('aria-selected', cat.id === activeCategory ? 'true' : 'false');
    if (cat.id === activeCategory) btn.classList.add('is-active');
    btn.addEventListener('click', () => setCategory(cat.id));
    filtersWrap.appendChild(btn);
  });
}

function setCategory(categoryId) {
  if (activeCategory === categoryId) return;
  activeCategory = categoryId;
  visibleProducts = getVisibleProducts();
  if (filtersWrap) {
    filtersWrap.querySelectorAll('.menu-filter-tab').forEach((tab) => {
      const isActive = tab.dataset.category === activeCategory;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }
  buildCarousel();
  setActive(0);
  resetAutoplay();
}

function buildCarousel() {
  if (!track || !dotsWrap) return;
  visibleProducts = getVisibleProducts();
  track.innerHTML = '';
  visibleProducts.forEach((p, i) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'carousel-item';
    item.dataset.index = String(i);
    item.setAttribute('aria-label', 'Show ' + p.name);
    item.innerHTML = '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy" width="450" height="450"><span class="carousel-label">' + p.name + '</span>';
    item.addEventListener('click', () => { setActive(i); resetAutoplay(); });
    track.appendChild(item);
  });

  dotsWrap.innerHTML = '';
  visibleProducts.forEach((p, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'dot';
    dot.setAttribute('aria-label', 'Show ' + p.name);
    dot.addEventListener('click', () => { setActive(i); resetAutoplay(); });
    dotsWrap.appendChild(dot);
  });
}

function relativeDiff(i, len) {
  let diff = i - activeIndex;
  if (diff > len / 2) diff -= len;
  if (diff < -len / 2) diff += len;
  return diff;
}

function renderCarouselPositions() {
  if (!track || !dotsWrap) return;
  const items = track.querySelectorAll('.carousel-item');
  const dots = dotsWrap.querySelectorAll('.dot');
  const len = visibleProducts.length;
  if (!len) return;

  items.forEach((item, i) => {
    item.classList.remove('active', 'side-1', 'side-2', 'before', 'after', 'is-hidden');
    const diff = relativeDiff(i, len);
    let abs = Math.abs(diff);
    if (len % 2 === 0 && abs === len / 2) abs = Infinity;

    if (diff === 0) {
      item.classList.add('active');
      item.style.order = 3;
    } else if (abs === 1) {
      item.classList.add('side-1', diff < 0 ? 'before' : 'after');
      item.style.order = diff < 0 ? 2 : 4;
    } else if (abs === 2) {
      item.classList.add('side-2', diff < 0 ? 'before' : 'after');
      item.style.order = diff < 0 ? 1 : 5;
    } else {
      item.classList.add('is-hidden');
      item.style.order = 6;
    }

    item.setAttribute('aria-hidden', diff === 0 ? 'false' : 'true');
    item.tabIndex = diff === 0 ? 0 : -1;
  });

  dots.forEach((d, i) => {
    const isActive = i === activeIndex;
    d.classList.toggle('active', isActive);
    d.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
}

function updateInfo() {
  const p = visibleProducts[activeIndex];
  if (!p) return;
  if (productName) {
    productName.textContent = p.name;
    productName.style.animation = 'none';
    void productName.offsetWidth;
    productName.style.animation = '';
  }
  if (productDesc) {
    productDesc.textContent = p.desc || '';
    productDesc.style.animation = 'none';
    void productDesc.offsetWidth;
    productDesc.style.animation = '';
  }
  if (productPrice) {
    productPrice.textContent = p.price || '';
    productPrice.style.animation = 'none';
    void productPrice.offsetWidth;
    productPrice.style.animation = '';
  }
  if (orderNowBtn) orderNowBtn.href = whatsappLink(p.orderMessage || ORDER_MESSAGE);
}

function setActive(index) {
  const len = visibleProducts.length;
  if (!len) return;
  activeIndex = ((index % len) + len) % len;
  renderCarouselPositions();
  updateInfo();
}

function nextSlide() { setActive(activeIndex + 1); }
function prevSlide() { setActive(activeIndex - 1); }

function resetAutoplay() {
  clearInterval(autoTimer);
  if (!prefersReducedMotion && !document.hidden && visibleProducts.length > 1) {
    autoTimer = setInterval(nextSlide, 5000);
  }
}

if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });

const menuCarousel = document.getElementById('carousel');
let carouselTouchStartX = 0;

if (menuCarousel) {
  menuCarousel.addEventListener('touchstart', (event) => {
    carouselTouchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  menuCarousel.addEventListener('touchend', (event) => {
    const distance = event.changedTouches[0].clientX - carouselTouchStartX;
    if (Math.abs(distance) < 45) return;
    if (distance < 0) nextSlide();
    else prevSlide();
    resetAutoplay();
  }, { passive: true });

  menuCarousel.addEventListener('mouseenter', () => clearInterval(autoTimer));
  menuCarousel.addEventListener('mouseleave', resetAutoplay);
  menuCarousel.addEventListener('focusin', () => clearInterval(autoTimer));
  menuCarousel.addEventListener('focusout', resetAutoplay);
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) clearInterval(autoTimer);
  else resetAutoplay();
});

buildFilters();
buildCarousel();
setActive(0);
resetAutoplay();

document.querySelectorAll('[data-menu-category]').forEach((link) => {
  link.addEventListener('click', () => {
    const cat = link.getAttribute('data-menu-category');
    if (cat) setCategory(cat);
  });
});

/* ---------------------------------------------------------
   7. FOOTER YEAR
--------------------------------------------------------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
