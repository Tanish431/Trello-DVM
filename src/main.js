document.addEventListener("DOMContentLoaded", () => {
  const navLinks = {
    features: document.getElementById("features-btn"),
    solutions: document.getElementById("solutions-btn"),
    plans: document.getElementById("plans-btn"),
    resources: document.getElementById("resources-btn"),
  };

  const overlays = {
    features: document.getElementById("features-overlay"),
    solutions: document.getElementById("solutions-overlay"),
    plans: document.getElementById("plans-overlay"),
    resources: document.getElementById("resources-overlay"),
  };

  Object.entries(navLinks).forEach(([key, link]) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const overlay = overlays[key];
      const isActive = overlay.classList.contains("active");

      Object.values(overlays).forEach((o) => o.classList.remove("active"));
      if (!isActive) {
        overlay.classList.add("active");
      }
    });
  });
  document.querySelectorAll(".overlay-content").forEach((content) => {
    content.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });

  document.addEventListener("click", () => {
    Object.values(overlays).forEach((overlay) => {
      overlay.classList.remove("active");
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

  const reviewWrapper = document.querySelector(".review-wrapper");
  const reviewSlides = document.querySelectorAll(".review-slide");
  const reviewDots = document.querySelectorAll(".review-controls .dot");
  const nextBtn = document.querySelector(".review-controls .next-btn");
  const prevBtn = document.querySelector(".review-controls .prev-btn");
  let reviewIndex = 0;

  if (!reviewWrapper || reviewSlides.length === 0) {
  } else {
    const reviewCount = reviewSlides.length;

    function setWrapperPosition(index) {
      reviewIndex = ((index % reviewCount) + reviewCount) % reviewCount;
      reviewWrapper.style.transform = `translateX(-${reviewIndex * 100}%)`;

      reviewSlides.forEach((s, i) =>
        s.classList.toggle("active", i === reviewIndex)
      );
      reviewDots.forEach((d, i) =>
        d.classList.toggle("active", i === reviewIndex)
      );
    }

    setWrapperPosition(0);

    nextBtn &&
      nextBtn.addEventListener("click", () =>
        setWrapperPosition(reviewIndex + 1)
      );
    prevBtn &&
      prevBtn.addEventListener("click", () =>
        setWrapperPosition(reviewIndex - 1)
      );
    if (reviewDots && reviewDots.length) {
      reviewDots.forEach((dot, i) =>
        dot.addEventListener("click", () => setWrapperPosition(i))
      );
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const backBtn = document.getElementById("backBtn");
  const menu = document.getElementById("menu");
  const featuresBtn = document.getElementById("featuresBtn");
  const solutionsBtn = document.getElementById("solutionsBtn");
  const plansBtn = document.getElementById("plansBtn");
  const resourcesBtn = document.getElementById("resourcesBtn")
  const featuresMenu = document.getElementById("featuresMenu");
  const solutionsMenu = document.getElementById("solutionsMenu");
  const resourcesMenu = document.getElementById("resourcesMenu");
  const plansMenu = document.getElementById("plansMenu");
  const logo = document.getElementById("logo");

  if (!menuBtn || !menu) return; // guard for desktop

  // --- MENU BUTTON LOGIC ---
  menuBtn.addEventListener("click", () => {
    document.body.style.overflow = "hidden";
    menu.style.visibility = "visible";
    if (menuBtn.textContent === "✕") {
      closeAllMenus();
      return;
    }

    // open main menu
    menu.classList.add("active");
    menuBtn.textContent = "✕";
  });

  const buttonMenuPairs = [
  [featuresBtn, featuresMenu],
  [solutionsBtn, solutionsMenu],
  [plansBtn, plansMenu],
  [resourcesBtn, resourcesMenu],
];

buttonMenuPairs.forEach(([btn, menuEl]) => {
  btn.addEventListener("click", () => {
    menu.classList.remove("active");
    menuEl.classList.add("active");
    logo.style.opacity = "0";
    backBtn.style.display = "block";
    menuEl.style.visibility = "visible";
  });
});

  backBtn.addEventListener("click", () => {
    buttonMenuPairs.forEach(([btn, menuEl])=>{
      menuEl.classList.remove("active");
      menuEl.style.visibility = "hidden";
    })
    menu.classList.add("active");
    logo.style.opacity = "1";
    backBtn.style.display = "none";
    document.body.style.overflow = "";

  });

  function closeAllMenus() {
    menu.classList.remove("active");
    buttonMenuPairs.forEach(([btn, menuEl])=>{
      menuEl.classList.remove("active");
      menuEl.style.visibility = "hidden";
    })
    document.body.style.overflow = "";
    backBtn.style.display = "none";
    logo.style.opacity = "1";
    menuBtn.textContent = "☰";
  }
});
