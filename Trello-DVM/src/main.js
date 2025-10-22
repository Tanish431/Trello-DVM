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
});
