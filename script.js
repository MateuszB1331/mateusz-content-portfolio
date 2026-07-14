(function () {
  "use strict";

  /* ---- Scroll reveal ---- */
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var revealables = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---- Mobile menu ---- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("mobile-menu");

  if (toggle && menu) {
    var setMenu = function (open) {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
      menu.hidden = !open;
    };
    toggle.addEventListener("click", function () {
      setMenu(menu.hidden);
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
  }

  /* ---- Showreel sound toggle ---- */
  var video = document.getElementById("showreel");
  var soundBtn = document.getElementById("video-sound");

  if (video && soundBtn) {
    // start muted autoplay when in view
    if (!reduceMotion && "IntersectionObserver" in window) {
      var vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var p = video.play();
            if (p && p.catch) p.catch(function () {});
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.35 });
      vio.observe(video);
    }

    soundBtn.addEventListener("click", function () {
      video.muted = !video.muted;
      var on = !video.muted;
      soundBtn.setAttribute("aria-pressed", String(on));
      soundBtn.textContent = on ? "🔊 Wycisz" : "🔇 Włącz dźwięk";
      if (on) {
        var pr = video.play();
        if (pr && pr.catch) pr.catch(function () {});
      }
    });
  }
})();
