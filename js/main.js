/* ==========================================================================
   TECHNICAL WINDOWS — SHARED SITE BEHAVIOUR
   Used on every page. Keeps things framework-free and fast.
   ========================================================================== */
(function () {
  "use strict";

  // ---- mobile menu ----
  var toggle = document.getElementById("menuToggle");
  var panel = document.getElementById("mobilePanel");
  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var isOpen = panel.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        panel.classList.remove("open");
        toggle.classList.remove("open");
      });
    });
  }

  // ---- highlight active nav link based on current page ----
  var here = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a, .mobile-panel a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === here || (here === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  // ---- scroll-to-top button ----
  var st = document.getElementById("scrollTop");
  if (st) {
    window.addEventListener("scroll", function () {
      st.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });
    st.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---- escape HTML: defence-in-depth when interpolating any text into markup ----
  window.escapeHTML = function (str) {
    var div = document.createElement("div");
    div.textContent = String(str == null ? "" : str);
    return div.innerHTML;
  };
})();
