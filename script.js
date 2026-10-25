document.querySelectorAll(".side-form").forEach((form) => {
  const select = form.querySelector("select");
  const result = form.querySelector(".selection-result");
  const button = form.querySelector('button[type="submit"]');

  select.addEventListener("change", () => {
    result.hidden = true;
    result.replaceChildren();
    button.textContent = "Pokaż sekcję";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!result.hidden) {
      result.hidden = true;
      button.textContent = "Pokaż sekcję";
      return;
    }

    const target = document.getElementById(select.value);
    if (!target) {
      result.textContent = "Nie znaleziono wybranej sekcji.";
      result.hidden = false;
      button.textContent = "Schowaj sekcję";
      return;
    }

    const link = document.createElement("a");
    link.href = `#${target.id}`;
    link.textContent = select.options[select.selectedIndex].textContent.trim();
    result.replaceChildren(link);
    result.hidden = false;
    button.textContent = "Schowaj sekcję";
  });
});

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
const revealElements = document.querySelectorAll(
  ".intro, .chapter-heading, .panel, .footer"
);

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
} else {
  document.documentElement.classList.add("motion-ready");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -6% 0px",
    }
  );

  revealElements.forEach((element, index) => {
    element.classList.add("reveal-on-scroll");
    element.style.setProperty("--reveal-delay", `${(index % 4) * 75}ms`);
    revealObserver.observe(element);
  });
}
