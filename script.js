// === NAVBAR SCROLL EFFECT ===
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// === MOBILE MENU TOGGLE ===
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navbarMenu = document.getElementById('navbar-menu');
const navbarLinks = document.querySelectorAll('.navbar-menu a');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close menu when clicking a link
    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

// === SMOOTH SCROLL FOR NAVIGATION LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = targetElement.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// === SCROLL ANIMATIONS ===
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: stop observing after animation
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections except hero
const sections = document.querySelectorAll('section:not(.hero)');
sections.forEach(section => {
  observer.observe(section);
});

// === SKILL CARDS STAGGER ANIMATION ===
const skillCards = document.querySelectorAll('.skill-card');
const skillsSection = document.querySelector('.skills');

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillCards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 100); // Stagger effect
      });
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

if (skillsSection) {
  // Set initial state for skill cards
  skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  skillsObserver.observe(skillsSection);
}

// === ACTIVE NAVIGATION LINK ===
const navLinks = document.querySelectorAll('.navbar-menu a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - navbar.offsetHeight - 100) {
      current = section.getAttribute('id');
    }
  });
  
  // Also check hero section
  const heroSection = document.querySelector('.hero');
  if (heroSection && window.pageYOffset < heroSection.offsetHeight - 100) {
    current = 'home';
  }
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// === PERFORMANCE OPTIMIZATION ===
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// === LOADING ANIMATION ===
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// === CONSOLE MESSAGE ===
console.log('%c👋 Olá! Bem-vindo ao meu portfólio!', 'color: #3B82F6; font-size: 16px; font-weight: bold;');
console.log('%c🚀 Desenvolvido com HTML, CSS e JavaScript', 'color: #8B5CF6; font-size: 12px;');
