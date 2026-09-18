/**
 * Personal Business Portfolio - Interactive JS
 * Features: Rising Ambient Particles Canvas, Typewriter Effect, 
 * Stats Count-Up, Portfolio Tab Switcher, Project Detail Modal, Toast Notification
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTypewriter();
  initCountUpStats();
  initPortfolioTabs();
  initProjectModal();
  initFloatingNavbar();
  initContactForm();
});

/* -------------------------------------------------------------------------- */
/* 1. Rising Particles Canvas Animation (Gold & Bright Pink)                   */
/* -------------------------------------------------------------------------- */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleColors = [
    'rgba(255, 95, 172, ',  // Bright Pink
    'rgba(216, 172, 106, ', // Warm Gold
    'rgba(255, 142, 196, ', // Soft Rose Pink
    'rgba(248, 223, 165, '  // Shimmer Gold
  ];

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 18), 75);

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 2.2 + 0.8;
      this.speedY = Math.random() * 0.45 + 0.2;
      this.speedX = (Math.random() - 0.5) * 0.25;
      this.colorBase = particleColors[Math.floor(Math.random() * particleColors.length)];
      this.alpha = Math.random() * 0.55 + 0.2;
      this.fadeSpeed = Math.random() * 0.003 + 0.001;
      this.twinkleDir = Math.random() > 0.5 ? 1 : -1;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;

      // Twinkle effect
      this.alpha += this.fadeSpeed * this.twinkleDir;
      if (this.alpha >= 0.75) {
        this.twinkleDir = -1;
      } else if (this.alpha <= 0.15) {
        this.twinkleDir = 1;
      }

      // Reset when particle floats off top or sides
      if (this.y < -15 || this.x < -10 || this.x > width + 10) {
        this.reset(false);
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `${this.colorBase}${this.alpha})`;
      ctx.shadowBlur = this.size * 5;
      ctx.shadowColor = this.colorBase.includes('255, 95') ? '#ff5fac' : '#d8ac6a';
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* -------------------------------------------------------------------------- */
/* 2. Typewriter Effect for Hero Section                                      */
/* -------------------------------------------------------------------------- */
function initTypewriter() {
  const element = document.getElementById('typewriter-text');
  if (!element) return;

  const roles = [
    'Business Enthusiast',
    'Aspiring Entrepreneur',
    'Digital Marketing Analyst',
    'Strategic Thinker'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 95;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      element.textContent = currentRole.substring(0, charIndex);
      typingSpeed = 45;
    } else {
      charIndex++;
      element.textContent = currentRole.substring(0, charIndex);
      typingSpeed = 85 + Math.random() * 40;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause when full phrase is typed
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* -------------------------------------------------------------------------- */
/* 3. Count-Up Stats Animation                                                */
/* -------------------------------------------------------------------------- */
function initCountUpStats() {
  const statNumbers = document.querySelectorAll('.count-up');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          statNumbers.forEach((stat) => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const suffix = stat.getAttribute('data-suffix') || '';
            const prefix = stat.getAttribute('data-prefix') || '';
            const duration = 2000;
            const startTime = performance.now();

            function updateCount(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out expo formula
              const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              const currentVal = Math.floor(easeOut * target);

              stat.textContent = `${prefix}${currentVal}${suffix}`;

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                stat.textContent = `${prefix}${target}${suffix}`;
              }
            }

            requestAnimationFrame(updateCount);
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  const statsSection = document.getElementById('stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* -------------------------------------------------------------------------- */
/* 4. Portfolio Tabs (Projects, Certificates, Tools & Skill)                  */
/* -------------------------------------------------------------------------- */
function initPortfolioTabs() {
  const tabButtons = document.querySelectorAll('.portfolio-tab-btn');
  const tabPanels = document.querySelectorAll('.tab-content-panel');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update button styles
      tabButtons.forEach((b) => {
        b.classList.remove('active', 'bg-gradient-to-r', 'from-[#ff5fac]/20', 'to-[#d8ac6a]/20', 'text-white', 'border-[#ff5fac]');
        b.classList.add('text-gray-400', 'border-transparent', 'hover:text-white');
      });

      btn.classList.add('active', 'bg-gradient-to-r', 'from-[#ff5fac]/20', 'to-[#d8ac6a]/20', 'text-white', 'border-[#ff5fac]');
      btn.classList.remove('text-gray-400', 'border-transparent');

      // Update tab panels
      tabPanels.forEach((panel) => {
        if (panel.id === `tab-${targetTab}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/* -------------------------------------------------------------------------- */
/* 5. Project Detail Modal                                                    */
/* -------------------------------------------------------------------------- */
const projectData = {
  'proj-1': {
    title: 'Omnichannel D2C Brand Scalability & Market Penetration',
    category: 'Strategic Business Feasibility',
    role: 'Lead Business Strategist',
    timeline: '3 Months (Q2 2024)',
    overview: 'Merancang rencana ekspansi pasar produk premium modest fashion wanita ke 4 kota tier-1 di Asia Tenggara melalui ekosistem digital dan gerai pop-up eksklusif.',
    challenge: 'Tingginya biaya akuisisi pelanggan (CAC) di pasar kompetitif dan fragmentasi rantai pasok lokal antar negara tujuan.',
    solution: 'Menerapkan framework Blue Ocean Strategy, restrukturisasi channel distribusi D2C berbasis micro-influencer tier 2-3, serta optimasi unit economics inventaris.',
    results: [
      'Peningkatan Gross Merchandise Value (GMV) sebesar 145% dalam 6 bulan',
      'Efisiensi Customer Acquisition Cost (CAC) hingga 28%',
      'Net Promoter Score (NPS) mencapai 89/100 di kuartal pertama peluncuran'
    ],
    tools: ['Market Sizing (TAM/SAM/SOM)', 'Financial Modeling', 'Tableau', 'Notion HQ']
  },
  'proj-2': {
    title: 'Digital Marketing Funnel & High-Yield Performance Ads',
    category: 'Digital Marketing & Growth',
    role: 'Growth Marketing Analyst',
    timeline: '4 Months (Q3-Q4 2023)',
    overview: 'Audit komprehensif dan perancangan ulang arsitektur kampanye iklan berbayar (Meta Ads & TikTok Ads) untuk platform edutech khusus wanita.',
    challenge: 'Rasio konversi dari lead gratisan ke premium subscriber tertahan di angka 1.8%, dengan churn rate yang tinggi pada minggu pertama.',
    solution: 'Pengembangan landing page berbasis psychological triggers, re-engagement email sequence 7 hari otomatis, dan dynamic audience segmentation.',
    results: [
      'Pertumbuhan Conversion Rate sebesar +210% (dari 1.8% ke 5.6%)',
      'ROAS (Return on Ad Spend) konsisten di angka 4.3x selama kampanye',
      'Menjangkau lebih dari 280.000 calon customer organik & berbayar'
    ],
    tools: ['Google Analytics 4', 'Meta Business Suite', 'TikTok Ads Manager', 'Mixpanel']
  },
  'proj-3': {
    title: 'SaaS FinTech Valuation & 5-Year Financial Projections',
    category: 'Financial Modeling & Valuation',
    role: 'Financial & Strategy Associate',
    timeline: '2 Months (2024)',
    overview: 'Penyusunan pitch deck finansial lengkap, DCF (Discounted Cash Flow) model, dan skenario sensitivitas untuk putaran pendanaan Pre-Series A startup SaaS.',
    challenge: 'Investor institusi memerlukan kepastian jalur menuju profitabilitas (burn rate reduction) di tengah pengetatan likuiditas modal ventura.',
    solution: 'Membangun 3-statement financial model dinamis dengan stress-testing, cohort churn analysis, dan unit economics per customer tier.',
    results: [
      'Membantu founder mengamankan komitmen pendanaan sebesar $450K+',
      'Merumuskan 18 rekomendasi optimasi COGS yang disetujui dewan direksi',
      'Mempercepat siklus due diligence investor dari 12 minggu menjadi 6 minggu'
    ],
    tools: ['Advanced Excel', 'DCF Valuation', 'Cohort Analysis', 'PowerBI']
  },
  'proj-4': {
    title: 'Brand Architecture & Value Proposition Revamp',
    category: 'Brand Strategy & Identity',
    role: 'Brand Consultant',
    timeline: '2.5 Months (2024)',
    overview: 'Revitalisasi positioning brand produk kecantikan organik ramah lingkungan agar selaras dengan segmen konsumen modern Gen-Z & Millennial.',
    challenge: 'Persepsi pasar lama yang kaku dan belum mencerminkan nilai inklusifitas dan transparansi bahan baku.',
    solution: 'Re-positioning brand narrative bertema "Conscious Luxury", restrukturisasi portofolio SKU, serta panduan kurasi konten media sosial berbasis storytelling.',
    results: [
      'Engagement rate media sosial melonjak 3.8x dalam 90 hari pertama',
      'Liputan media editorial independen di 5 portal gaya hidup nasional',
      'Pertumbuhan penjualan produk pahlawan (hero SKU) sebesar 85%'
    ],
    tools: ['Brand Archetype Matrix', 'Consumer Persona Mapping', 'Figma', 'Miro']
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalContainer = document.getElementById('modal-card');
  const closeBtn = document.getElementById('modal-close-btn');
  const viewBtns = document.querySelectorAll('.view-project-btn');

  if (!modal || !modalContainer) return;

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-role').textContent = data.role;
    document.getElementById('modal-timeline').textContent = data.timeline;
    document.getElementById('modal-overview').textContent = data.overview;
    document.getElementById('modal-challenge').textContent = data.challenge;
    document.getElementById('modal-solution').textContent = data.solution;

    // Results List
    const resultsContainer = document.getElementById('modal-results');
    resultsContainer.innerHTML = '';
    data.results.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-2.5 text-sm text-gray-300';
      li.innerHTML = `
        <span class="text-[#ff5fac] mt-0.5"><i class="fa-solid fa-circle-check"></i></span>
        <span>${item}</span>
      `;
      resultsContainer.appendChild(li);
    });

    // Tools Chips
    const toolsContainer = document.getElementById('modal-tools');
    toolsContainer.innerHTML = '';
    data.tools.forEach((tool) => {
      const span = document.createElement('span');
      span.className = 'px-3 py-1 rounded-full text-xs font-medium bg-[#1a1824] text-[#d8ac6a] border border-[#d8ac6a]/30';
      span.textContent = tool;
      toolsContainer.appendChild(span);
    });

    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      modalContainer.classList.remove('scale-95');
      modalContainer.classList.add('scale-100');
    }, 10);

    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('opacity-0');
    modalContainer.classList.remove('scale-100');
    modalContainer.classList.add('scale-95');

    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }, 250);
  }

  viewBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      openModal(id);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 6. Floating Navbar Behavior (Active Links & Mobile Menu)                  */
/* -------------------------------------------------------------------------- */
function initFloatingNavbar() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('text-[#ff5fac]', 'font-semibold');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-[#ff5fac]', 'font-semibold');
          }
        });
      }
    });
  });

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

/* -------------------------------------------------------------------------- */
/* 7. Contact Form Handler with Toast Notification                            */
/* -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  if (!form) return;

  function showToast(message, isSuccess = true) {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 4500);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('[name="name"]');
    const emailInput = form.querySelector('[name="email"]');
    const messageInput = form.querySelector('[name="message"]');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      showToast('Mohon lengkapi semua kolom yang wajib diisi.', false);
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Mengirim...';
    submitBtn.disabled = true;

    // Simulate sending network request
    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      showToast(`Terima kasih, ${nameInput.value}! Pesan Anda telah terkirim. Saya akan segera menghubungi Anda.`);
    }, 1200);
  });
}
