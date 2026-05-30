const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const NAV_PREV_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3l-9 9 9 9"/></svg>';
const NAV_NEXT_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3l9 9-9 9"/></svg>';

function getCarouselRoot(element) {
  return (
    element.closest(".carrousel-wrapper") ||
    element.closest('[role="region"]') ||
    element
  );
}

function fixCarouselFocus(container) {
  container
    .querySelectorAll(".f-carousel__slide, .f-thumbs__slide")
    .forEach((slide) => {
      const isHidden = slide.getAttribute("aria-hidden") === "true";

      if ("inert" in slide) {
        slide.inert = isHidden;
      }

      slide.querySelectorAll(FOCUSABLE_SELECTOR).forEach((el) => {
        if (isHidden) {
          if (!("savedTabindex" in el.dataset)) {
            el.dataset.savedTabindex = el.getAttribute("tabindex") ?? "";
          }
          el.setAttribute("tabindex", "-1");
        } else if ("savedTabindex" in el.dataset) {
          const saved = el.dataset.savedTabindex;
          if (saved) {
            el.setAttribute("tabindex", saved);
          } else {
            el.removeAttribute("tabindex");
          }
          delete el.dataset.savedTabindex;
        }
      });
    });
}

function watchCarouselA11y(container) {
  fixCarouselFocus(container);

  const observer = new MutationObserver(() => fixCarouselFocus(container));
  observer.observe(container, {
    subtree: true,
    attributes: true,
    attributeFilter: ["aria-hidden"],
  });

  return observer;
}

function labelCarouselNav(container) {
  const prev = container.querySelector(".f-button.is-prev");
  const next = container.querySelector(".f-button.is-next");

  if (prev) prev.setAttribute("aria-label", "Image précédente");
  if (next) next.setAttribute("aria-label", "Image suivante");
}

function bindCarouselKeyboard(container, carousel) {
  container.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      carousel.slidePrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      carousel.slideNext();
    }
  });
}

function initCovivioCarousel() {
  const container = document.getElementById("covivio-carousel");
  const pauseBtn = document.getElementById("covivio-carousel-pause");
  if (!container) return;

  const root = getCarouselRoot(container);
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  let autoplayInterval = null;
  let isPaused = prefersReducedMotion;

  const carousel = new Carousel(
    container,
    {
      Dots: false,
      Navigation: {
        prevTpl: NAV_PREV_SVG,
        nextTpl: NAV_NEXT_SVG,
      },
      Thumbs: {
        type: "classic",
      },
      on: {
        ready: () => {
          watchCarouselA11y(root);
          labelCarouselNav(container);
          if (!isPaused) startAutoplay();
        },
        change: () => fixCarouselFocus(root),
      },
    },
    { Thumbs }
  );

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(() => carousel.slideNext(), 3000);
    container.setAttribute("aria-live", "polite");
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
    container.setAttribute("aria-live", "off");
  }

  function updatePauseButton() {
    if (!pauseBtn) return;

    pauseBtn.setAttribute("aria-pressed", String(isPaused));
    pauseBtn.textContent = isPaused ? "Lecture" : "Pause";
    pauseBtn.setAttribute(
      "aria-label",
      isPaused
        ? "Reprendre le défilement automatique"
        : "Mettre en pause le défilement automatique"
    );
  }

  updatePauseButton();

  if (pauseBtn) {
    pauseBtn.addEventListener("click", () => {
      isPaused = !isPaused;
      updatePauseButton();
      if (isPaused) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });
  }

  container.addEventListener("focusin", stopAutoplay);
  container.addEventListener("focusout", (event) => {
    if (!container.contains(event.relatedTarget) && !isPaused) {
      startAutoplay();
    }
  });

  bindCarouselKeyboard(root, carousel);

  return carousel;
}

function initGridCarousel() {
  const container = document.getElementById("grid-carousel");
  if (!container) return;

  const root = getCarouselRoot(container);

  const carousel = new Carousel(container, {
    Dots: false,
    slidesPerPage: 5,
    Navigation: {
      prevTpl: NAV_PREV_SVG,
      nextTpl: NAV_NEXT_SVG,
    },
    on: {
      ready: () => {
        watchCarouselA11y(root);
        labelCarouselNav(container);
      },
      change: () => fixCarouselFocus(root),
    },
  });

  bindCarouselKeyboard(root, carousel);

  return carousel;
}

document.addEventListener("DOMContentLoaded", () => {
  initCovivioCarousel();
  initGridCarousel();

  Fancybox.bind('[data-fancybox="gallery"]', {
    closeClickOutside: true,
    keyboard: true,
    closeBtn: true,
  });

  Fancybox.bind('[data-fancybox="video-gallery"]', {});
});
