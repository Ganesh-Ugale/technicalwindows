/* ==========================================================================
   TECHNICAL WINDOWS — VIDEO RENDERING / SEARCH / FILTER / MODAL
   Reads from the VIDEOS array in js/data.js. No inline event handlers —
   everything is wired with addEventListener + event delegation, and every
   piece of text is escaped before being inserted into the page.
   ========================================================================== */
(function () {
  "use strict";

  function ytThumb(id) {
    return "https://i.ytimg.com/vi/" + encodeURIComponent(id) + "/mqdefault.jpg";
  }
  function ytWatch(id) {
    return "https://www.youtube.com/watch?v=" + encodeURIComponent(id);
  }

  function cardHTML(v, isNew) {
    var title = window.escapeHTML(v.title);
    var catLabel = window.escapeHTML(CATEGORY_LABELS[v.category] || v.category);
    var hasLinks = v.setupLinks && v.setupLinks.length > 0;
    return (
      '<article class="video-card" data-id="' + window.escapeHTML(v.id) + '">' +
        '<div class="video-thumb">' +
          '<a href="' + ytWatch(v.id) + '" target="_blank" rel="noopener noreferrer" aria-label="Watch: ' + title + '">' +
            '<img src="' + ytThumb(v.id) + '" data-fallback="https://i.ytimg.com/vi/' + window.escapeHTML(v.id) + '/hqdefault.jpg" alt="' + title + '" loading="lazy"/>' +
            '<span class="video-play-hint">' + playIconSVG() + '</span>' +
          '</a>' +
          '<span class="video-badge' + (isNew ? ' new' : '') + '">' + (isNew ? 'Latest' : catLabel) + '</span>' +
        '</div>' +
        '<div class="video-body"><h3 class="video-title">' + title + '</h3></div>' +
        '<div class="video-foot">' +
          '<a class="mini-btn watch" href="' + ytWatch(v.id) + '" target="_blank" rel="noopener noreferrer">' + watchIconSVG() + ' Watch now</a>' +
          (hasLinks
            ? '<button type="button" class="mini-btn links" data-action="open-links" data-id="' + window.escapeHTML(v.id) + '">' + linkIconSVG() + ' Setup links</button>'
            : '<span class="mini-btn disabled">No setup links</span>') +
        '</div>' +
      '</article>'
    );
  }

  function playIconSVG() {
    return '<svg width="44" height="44" viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="12" r="12" fill="rgba(255,61,61,0.92)"/><path d="M10 8.3v7.4l6.2-3.7z" fill="#fff"/></svg>';
  }
  function watchIconSVG() {
    return '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  }
  function linkIconSVG() {
    return '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
  }

  function renderGrid(gridEl, list, opts) {
    opts = opts || {};
    if (!list.length) {
      gridEl.innerHTML = '<div class="no-results"><strong>No videos found</strong>Try a different keyword or category.</div>';
      return;
    }
    gridEl.innerHTML = list.map(function (v, i) {
      return cardHTML(v, opts.markFirstAsNew && i === 0);
    }).join("");
    // wire image fallbacks in JS (kept out of markup so no inline handlers are needed)
    gridEl.querySelectorAll("img[data-fallback]").forEach(function (img) {
      img.addEventListener("error", function onErr() {
        img.removeEventListener("error", onErr);
        img.src = img.dataset.fallback;
      });
    });
  }

  // ---- setup-links modal ----
  function openModal(video) {
    var modal = document.getElementById("linksModal");
    if (!modal) return;
    document.getElementById("modalTitle").textContent = video.title;
    var box = document.getElementById("modalLinks");
    box.innerHTML = video.setupLinks.map(function (lk) {
      return '<a class="modal-link" target="_blank" rel="noopener noreferrer" href="' + window.escapeHTML(lk.url) + '">' +
        '<div><span class="l-label">' + window.escapeHTML(lk.label) + '</span>' +
        '<span class="l-url">' + window.escapeHTML(lk.url) + '</span></div></a>';
    }).join("");
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    var modal = document.getElementById("linksModal");
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function (e) {
    var openBtn = e.target.closest('[data-action="open-links"]');
    if (openBtn) {
      var v = VIDEOS.find(function (x) { return x.id === openBtn.dataset.id; });
      if (v) openModal(v);
      return;
    }
    if (e.target.closest('[data-action="close-modal"]') || e.target.id === "linksModal") {
      closeModal();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  // ---- HOME PAGE: latest strip ----
  var latestGrid = document.getElementById("latestGrid");
  if (latestGrid) {
    var count = parseInt(latestGrid.dataset.count || "6", 10);
    renderGrid(latestGrid, VIDEOS.slice(0, count), { markFirstAsNew: true });

    // hero "featured" block = most recent upload
    var hero = VIDEOS[0];
    var heroThumb = document.getElementById("heroThumb");
    var heroTitle = document.getElementById("heroFrameTitle");
    var heroWatch = document.getElementById("heroWatchBtn");
    var heroLinks = document.getElementById("heroLinksBtn");
    if (hero && heroThumb) {
      heroThumb.querySelector("img").src = ytThumb(hero.id);
      heroThumb.querySelector("img").alt = hero.title;
      heroThumb.href = ytWatch(hero.id);
      heroTitle.textContent = hero.title;
      heroWatch.href = ytWatch(hero.id);
      if (hero.setupLinks && hero.setupLinks.length) {
        heroLinks.style.display = "";
        heroLinks.addEventListener("click", function () { openModal(hero); });
      } else {
        heroLinks.style.display = "none";
      }
    }
  }

  // ---- VIDEOS PAGE: full browser with search + filter ----
  var mainGrid = document.getElementById("videosGrid");
  if (mainGrid) {
    var searchInput = document.getElementById("searchInput");
    var chips = document.querySelectorAll(".filter-chip");
    var resultCount = document.getElementById("resultCount");
    var currentCategory = "all";

    function apply() {
      var q = (searchInput.value || "").trim().toLowerCase();
      var list = VIDEOS.filter(function (v) {
        var matchesCat = currentCategory === "all" || v.category === currentCategory;
        var matchesQ = !q || v.title.toLowerCase().indexOf(q) !== -1;
        return matchesCat && matchesQ;
      });
      renderGrid(mainGrid, list, { markFirstAsNew: currentCategory === "all" && !q });
      resultCount.textContent = list.length + (list.length === 1 ? " video" : " videos") + " found";
    }

    searchInput.addEventListener("input", apply);
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        currentCategory = chip.dataset.category;
        apply();
      });
    });

    // Arriving from a topic tile (?category=) or a search (?q=) elsewhere on the site
    var params = new URLSearchParams(window.location.search);
    var wantedCategory = params.get("category");
    var wantedQuery = params.get("q");
    if (wantedCategory && CATEGORY_LABELS[wantedCategory]) {
      currentCategory = wantedCategory;
      chips.forEach(function (c) { c.classList.toggle("active", c.dataset.category === wantedCategory); });
    }
    if (wantedQuery) {
      searchInput.value = wantedQuery;
    }

    apply();
    if (wantedCategory || wantedQuery) {
      document.getElementById("videosGrid").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Featured banner via ?v=VIDEO_ID (for links shared in YouTube descriptions)
    var vid = params.get("v");
    if (vid) {
      var found = VIDEOS.find(function (x) { return x.id === vid; });
      if (found && found.setupLinks && found.setupLinks.length) {
        openModal(found);
      }
    }
  }
})();
