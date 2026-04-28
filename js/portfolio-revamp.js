// =============================================
//  PORTFOLIO REVAMP — JavaScript
// =============================================

'use strict';

// ===== PRELOADER =====
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => preloader.classList.add('hidden'), 800);
  }
});


// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  if (cursorFollower) {
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
  }
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover states
const hoverEls = document.querySelectorAll('a, button, .service-card, .project-card, .video-card, .form-checkbox');
hoverEls.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor && cursor.classList.add('cursor-hover');
    cursorFollower && cursorFollower.classList.add('follower-hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor && cursor.classList.remove('cursor-hover');
    cursorFollower && cursorFollower.classList.remove('follower-hover');
  });
});


// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Sticky navbar
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
  updateActiveNavLink();
  toggleBackToTop();
});

// Hamburger
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu && mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
}

// Mobile links — close menu on click
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger && hamburger.classList.remove('open');
    mobileMenu && mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});


// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navOffset = navbar ? navbar.offsetHeight : 80;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  });
});


// ===== ACTIVE NAV LINK =====
function updateActiveNavLink() {
  const currentPage = document.body.getAttribute('data-page');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (currentPage) {
    navLinks.forEach(link => {
      if (link.getAttribute('data-page') === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}
updateActiveNavLink();


// ===== SCROLL ANIMATIONS =====
const animatedEls = document.querySelectorAll('[data-animate]');

const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
};

const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('animated'), delay);
      animObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedEls.forEach(el => animObserver.observe(el));


// ===== HERO PARALLAX =====
const heroBlobs = document.querySelectorAll('.blob');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  heroBlobs.forEach((blob, i) => {
    const factor = (i + 1) * 0.5;
    blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});


// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll('.stat-item strong');
  counters.forEach(counter => {
    const target = parseInt(counter.innerText.replace(/\D/g, ''));
    const suffix = counter.innerText.replace(/[0-9]/g, '').trim();
    let current = 0;
    const duration = 1600;
    const step = target / (duration / 16);

    const update = () => {
      current += step;
      if (current < target) {
        counter.innerText = Math.floor(current) + suffix;
        requestAnimationFrame(update);
      } else {
        counter.innerText = target + suffix;
      }
    };
    update();
  });
}

// Trigger counter when hero is visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
  const counterObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(animateCounters, 1000);
      counterObserver.disconnect();
    }
  }, { threshold: 0.5 });
  counterObserver.observe(heroSection);
}

// ===== WORK VIDEOS =====
const portfolioVideos = [
  {
    category: 'short-form',
    tag: 'Short-Form',
    title: 'Short-Form Edit 01',
    description: 'Fast-paced vertical edit built for social feeds, retention, and quick replay value.',
    meta: 'Short Video',
    src: 'https://res.cloudinary.com/dpy5cxfa3/video/upload/v1777348921/IMG_6398_vupbrz.mp4'
  },
  {
    category: 'short-form',
    tag: 'Short-Form',
    title: 'Short-Form Edit 02',
    description: 'Scroll-stopping rhythm with compact storytelling and punchy visual pacing.',
    meta: 'Short Video',
    src: 'https://res.cloudinary.com/dpy5cxfa3/video/upload/v1777348902/IMG_6391_tzam8x.mp4'
  },
  {
    category: 'short-form',
    tag: 'Short-Form',
    title: 'Short-Form Edit 03',
    description: 'A tight social edit shaped around hooks, speed ramps, and clean impact beats.',
    meta: 'Short Video',
    src: 'https://res.cloudinary.com/dpy5cxfa3/video/upload/v1777348902/IMG_6389_ydzxnn.mp4'
  },
  {
    category: 'short-form',
    tag: 'Short-Form',
    title: 'Short-Form Edit 04',
    description: 'Vertical-first pacing with sharp transitions and compact brand energy.',
    meta: 'Short Video',
    src: 'https://res.cloudinary.com/dpy5cxfa3/video/upload/v1777348899/IMG_6399_giaaks.mp4'
  },
  {
    category: 'short-form',
    tag: 'Short-Form',
    title: 'Short-Form Edit 05',
    description: 'Quick-cut social content with a polished hook and clean ending beat.',
    meta: 'Short Video',
    src: 'https://res.cloudinary.com/dpy5cxfa3/video/upload/v1777348897/IMG_6390_rekypf.mp4'
  },
  {
    category: 'short-form',
    tag: 'Short-Form',
    title: 'Short-Form Edit 06',
    description: 'Compact edit focused on clarity, momentum, and social feed performance.',
    meta: 'Short Video',
    src: 'https://res.cloudinary.com/dpy5cxfa3/video/upload/v1777348893/IMG_6401_qsmoto.mp4'
  },
  {
    category: 'short-form',
    tag: 'Short-Form',
    title: 'Short-Form Edit 07',
    description: 'A vertical piece tuned for mobile viewing and quick audience payoff.',
    meta: 'Short Video',
    src: 'https://res.cloudinary.com/dpy5cxfa3/video/upload/v1777348890/IMG_6393_ejbnr2.mp4'
  },
  {
    category: 'short-form',
    tag: 'Short-Form',
    title: 'Short-Form Edit 08',
    description: 'High-energy edit with crisp timing and a feed-friendly runtime.',
    meta: 'Short Video',
    src: 'https://res.cloudinary.com/dpy5cxfa3/video/upload/v1777348884/IMG_6396_nhtrzs.mp4'
  },
  {
    category: 'short-form',
    tag: 'Short-Form',
    title: 'Short-Form Edit 09',
    description: 'Motion-led short edit with clean animation timing and visual polish.',
    meta: 'Short Video',
    src: 'https://res.cloudinary.com/dpy5cxfa3/video/upload/v1777348884/IMG_6395_movllv.mp4'
  },
  {
    category: 'short-form',
    tag: 'Short-Form',
    title: 'Short-Form Edit 10',
    description: 'Animated social piece with smooth movement and concise visual storytelling.',
    meta: 'Short Video',
    src: 'https://res.cloudinary.com/dpy5cxfa3/video/upload/v1777348884/IMG_6397_ey4zhs.mp4'
  },
  {
    category: 'short-form',
    tag: 'Short-Form',
    title: 'Short-Form Edit 11',
    description: 'Short animated segment with polished visual rhythm and clean exports.',
    meta: 'Short Video',
    src: 'https://res.cloudinary.com/dpy5cxfa3/video/upload/v1777348880/IMG_6392_qdzman.mp4'
  },
  {
    category: 'short-form',
    tag: 'Short-Form',
    title: 'Short-Form Edit 12',
    description: 'Motion-focused social video designed for immediate visual impact.',
    meta: 'Short Video',
    src: 'https://res.cloudinary.com/dpy5cxfa3/video/upload/v1777348879/IMG_6400_upub83.mp4'
  },
  {
    category: 'long-form',
    tag: 'Long-Form',
    title: 'ClickUp Edit',
    description: 'Long-form edit structured for clarity, pacing, and sustained audience attention.',
    meta: 'Long Video',
    src: 'https://res.cloudinary.com/dpy5cxfa3/video/upload/v1776855956/Clickup_amy5yx.mp4'
  },
  {
    category: 'long-form',
    tag: 'Long-Form',
    title: 'GETFIDO Edit',
    description: 'Narrative long-form content with clean sequencing and professional finishing.',
    meta: 'Long Video',
    src: 'https://res.cloudinary.com/dpy5cxfa3/video/upload/v1776855964/GETFIDO_imdwhl.mp4'
  },
  {
    category: 'long-form',
    tag: 'Long-Form',
    title: 'Compound Interest Edit',
    description: 'A deep dive into the power of compounding, with clean data visualizations and professional pacing.',
    meta: 'Long Video',
    src: 'https://res.cloudinary.com/dpy5cxfa3/video/upload/v1777349522/compound_interest_lb60eh.mp4'
  },
  {
    category: 'long-form',
    tag: 'Long-Form',
    title: 'House Edit',
    description: 'Long-form storytelling edit with steady pacing, structure, and polished delivery.',
    meta: 'Long Video',
    src: 'https://res.cloudinary.com/dpy5cxfa3/video/upload/v1776855967/House_ffbguf.mp4'
  }
];

const projectsGrid = document.getElementById('projectsGrid');

if (projectsGrid && portfolioVideos.length) {
  projectsGrid.innerHTML = portfolioVideos.map((video, index) => `
    <div class="project-card" data-category="${video.category}" data-animate="fade-up" data-delay="${(index % 3) * 100}">
      <div class="project-image-wrap">
        <video class="project-img project-video-preview" muted playsinline preload="metadata">
          <source src="${video.src}" type="video/mp4">
        </video>
        <div class="project-overlay">
          <button class="project-zoom-btn" data-lightbox data-type="video" data-src="${video.src}" aria-label="Play ${video.title}">
            <i class="bi-play-fill"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  projectsGrid.querySelectorAll('[data-animate]').forEach(el => animObserver.observe(el));
  projectsGrid.querySelectorAll('button, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor && cursor.classList.add('cursor-hover');
      cursorFollower && cursorFollower.classList.add('follower-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor && cursor.classList.remove('cursor-hover');
      cursorFollower && cursorFollower.classList.remove('follower-hover');
    });
  });
}


// ===== LIGHTBOX =====
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxMedia = document.getElementById('lightboxMedia');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('[data-lightbox]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const src = btn.getAttribute('data-src') || btn.getAttribute('href');
    const type = btn.getAttribute('data-type');
    if (lightboxMedia && lightboxOverlay && src) {
      lightboxMedia.innerHTML = type === 'video'
        ? `<video class="lightbox-video" controls autoplay playsinline src="${src}"></video>`
        : `<img src="${src}" alt="Project preview" class="lightbox-img">`;
      lightboxOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

function closeLightbox() {
  const activeVideo = lightboxMedia && lightboxMedia.querySelector('video');
  if (activeVideo) activeVideo.pause();
  lightboxOverlay && lightboxOverlay.classList.remove('active');
  document.body.style.overflow = '';
  if (lightboxMedia) lightboxMedia.innerHTML = '';
}

lightboxClose && lightboxClose.addEventListener('click', closeLightbox);
lightboxOverlay && lightboxOverlay.addEventListener('click', (e) => {
  if (e.target === lightboxOverlay) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});


// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const message = document.getElementById('contactMessage');

    // Simple validation
    let valid = true;

    [name, email, message].forEach(field => {
      if (field && !field.value.trim()) {
        field.style.borderColor = 'rgba(239, 68, 68, 0.6)';
        valid = false;
        setTimeout(() => { field.style.borderColor = ''; }, 3000);
      }
    });

    if (!valid) return;

    // Simulate sending
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending...';

    setTimeout(() => {
      submitBtn.style.opacity = '1';
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Send Message';
      contactForm.reset();
      formSuccess && formSuccess.classList.add('visible');
      setTimeout(() => formSuccess && formSuccess.classList.remove('visible'), 5000);
    }, 1800);
  });
}


// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
  if (backToTop) {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }
}

backToTop && backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ===== ACTIVE TAG ROTATION =====
const tags = document.querySelectorAll('.tag-wrap');
let currentTag = 2; // starts at #03

setInterval(() => {
  tags.forEach(t => t.classList.remove('active-tag'));
  currentTag = (currentTag + 1) % tags.length;
  tags[currentTag] && tags[currentTag].classList.add('active-tag');
}, 2500);


// ===== TILT EFFECT ON SERVICE CARDS =====
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


// ===== FAQ ACCORDION =====
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(btn => {
  btn.addEventListener('click', () => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    const answer = btn.nextElementSibling;
    
    // Close all other FAQs
    faqQuestions.forEach(otherBtn => {
      if (otherBtn !== btn) {
        otherBtn.setAttribute('aria-expanded', 'false');
        if(otherBtn.nextElementSibling) {
          otherBtn.nextElementSibling.style.display = 'none';
        }
      }
    });

    // Toggle current
    btn.setAttribute('aria-expanded', !isExpanded);
    answer.style.display = isExpanded ? 'none' : 'block';
  });
});


// ===== PROJECTS FILTER =====
const filterTabs = document.querySelectorAll('.filter-tab');
const projectCards = document.querySelectorAll('.project-card');
const projectsEmpty = document.getElementById('projectsEmpty');

function applyProjectFilter(filter, instant = false) {
  let visibleCount = 0;

  projectCards.forEach(card => {
    if (card.getAttribute('data-category') === filter) {
      card.style.display = 'block';
      const showCard = () => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      };
      instant ? showCard() : setTimeout(showCard, 50);
      visibleCount++;
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      if (instant) {
        card.style.display = 'none';
      } else {
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    }
  });

  if (projectsEmpty) {
    const updateEmpty = () => {
      projectsEmpty.style.display = visibleCount === 0 ? 'block' : 'none';
    };
    instant ? updateEmpty() : setTimeout(updateEmpty, 300);
  }
}

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    applyProjectFilter(tab.getAttribute('data-filter'));
  });
});

const activeProjectFilter = document.querySelector('.filter-tab.active');
if (activeProjectFilter) {
  applyProjectFilter(activeProjectFilter.getAttribute('data-filter'), true);
}

// ===== MARQUEE INFINITE LOOP FIX =====
const marqueeTracks = document.querySelectorAll('.marquee-inner');
marqueeTracks.forEach(inner => {
  // Grab only the first 7 unique logos to avoid exponential cloning
  const logos = Array.from(inner.children).slice(0, 7);
  inner.innerHTML = '';
  // Append 12 sets to ensure track is wide enough for any screen up to 4K
  // Since 12 is an even number, translateX(-50%) will shift exactly 6 sets, maintaining a flawless loop.
  for (let i = 0; i < 12; i++) {
    logos.forEach(logo => inner.appendChild(logo.cloneNode(true)));
  }
});
