document.addEventListener('DOMContentLoaded', () => {
  const navLinks = {
    features: document.getElementById('features-btn'),
    solutions: document.getElementById('solutions-btn'),
    plans: document.getElementById('plans-btn'),
    resources: document.getElementById('resources-btn'),
  };

  const overlays = {
    features: document.getElementById('features-overlay'),
    solutions: document.getElementById('solutions-overlay'),
    plans: document.getElementById('plans-overlay'),
    resources: document.getElementById('resources-overlay'),
  };

  // Handle nav link clicks
  Object.entries(navLinks).forEach(([key, link]) => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); 
      e.stopPropagation();
      
      const overlay = overlays[key];
      const isActive = overlay.classList.contains('active');
      
      // Close all overlays first and then toggle the clicked one
      Object.values(overlays).forEach(o => o.classList.remove('active'));
      if (!isActive) {
        overlay.classList.add('active');
      }
    });
  });
  // Prevent overlay content clicks from closing the overlay
  document.querySelectorAll('.overlay-content').forEach(content => {
    content.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  // Close overlay when clicking anywhere
  document.addEventListener('click', () => {
    Object.values(overlays).forEach(overlay => {
      overlay.classList.remove('active');
    });
  });

  const slides = document.querySelectorAll(".carousel-slide");
  const buttons = document.querySelectorAll(".carousel-btn");
  const dots = document.querySelectorAll(".dot");
  const slider = document.querySelector(".carousel-slider");
  let currentSlide = 0;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  const updateSlide = (index) => {
    currentSlide = index;
    slider.style.transform = `translateX(-${index * 100}%)`;
    buttons.forEach(b => b.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    buttons[index].classList.add("active");
    dots[index].classList.add("active");
  };

  buttons.forEach((btn, i) => btn.addEventListener("click", () => updateSlide(i)));
  dots.forEach((dot, i) => dot.addEventListener("click", () => updateSlide(i)));
});
