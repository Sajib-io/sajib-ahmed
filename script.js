document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. NAVIGATION BACKGROUND BLUR ON SCROLL
     ========================================== */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ==========================================
     2. MOBILE NAV OVERLAY TOGGLE
     ========================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  /* ==========================================
     3. SCROLL REVEAL OBSERVER
     ========================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once element is shown, we can unobserve
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(element => {
      element.classList.add('active');
    });
  }

  /* ==========================================
     4. ACTIVE NAV SECTION SYNCER
     ========================================== */
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');
  
  if ('IntersectionObserver' in window && sections.length > 0 && navItems.length > 0) {
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navItems.forEach(item => {
            if (item.getAttribute('href') === `#${currentId}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-20% 0px -60% 0px'
    });

    sections.forEach(section => {
      activeObserver.observe(section);
    });
  }

  /* ==========================================
     5. PROJECT FLOATING IMAGE REVEAL
     ========================================== */
  const workItems = document.querySelectorAll('.work-item');
  const previewContainer = document.getElementById('work-preview-container');
  const previewImage = document.getElementById('work-preview-image');
  
  if (workItems.length > 0 && previewContainer && previewImage) {
    let pMouseX = 0;
    let pMouseY = 0;
    let containerX = 0;
    let containerY = 0;
    const pEase = 0.1; // Smooth following rate for the project preview
    
    // Custom animation frame for preview image following mouse
    function followMousePreview() {
      containerX += (pMouseX - containerX) * pEase;
      containerY += (pMouseY - containerY) * pEase;
      
      previewContainer.style.left = `${containerX}px`;
      previewContainer.style.top = `${containerY}px`;
      
      requestAnimationFrame(followMousePreview);
    }
    requestAnimationFrame(followMousePreview);

    workItems.forEach(item => {
      item.addEventListener('mouseenter', (e) => {
        const imageSrc = item.getAttribute('data-preview');
        previewImage.src = imageSrc;
        
        // Instant setup position to prevent massive slides across screen on first enter
        if (previewContainer.style.opacity === '0' || previewContainer.style.opacity === '') {
          pMouseX = e.clientX;
          pMouseY = e.clientY;
          containerX = pMouseX;
          containerY = pMouseY;
          previewContainer.style.left = `${containerX}px`;
          previewContainer.style.top = `${containerY}px`;
        }
        
        // Show container
        previewContainer.style.opacity = '1';
        previewContainer.style.transform = 'translate(-50%, -50%) scale(1)';
      });
      
      item.addEventListener('mousemove', (e) => {
        pMouseX = e.clientX;
        pMouseY = e.clientY;
      });
      
      item.addEventListener('mouseleave', () => {
        previewContainer.style.opacity = '0';
        previewContainer.style.transform = 'translate(-50%, -50%) scale(0.8)';
      });
    });
  }

  /* ==========================================
     6. CONTACT FORM HANDLER WITH SUCCESS
     ========================================== */
  const contactForm = document.getElementById('contact-form');
  const successOverlay = document.getElementById('form-success');
  
  if (contactForm && successOverlay) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent standard page redirect
      
      // Perform simple validation
      const nameVal = document.getElementById('form-name').value.trim();
      const emailVal = document.getElementById('form-email').value.trim();
      const msgVal = document.getElementById('form-message').value.trim();
      
      if (nameVal && emailVal && msgVal) {
        // Show success animation overlay
        successOverlay.classList.add('show');
        
        // Auto reset contact form fields
        contactForm.reset();
        
        // Hide success message overlay after 4 seconds
        setTimeout(() => {
          successOverlay.classList.remove('show');
        }, 4000);
      }
    });
  }
});
