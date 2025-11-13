// Kitchen Physician - Modern Theme JavaScript

(function() {
  'use strict';

  // Mobile Menu Toggle
  function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener('click', function() {
        const isHidden = mobileNav.style.display === 'none' || mobileNav.style.display === '';

        if (isHidden) {
          mobileNav.style.display = 'block';
          mobileMenuBtn.setAttribute('aria-expanded', 'true');
        } else {
          mobileNav.style.display = 'none';
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileNav.contains(event.target);
        const isClickOnButton = mobileMenuBtn.contains(event.target);

        if (!isClickInsideMenu && !isClickOnButton && mobileNav.style.display === 'block') {
          mobileNav.style.display = 'none';
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Close mobile menu on window resize to desktop
      window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
          mobileNav.style.display = 'none';
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  // Smooth Scroll for Anchor Links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }

  // Add to Cart Animation
  function initAddToCartAnimation() {
    const forms = document.querySelectorAll('form[action="/cart/add"]');

    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        const button = this.querySelector('button[type="submit"]');
        if (button && !button.disabled) {
          const originalText = button.textContent;
          button.textContent = 'Adding...';
          button.style.pointerEvents = 'none';

          setTimeout(() => {
            button.textContent = 'Added! ✓';
            setTimeout(() => {
              button.textContent = originalText;
              button.style.pointerEvents = 'auto';
            }, 1500);
          }, 500);
        }
      });
    });
  }

  // Scroll Animation Observer
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.animate-fade-in, .animate-slide-in-left, .animate-slide-in-right').forEach(el => {
      observer.observe(el);
    });
  }

  // Sticky Header Shadow
  function initStickyHeader() {
    const header = document.querySelector('header');
    if (header) {
      let lastScroll = 0;

      window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
          header.style.boxShadow = 'var(--shadow-md)';
        } else {
          header.style.boxShadow = 'var(--shadow-sm)';
        }

        lastScroll = currentScroll;
      });
    }
  }

  // Product Card Hover Effect Enhancement
  function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      });
    });
  }

  // Form Validation Enhancement
  function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
      const inputs = form.querySelectorAll('input[required], textarea[required]');

      inputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
          e.preventDefault();
          this.style.borderColor = '#dc2626';
          this.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
        });

        input.addEventListener('input', function() {
          if (this.validity.valid) {
            this.style.borderColor = '';
            this.style.boxShadow = '';
          }
        });
      });
    });
  }

  // Initialize all functions when DOM is ready
  function init() {
    initMobileMenu();
    initSmoothScroll();
    initAddToCartAnimation();
    initScrollAnimations();
    initStickyHeader();
    initProductCards();
    initFormValidation();

    console.log('🌿 Kitchen Physician theme loaded successfully!');
  }

  // Run init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
