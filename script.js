// Fade-in + lekkie przesunięcie sekcji przy wejściu w viewport.
// Uszanuj prefers-reduced-motion — wtedy nic nie animujemy.
(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var revealables = document.querySelectorAll(".reveal");

  // Brak wsparcia lub reduced-motion: pokaż wszystko od razu.
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealables.forEach(function (el) {
    observer.observe(el);
  });
})();
