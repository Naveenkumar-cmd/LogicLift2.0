// ==========================================
// LogicLift - Main JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

  // === Navbar Scroll Effect ===
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const isLightNav = navbar.classList.contains('light-nav-init');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
        if (isLightNav) navbar.classList.add('light-nav');
      } else {
        navbar.classList.remove('scrolled');
        if (isLightNav) navbar.classList.remove('light-nav');
      }
    });
  }

  // === Mobile Menu ===
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click — but NOT on the services toggle
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (link.classList.contains('mobile-service-toggle')) return;
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // === Scroll Reveal ===
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, (entry.target.dataset.delay || 0));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(el => observer.observe(el));
  }

  // === Counter Animation ===
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => countObserver.observe(counter));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  // === FAQ Accordion ===
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // === Chart Bars Animation ===
  const bars = document.querySelectorAll('.bar');
  bars.forEach((bar, i) => {
    const heights = [40, 65, 55, 80, 70, 90, 75];
    bar.style.height = heights[i % heights.length] + '%';
  });

  // === Active Nav Link ===
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // === Smooth scroll for anchor links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // === Mobile submenu toggle ===
  const mobileServiceToggle = document.querySelector('.mobile-service-toggle');
  const mobileSubmenu = document.querySelector('.mobile-submenu');
  if (mobileServiceToggle && mobileSubmenu) {
    mobileServiceToggle.addEventListener('click', (e) => {
      e.preventDefault();
      mobileSubmenu.style.display = mobileSubmenu.style.display === 'none' ? 'block' : 'none';
    });
  }

  /**** === Form Submission ===
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #00C896, #00FFB9)';
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          btn.style.background = '';
          contactForm.reset();
        }, 3000);
      }, 1500);
    });
  }
  ****/

  // === Tooltip on services ===
  document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.setAttribute('title', el.dataset.tooltip);
  });

});
