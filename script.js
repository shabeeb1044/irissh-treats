/* ==========================================================================
   IRISSH TREATS — script.js
   Shoranur, Kerala — Interactive Logic
   ========================================================================== */

document.documentElement.classList.add('js-ready');

/* ---------------------------------------------------------
   WhatsApp helpers
--------------------------------------------------------- */
const WHATSAPP_NUMBER = '917034535501';

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ---------------------------------------------------------
   1. NAVBAR — Glass on scroll
--------------------------------------------------------- */
const navbar = document.getElementById('navbar');

function onScrollNav() {
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
    name: 'Celebration Cake',
    eyebrow: 'Custom Cakes',
    tagline: 'Pure Delights, Baked with Love.',
    blurb: 'Custom celebration cakes crafted fresh for birthdays, weddings & every sweet moment.',
    img: 'images/irissh-cake-round.webp',
    bg: 'images/irissh-hero-bg.webp',
    orderMessage: "Hi! I'd like to order a celebration cake from Irissh Treats."
  },
  {
    name: 'Gourmet Burger',
    eyebrow: 'Savory Bites',
    tagline: 'Fresh. Stacked. Satisfying.',
    blurb: 'Juicy gourmet burgers made to order — perfect for lunch, dinner, or a quick craving.',
    img: 'images/irissh-burger-round.webp',
    bg: 'images/hero_bakery_bg.webp',
    orderMessage: "Hi! I'd like to order a gourmet burger from Irissh Treats."
  },
  {
    name: 'Fresh Fruit Juice',
    eyebrow: 'Chilled Juices',
    tagline: 'Squeezed Fresh. Served Cold.',
    blurb: 'Vibrant fruit juices pressed fresh — a cool sip of sunshine in every glass.',
    img: 'images/irissh-juice-round.webp',
    bg: 'images/hero_bg_restaurant.webp',
    orderMessage: "Hi! I'd like to order fresh fruit juice from Irissh Treats."
  },
  {
    name: 'Creamy Shake',
    eyebrow: 'Shakes & Sips',
    tagline: 'Thick. Creamy. Irresistible.',
    blurb: 'Handcrafted shakes topped with whipped cream — the sweetest cool-down treat.',
    img: 'images/hero-round-shake.webp',
    bg: 'images/hero-bg-new.webp',
    orderMessage: "Hi! I'd like to order a creamy shake from Irissh Treats."
  },
  {
    name: 'Rose Falooda',
    eyebrow: 'Dessert Drinks',
    tagline: 'Layers of Pure Indulgence.',
    blurb: 'Classic rose falooda with vermicelli, jelly & ice cream — a dessert in a glass.',
    img: 'images/hero-round-falooda.webp',
    bg: 'images/hero-bg.webp',
    orderMessage: "Hi! I'd like to order rose falooda from Irissh Treats."
  },
  {
    name: 'Gourmet Sandwich',
    eyebrow: 'Fresh Sandwiches',
    tagline: 'Crisp. Loaded. Delicious.',
    blurb: 'Freshly made sandwiches stacked with flavour — grab one on the go.',
    img: 'images/hero-round-sandwich.webp',
    bg: 'images/hero_bakery_bg.webp',
    orderMessage: "Hi! I'd like to order a gourmet sandwich from Irissh Treats."
  },
  {
    name: 'Egyptian Laban',
    eyebrow: 'Signature Desserts',
    tagline: 'Creamy. Cool. Unforgettable.',
    blurb: 'Egyptian laban dessert — silky milk pudding finished with pistachio, rose & honey.',
    img: 'images/hero-round-laban.webp',
    bg: 'images/irissh-hero-bg.webp',
    orderMessage: "Hi! I'd like to order Egyptian laban dessert from Irissh Treats."
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
    imgPlateCenter.alt = center.name;
  }
  if (imgPlateLeft) {
    imgPlateLeft.src = left.img;
    imgPlateLeft.alt = left.name;
  }
  if (imgPlateRight) {
    imgPlateRight.src = right.img;
    imgPlateRight.alt = right.name;
  }

  if (labelCenter) labelCenter.textContent = center.name;
  if (labelLeft) labelLeft.textContent = left.name;
  if (labelRight) labelRight.textContent = right.name;

  if (heroEyebrow) heroEyebrow.textContent = center.eyebrow;
  if (heroTitle) heroTitle.textContent = center.tagline;
  if (heroSubtext) heroSubtext.textContent = center.blurb;
  if (heroCtaBtn) heroCtaBtn.href = whatsappLink(center.orderMessage);

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

/* ---------------------------------------------------------
   5. INTERSECTION OBSERVER — Scroll reveals + Timeline
--------------------------------------------------------- */
const revealTargets = document.querySelectorAll('[data-animate]');
const timelineFill = document.getElementById('timelineFill');
const timelineSection = document.getElementById('timeline');

let timelineAnimated = false;

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');

      if (entry.target.closest('#timeline') && timelineFill && !timelineAnimated) {
        timelineAnimated = true;
        timelineFill.style.width = '100%';
      }

      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

if (timelineSection) {
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && timelineFill && !timelineAnimated) {
        timelineAnimated = true;
        timelineFill.style.width = '100%';
        timelineObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  timelineObserver.observe(timelineSection);
}

/* ---------------------------------------------------------
   6. PRODUCT CAROUSEL — Menu Highlights
--------------------------------------------------------- */
const products = [
  {
    name: 'Celebration Cakes',
    category: 'cakes',
    desc: 'Custom celebration cakes and signature slices — crafted with love for every occasion.',
    img: 'images/menu-cake.webp',
    orderMessage: "Hi! I'd like to order cakes from Irissh Treats."
  },
  {
    name: 'Gourmet Burgers',
    category: 'burgers',
    desc: 'Juicy, freshly made burgers stacked high — perfect for lunch or a satisfying snack.',
    img: 'images/menu-burger.webp',
    orderMessage: "Hi! I'd like to order burgers from Irissh Treats."
  },
  {
    name: 'Fresh Sandwiches',
    category: 'sandwiches',
    desc: 'Crisp, loaded sandwiches made fresh — grab one on the go or settle in for a bite.',
    img: 'images/menu-sandwich.webp',
    orderMessage: "Hi! I'd like to order sandwiches from Irissh Treats."
  },
  {
    name: 'Fresh Fruit Juices',
    category: 'drinks',
    desc: 'Chilled, natural fruit juices pressed fresh — a cool sip of sunshine in every glass.',
    img: 'images/menu-juice.webp',
    orderMessage: "Hi! I'd like to order fresh juices from Irissh Treats."
  },
  {
    name: 'Creamy Shakes',
    category: 'drinks',
    desc: 'Thick, creamy shakes topped with whipped cream — the sweetest cool-down treat.',
    img: 'images/menu-shake.webp',
    orderMessage: "Hi! I'd like to order a shake from Irissh Treats."
  },
  {
    name: 'Rose Falooda',
    category: 'desserts',
    desc: 'Classic rose falooda with vermicelli, jelly & ice cream — a dessert in a glass.',
    img: 'images/menu-falooda.webp',
    orderMessage: "Hi! I'd like to order rose falooda from Irissh Treats."
  },
  {
    name: 'Egyptian Laban',
    category: 'desserts',
    desc: 'Silky Egyptian laban dessert — cool milk pudding topped with pistachio, rose & honey.',
    img: 'images/menu-laban.webp',
    orderMessage: "Hi! I'd like to order Egyptian laban dessert from Irissh Treats."
  }
];

const menuCategories = [
  { id: 'all', label: 'All' },
  { id: 'cakes', label: 'Cakes' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'sandwiches', label: 'Sandwiches' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'desserts', label: 'Desserts' }
];

const track = document.getElementById('carouselTrack');
const dotsWrap = document.getElementById('carouselDots');
const filtersWrap = document.getElementById('menuFilters');
const productName = document.getElementById('productName');
const productDesc = document.getElementById('productDesc');
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
    item.dataset.index = i;
    item.setAttribute('aria-label', `Show ${p.name}`);
    item.innerHTML = `<img src="${p.img}" alt="${p.name}" loading="lazy"><span class="carousel-label">${p.name}</span>`;
    item.addEventListener('click', () => { setActive(i); resetAutoplay(); });
    track.appendChild(item);
  });

  dotsWrap.innerHTML = '';
  visibleProducts.forEach((p, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'dot';
    dot.setAttribute('aria-label', `Show ${p.name}`);
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
    const abs = Math.abs(diff);

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
  if (!productName || !productDesc) return;
  const p = visibleProducts[activeIndex];
  if (!p) return;
  productName.textContent = p.name;
  productDesc.textContent = p.desc;
  if (orderNowBtn) orderNowBtn.href = whatsappLink(p.orderMessage);
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

/* ---------------------------------------------------------
   7. FOOTER YEAR
--------------------------------------------------------- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
