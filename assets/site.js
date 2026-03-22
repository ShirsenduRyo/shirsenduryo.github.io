document.addEventListener("DOMContentLoaded", () => {
  const reveals = Array.from(document.querySelectorAll("[data-reveal]"));

  reveals.forEach((element, index) => {
    element.style.setProperty("--reveal-delay", `${index * 80}ms`);
  });

  const markVisible = (element) => {
    element.classList.add("in-view");
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            markVisible(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach(markVisible);
  }

  requestAnimationFrame(() => {
    document.body.classList.add("is-ready");
    reveals.slice(0, 4).forEach(markVisible);
  });

  const closeModal = (modal) => {
    if (!modal) {
      return;
    }

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-active");
  };

  const openModal = (modal) => {
    if (!modal) {
      return;
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-active");
  };

  document.querySelectorAll("[data-open-modal]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const modal = document.getElementById(trigger.dataset.openModal);
      openModal(modal);
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      closeModal(trigger.closest("[data-modal]"));
    });
  });

  document.querySelectorAll("[data-modal]").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    const openModalElement = document.querySelector("[data-modal].is-open");
    if (openModalElement) {
      closeModal(openModalElement);
    }
  });
});
