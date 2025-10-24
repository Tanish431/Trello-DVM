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

  const introSlider = document.querySelector(".carousel-slider");
  const introButtons = document.querySelectorAll(".carousel-btn");
  const introDots = document.querySelectorAll(".carousel-dots .dot");
  const introSlides = document.querySelectorAll(".carousel-slide");
  let introIndex = 0;

  const updateIntroSlide = (index) => {
    introIndex = index;
    introSlider.style.transform = `translateX(-${index * 100}%)`;

    introButtons.forEach((b) => b.classList.remove("active"));
    introDots.forEach((d) => d.classList.remove("active"));

    introButtons[index].classList.add("active");
    introDots[index].classList.add("active");
  };

  introButtons.forEach((btn, i) =>
    btn.addEventListener("click", () => updateIntroSlide(i))
  );
  introDots.forEach((dot, i) =>
    dot.addEventListener("click", () => updateIntroSlide(i))
  );

  // Review carousel — translate the wrapper instead of individual slides
  const reviewWrapper = document.querySelector(".review-wrapper");
  const reviewSlides = document.querySelectorAll(".review-slide");
  const reviewDots = document.querySelectorAll(".review-controls .dot");
  const nextBtn = document.querySelector(".review-controls .next-btn");
  const prevBtn = document.querySelector(".review-controls .prev-btn");
  let reviewIndex = 0;

  // Guards: ensure required elements exist
  if (!reviewWrapper || reviewSlides.length === 0) {
    // No-op or initialize with defaults
  } else {
    const reviewCount = reviewSlides.length;

    function setWrapperPosition(index) {
      // clamp/wrap index
      reviewIndex = ((index % reviewCount) + reviewCount) % reviewCount;
      reviewWrapper.style.transform = `translateX(-${reviewIndex * 100}%)`;
      // update active classes on slides and dots
      reviewSlides.forEach((s, i) => s.classList.toggle("active", i === reviewIndex));
      reviewDots.forEach((d, i) => d.classList.toggle("active", i === reviewIndex));
    }

    // Initialize to first slide
    setWrapperPosition(0);

    // Event wiring with guards
    nextBtn && nextBtn.addEventListener("click", () => setWrapperPosition(reviewIndex + 1));
    prevBtn && prevBtn.addEventListener("click", () => setWrapperPosition(reviewIndex - 1));
    if (reviewDots && reviewDots.length) {
      reviewDots.forEach((dot, i) => dot.addEventListener("click", () => setWrapperPosition(i)));
    }
  }

});
