/**
 * HIDAYA MANNIR MAIGIDAJE PORTFOLIO - SPATIAL RED & WHITE JAVASCRIPT
 * Dynamic Project Renderer, Category Filters, Lightbox Modal, and Spatial Micro-Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. PORTFOLIO PROJECTS DATA (HIDAYA REAL WORKS)
     ========================================== */
  const projectsData = [
    {
      id: 'proj-1',
      title: 'DCHILL Kitchen Promotional Flyer',
      category: 'flyer',
      categoryLabel: 'Flyer Design',
      image: 'assets/images/DCHILL Kitchen flyer.jpeg',
      isVideo: false,
      video: '',
      year: '2026',
      tags: ['Food Flyer', 'Promotional', 'Visual Layout'],
      description: 'Vibrant culinary and food promotional flyer designed for DCHILL Kitchen, featuring appetizing visual hierarchy, bold red typography, and clean spatial arrangement.'
    },
    {
      id: 'proj-2',
      title: 'Smoothie Brand Motion Graphic Video',
      category: 'motion',
      categoryLabel: 'Motion Graphics',
      image: '',
      isVideo: true,
      video: 'assets/images/smoothie motion graphics.mp4',
      year: '2026',
      tags: ['Motion Design', 'Product Ad', 'Kinetic Animation'],
      description: 'Dynamic kinetic motion graphic video advertisement created for a fresh smoothie brand. Features energetic visual transitions, product focus, and modern graphic motion.'
    },
    {
      id: 'proj-3',
      title: 'Corporate Business & Event Flyer',
      category: 'flyer',
      categoryLabel: 'Flyer Design',
      image: 'assets/images/Corporate flyer.jpeg',
      isVideo: false,
      video: '',
      year: '2026',
      tags: ['Corporate Flyer', 'Print Design', 'Branding'],
      description: 'Sleek corporate promotional flyer designed for business conferences and brand announcements. Combines clear informational structure with professional graphic styling.'
    },
    {
      id: 'proj-4',
      title: 'Strawberry Splash Motion Graphic Video',
      category: 'motion',
      categoryLabel: 'Motion Graphics',
      image: '',
      isVideo: true,
      video: 'assets/images/strawberry motion graphics one.mp4',
      year: '2026',
      tags: ['3D Motion', 'Product Reel', 'Visual Effects'],
      description: 'Fluid product motion graphic video highlighting fruit physics, vibrant strawberry aesthetics, smooth camera moves, and sleek motion design.'
    },
    {
      id: 'proj-5',
      title: 'Maigidaje Visual Identity Flyer',
      category: 'branding',
      categoryLabel: 'Brand & Visual',
      image: 'assets/images/Maigidaje Brand flyer.jpeg',
      isVideo: false,
      video: '',
      year: '2026',
      tags: ['Brand Identity', 'Visual Flyer', 'Typography'],
      description: 'Sophisticated visual branding flyer designed for Maigidaje. Features elegant typography, balanced spatial composition, and premium brand presentation.'
    },
    {
      id: 'proj-6',
      title: 'Commercial Motion Graphic Video',
      category: 'motion',
      categoryLabel: 'Motion Graphics',
      image: '',
      isVideo: true,
      video: 'assets/images/WhatsApp Video 2026-09-02 at 09.43.59.mp4',
      year: '2026',
      tags: ['Motion Graphic Video', 'Commercial', 'Kinetic Sync', 'After Effects'],
      description: 'High-impact commercial motion graphic video designed for brand promotion. Hidaya directed the kinetic typography, visual timing, custom motion transitions, and audio-visual synchronization to deliver a powerful marketing hook.'
    }
  ];

  /* ==========================================
     2. DOM ELEMENTS
     ========================================== */
  const projectsContainer = document.getElementById('projectsContainer');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const viewBtns = document.querySelectorAll('.view-btn');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalMediaHolder = document.getElementById('modalMediaHolder');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const toastNotification = document.getElementById('toastNotification');
  const contactForm = document.getElementById('contactForm');
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuPanel = document.getElementById('mobileMenuPanel');

  let currentCategory = 'all';

  /* ==========================================
     2b. MOBILE MENU TOGGLE
     ========================================== */
  function openMobileMenu() {
    mobileMenuBtn.classList.add('menu-open');
    mobileMenuPanel.classList.add('is-open');
    mobileMenuPanel.setAttribute('aria-hidden', 'false');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenuBtn.classList.remove('menu-open');
    mobileMenuPanel.classList.remove('is-open');
    mobileMenuPanel.setAttribute('aria-hidden', 'true');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileMenuBtn.classList.contains('menu-open');
      isOpen ? closeMobileMenu() : openMobileMenu();
    });
  }

  // Close when any menu link is clicked
  document.querySelectorAll('[data-close-menu]').forEach(el => {
    el.addEventListener('click', closeMobileMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  /* ==========================================
     2c. ACTIVE NAV LINK ON SCROLL
     ========================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = { root: null, rootMargin: '-40% 0px -55% 0px', threshold: 0 };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  /* ==========================================
     3. RENDER PROJECT CARDS
     ========================================== */
  function renderProjects(category = 'all') {
    if (!projectsContainer) return;
    projectsContainer.innerHTML = '';

    const filtered = category === 'all' 
      ? projectsData 
      : projectsData.filter(p => p.category === category);

    if (filtered.length === 0) {
      projectsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: var(--text-muted);">
          <i class="fa-solid fa-folder-open" style="font-size: 3rem; color: var(--primary-red); margin-bottom: 1rem;"></i>
          <h3>No projects found in this category.</h3>
        </div>
      `;
      return;
    }

    filtered.forEach(project => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.setAttribute('data-id', project.id);

      let mediaHtml = '';
      let playBadge = '';

      if (project.isVideo) {
        const safeVideoSrc = encodeURI(project.video);
        playBadge = `<div class="motion-play-badge" title="Play Motion Video"><i class="fa-solid fa-play"></i></div>`;
        
        // Use HTML5 video element with #t=0.5 as dynamic visual thumbnail & video hook preview
        mediaHtml = `
          <video src="${safeVideoSrc}#t=0.5" class="project-thumbnail project-video-preview" preload="metadata" muted playsinline loop></video>
        `;
      } else {
        const safeImgSrc = encodeURI(project.image);
        mediaHtml = `
          <img src="${safeImgSrc}" alt="${project.title}" class="project-thumbnail" loading="lazy" />
        `;
      }

      card.innerHTML = `
        <div class="project-media-wrapper">
          ${mediaHtml}
          <span class="project-category-badge">${project.categoryLabel}</span>
          ${playBadge}
        </div>
        <div class="project-details">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
          <div class="project-footer">
            <span class="project-year">${project.year}</span>
            <span class="view-project-link">
              ${project.isVideo ? 'Play Motion Video' : 'View Full Flyer'} 
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </span>
          </div>
        </div>
      `;

      // Hover video play preview hook
      if (project.isVideo) {
        const videoEl = card.querySelector('.project-video-preview');
        card.addEventListener('mouseenter', () => {
          if (videoEl) videoEl.play().catch(() => {});
        });
        card.addEventListener('mouseleave', () => {
          if (videoEl) {
            videoEl.pause();
            videoEl.currentTime = 0.5;
          }
        });
      }

      card.addEventListener('click', () => openProjectModal(project));
      projectsContainer.appendChild(card);
    });

    initSpatialTilt();
  }

  /* ==========================================
     4. CATEGORY FILTERING & VIEW SWITCHER
     ========================================== */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter');
      renderProjects(currentCategory);
    });
  });

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const viewMode = btn.getAttribute('data-view');
      
      if (viewMode === 'list') {
        projectsContainer.classList.remove('grid-view');
        projectsContainer.classList.add('list-view');
      } else {
        projectsContainer.classList.remove('list-view');
        projectsContainer.classList.add('grid-view');
      }
    });
  });

  /* ==========================================
     5. LIGHTBOX & VIDEO PLAYER MODAL
     ========================================== */
  function openProjectModal(project) {
    if (!modalOverlay || !modalMediaHolder) return;

    modalTitle.textContent = project.title;
    modalDesc.innerHTML = `
      <p style="margin-bottom: 1rem; color: var(--text-muted); font-size: 1rem; line-height: 1.6;">${project.description}</p>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem;">
        ${project.tags.map(tag => `<span style="background: var(--light-red-bg); color: var(--primary-red); font-weight: 700; font-size: 0.8rem; padding: 0.35rem 0.85rem; border-radius: 50px;">${tag}</span>`).join('')}
      </div>
    `;

    if (project.isVideo) {
      const safeVideoSrc = encodeURI(project.video);
      modalMediaHolder.innerHTML = `
        <video controls autoplay loop playsinline style="width: 100%; max-height: 520px; border-radius: 14px; background: #000; object-fit: contain;">
          <source src="${safeVideoSrc}" type="video/mp4" />
          Your browser does not support HTML5 video playback.
        </video>
      `;
    } else {
      const safeImgSrc = encodeURI(project.image);
      modalMediaHolder.innerHTML = `
        <img src="${safeImgSrc}" alt="${project.title}" style="max-width: 100%; max-height: 550px; object-fit: contain; border-radius: 14px;" />
      `;
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (modalMediaHolder) modalMediaHolder.innerHTML = '';
    }, 300);
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ==========================================
     6. SPATIAL CARD MOUSE TILT EFFECT
     ========================================== */
  function initSpatialTilt() {
    const cards = document.querySelectorAll('.project-card, .hero-spatial-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 18;
        const rotateY = (centerX - x) / 18;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ==========================================
     7. DARK / LIGHT THEME TOGGLE
     ========================================== */
  const savedTheme = localStorage.getItem('hidaya_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('hidaya_theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    if (theme === 'dark') {
      themeToggleBtn.innerHTML = `<i class="fa-solid fa-sun"></i>`;
      themeToggleBtn.setAttribute('title', 'Switch to Light Theme');
    } else {
      themeToggleBtn.innerHTML = `<i class="fa-solid fa-moon"></i>`;
      themeToggleBtn.setAttribute('title', 'Switch to Dark Theme');
    }
  }

  /* ==========================================
     8. TOAST NOTIFICATION & COPY EMAIL
     ========================================== */
  function showToast(message) {
    if (!toastNotification) return;
    const toastMsg = toastNotification.querySelector('.toast-message') || toastNotification;
    toastMsg.textContent = message;
    toastNotification.classList.add('show');

    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 4000);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'maigidajehidaya@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard: ' + email);
      }).catch(() => {
        showToast('Direct email: ' + email);
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your message has been sent to Hidaya.');
      contactForm.reset();
    });
  }

  // Initial Execution
  renderProjects('all');
});
