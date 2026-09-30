
(function () {
  "use strict";

  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var FINE_POINTER = window.matchMedia && window.matchMedia("(pointer:fine)").matches;
  var HOME = document.body.classList.contains("home-page");

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn, { once: true });
    else fn();
  }

  function installProgress() {
    if (document.querySelector(".pm-reading-progress")) return;
    var wrap = document.createElement("div");
    wrap.className = "pm-reading-progress";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = "<span></span>";
    document.body.appendChild(wrap);
    var bar = wrap.firstElementChild;
    var ticking = false;

    function update() {
      ticking = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = "scaleX(" + Math.max(0, Math.min(1, p)) + ")";
      var header = document.querySelector(".site-header");
      if (header) header.classList.toggle("pm-scrolled", window.scrollY > 22);
    }

    function request() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request, { passive: true });
    update();
  }

  function installReveal() {
    var selectors = [
      ".section",
      ".home-route-picker",
      ".verification-explainer",
      ".record-toolkit",
      ".trust-citation",
      ".related-records"
    ];
    var nodes = Array.prototype.slice.call(document.querySelectorAll(selectors.join(",")));
    nodes.forEach(function (node) {
      if (node.classList.contains("hero")) return;
      node.classList.add("pm-motion-section");
    });

    if (REDUCED || !("IntersectionObserver" in window)) {
      nodes.forEach(function (node) { node.classList.add("pm-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("pm-visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });

    nodes.forEach(function (node) { io.observe(node); });
  }

  function installTilts() {
    if (!FINE_POINTER || REDUCED) return;
    var selector = [
      ".archive-card",
      ".traffic-card",
      ".archive-status-card",
      ".credibility-card",
      ".entry-card",
      ".verification-stage",
      ".home-route-picker__grid > a",
      ".publication-card",
      ".media-card",
      ".related-record-card",
      ".record-tool-card"
    ].join(",");

    var cards = Array.prototype.slice.call(document.querySelectorAll(selector));
    cards.forEach(function (card) {
      card.classList.add("pm-tilt");

      card.addEventListener("pointermove", function (event) {
        var r = card.getBoundingClientRect();
        var x = (event.clientX - r.left) / r.width - 0.5;
        var y = (event.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--pm-ry", (x * 5).toFixed(2) + "deg");
        card.style.setProperty("--pm-rx", (-y * 4).toFixed(2) + "deg");
      }, { passive: true });

      card.addEventListener("pointerleave", function () {
        card.style.setProperty("--pm-ry", "0deg");
        card.style.setProperty("--pm-rx", "0deg");
      }, { passive: true });
    });
  }

  function makeSeeded(seed) {
    var s = seed >>> 0;
    return function () {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function installEvidenceField() {
    if (!HOME) return;
    var hero = document.querySelector(".home-page .hero");
    if (!hero || hero.querySelector(".pm-evidence-field")) return;

    var field = document.createElement("div");
    field.className = "pm-evidence-field";
    field.setAttribute("aria-hidden", "true");
    var canvas = document.createElement("canvas");
    field.appendChild(canvas);
    hero.appendChild(field);

    var orbit = document.createElement("div");
    orbit.className = "pm-hero-orbit";
    orbit.setAttribute("aria-hidden", "true");
    ["Public records","Evidence","Memory","Analysis","Article 12","Accountability"].forEach(function (label) {
      var chip = document.createElement("span");
      chip.textContent = label;
      orbit.appendChild(chip);
    });
    hero.appendChild(orbit);

    var ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    var rand = makeSeeded(66062026);
    var mobile = window.matchMedia("(max-width: 700px)").matches;
    var count = mobile ? 34 : 72;
    var nodes = [];
    var links = [];
    var pointerX = 0;
    var pointerY = 0;
    var width = 0;
    var height = 0;
    var dpr = 1;
    var running = true;
    var last = 0;

    for (var i = 0; i < count; i++) {
      nodes.push({
        x: (rand() - 0.5) * 980,
        y: (rand() - 0.5) * 680,
        z: rand() * 900 - 250,
        size: 1.15 + rand() * 2.15,
        phase: rand() * Math.PI * 2,
        kind: rand() > 0.83 ? 1 : 0
      });
    }

    for (var a = 0; a < nodes.length; a++) {
      var picks = 0;
      for (var b = a + 1; b < nodes.length && picks < 2; b++) {
        var dx = nodes[a].x - nodes[b].x;
        var dy = nodes[a].y - nodes[b].y;
        var dz = nodes[a].z - nodes[b].z;
        var distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
        if (distance < 285 && rand() > 0.42) {
          links.push([a,b]);
          picks++;
        }
      }
    }

    function resize() {
      var r = hero.getBoundingClientRect();
      width = Math.max(1, Math.round(r.width));
      height = Math.max(1, Math.round(r.height));
      dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr,0,0,dpr,0,0);
    }

    function project(n, time) {
      var sx = n.x;
      var sy = n.y + Math.sin(time * 0.00035 + n.phase) * 11;
      var sz = n.z + Math.cos(time * 0.00023 + n.phase) * 18;

      var rx = pointerY * 0.08;
      var ry = pointerX * 0.10;

      var cosy = Math.cos(ry), siny = Math.sin(ry);
      var x1 = sx * cosy + sz * siny;
      var z1 = -sx * siny + sz * cosy;

      var cosx = Math.cos(rx), sinx = Math.sin(rx);
      var y1 = sy * cosx - z1 * sinx;
      var z2 = sy * sinx + z1 * cosx;

      var scrollShift = Math.min(180, window.scrollY * 0.12);
      var camera = 900 + z2 + scrollShift;
      var scale = 700 / Math.max(260, camera);

      return {
        x: width * 0.71 + x1 * scale,
        y: height * 0.49 + y1 * scale,
        s: Math.max(.2, Math.min(2.4, scale)),
        depth: z2
      };
    }

    function draw(time) {
      if (!running) return;
      if (REDUCED && time - last < 1000) {
        requestAnimationFrame(draw);
        return;
      }
      if (mobile && time - last < 34) {
        requestAnimationFrame(draw);
        return;
      }
      last = time;

      ctx.clearRect(0,0,width,height);
      var projected = nodes.map(function (n) { return project(n, time); });

      ctx.lineWidth = 1;
      links.forEach(function (pair) {
        var p1 = projected[pair[0]];
        var p2 = projected[pair[1]];
        var alpha = Math.max(.025, Math.min(.15, .11 - ((p1.depth + p2.depth) / 2) / 9000));
        ctx.strokeStyle = "rgba(10,35,66," + alpha.toFixed(3) + ")";
        ctx.beginPath();
        ctx.moveTo(p1.x,p1.y);
        ctx.lineTo(p2.x,p2.y);
        ctx.stroke();
      });

      nodes.forEach(function (n, index) {
        var p = projected[index];
        if (p.x < -20 || p.x > width + 20 || p.y < -20 || p.y > height + 20) return;

        var radius = n.size * p.s;
        var alpha = Math.max(.09, Math.min(.68, .48 * p.s));

        if (n.kind) {
          ctx.strokeStyle = "rgba(127,47,37," + alpha.toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.strokeRect(p.x - radius*2.4, p.y - radius*1.55, radius*4.8, radius*3.1);
          ctx.fillStyle = "rgba(178,138,74," + (alpha*.18).toFixed(3) + ")";
          ctx.fillRect(p.x - radius*2.4, p.y - radius*1.55, radius*4.8, radius*3.1);
        } else {
          ctx.beginPath();
          ctx.fillStyle = "rgba(10,35,66," + alpha.toFixed(3) + ")";
          ctx.arc(p.x,p.y,Math.max(.8,radius),0,Math.PI*2);
          ctx.fill();
        }
      });

      var glow = ctx.createRadialGradient(width*.72,height*.48,10,width*.72,height*.48,Math.min(width,height)*.34);
      glow.addColorStop(0,"rgba(178,138,74,.055)");
      glow.addColorStop(1,"rgba(178,138,74,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0,0,width,height);

      requestAnimationFrame(draw);
    }

    hero.addEventListener("pointermove", function (event) {
      if (!FINE_POINTER) return;
      var r = hero.getBoundingClientRect();
      pointerX = ((event.clientX - r.left) / r.width - .5);
      pointerY = ((event.clientY - r.top) / r.height - .5);
    }, { passive: true });

    hero.addEventListener("pointerleave", function () {
      pointerX = 0;
      pointerY = 0;
    }, { passive: true });

    document.addEventListener("visibilitychange", function () {
      running = !document.hidden;
      if (running) requestAnimationFrame(draw);
    });

    window.addEventListener("resize", resize, { passive: true });
    resize();
    requestAnimationFrame(draw);
  }

  function installCommandPalette() {
    if (document.querySelector(".pm-command")) return;

    var core = [
      ["/intelligence/","Intelligence Archive","Case files, public records and source-linked evidence"],
      ["/disha/","DISHA 6.6","Evidence intelligence architecture and methodology"],
      ["/article-12/","Article 12","Constitutional accountability framework"],
      ["/digital-constitutional-personhood/","Digital Constitutional Personhood","Digital identity, data and constitutional personhood"],
      ["/research-datasets/","Research Source Register","Datasets, source files and evidence inventory"],
      ["/news/","News & Analysis","Current reporting and disclosures"],
      ["/start-here/","Start Here","Routes for journalists, researchers and public authorities"],
      ["/about/","About","Researcher profile and archive identity"]
    ];

    var collected = [];
    Array.prototype.slice.call(document.querySelectorAll("a[href]")).forEach(function (a) {
      var href = a.getAttribute("href");
      var label = (a.textContent || "").replace(/\s+/g," ").trim();
      if (!href || !label || label.length < 3) return;
      if (href.charAt(0) === "#" || href.indexOf("javascript:") === 0 || href.indexOf("mailto:") === 0) return;
      try {
        var u = new URL(href, location.href);
        if (u.origin !== location.origin) return;
        collected.push([u.pathname, label, "Current page route"]);
      } catch (_) {}
    });

    var map = new Map();
    core.concat(collected).forEach(function (item) {
      var key = item[0] + "|" + item[1].toLowerCase();
      if (!map.has(key)) map.set(key, item);
    });
    var items = Array.from(map.values()).slice(0, 80);

    var modal = document.createElement("div");
    modal.className = "pm-command";
    modal.setAttribute("aria-hidden","true");
    modal.setAttribute("role","dialog");
    modal.setAttribute("aria-modal","true");
    modal.setAttribute("aria-label","Search the archive");
    modal.innerHTML =
      '<div class="pm-command__panel">' +
        '<div class="pm-command__head"><span aria-hidden="true">⌕</span><input type="search" autocomplete="off" placeholder="Search cases, frameworks, records…"><kbd>ESC</kbd></div>' +
        '<div class="pm-command__results"></div>' +
      '</div>';
    document.body.appendChild(modal);

    var trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "pm-search-trigger";
    trigger.setAttribute("aria-label","Search the archive");
    trigger.setAttribute("title","Search · ⌘/Ctrl + K");
    trigger.textContent = "⌕";
    document.body.appendChild(trigger);

    var input = modal.querySelector("input");
    var results = modal.querySelector(".pm-command__results");
    var lastFocus = null;

    function render(query) {
      var q = (query || "").trim().toLowerCase();
      var ranked = items.filter(function (item) {
        if (!q) return true;
        return (item[1] + " " + item[2] + " " + item[0]).toLowerCase().indexOf(q) !== -1;
      }).slice(0, 12);

      results.innerHTML = ranked.map(function (item, i) {
        return '<a href="' + item[0] + '"' + (i === 0 ? ' aria-selected="true"' : '') + '>' +
          '<span><strong>' + escapeText(item[1]) + '</strong><small>' + escapeText(item[2]) + '</small></span>' +
          '<em>' + escapeText(item[0]) + '</em></a>';
      }).join("") || '<div style="padding:24px;color:#746e65">No matching route found.</div>';
    }

    function escapeText(value) {
      return String(value).replace(/[&<>"']/g, function (c) {
        return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
      });
    }

    function open() {
      lastFocus = document.activeElement;
      modal.setAttribute("aria-hidden","false");
      document.documentElement.style.overflow = "hidden";
      render(input.value);
      setTimeout(function () { input.focus(); }, 0);
    }

    function close() {
      modal.setAttribute("aria-hidden","true");
      document.documentElement.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    trigger.addEventListener("click", open);
    modal.addEventListener("pointerdown", function (event) {
      if (event.target === modal) close();
    });
    input.addEventListener("input", function () { render(input.value); });
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        var first = results.querySelector("a");
        if (first) location.href = first.href;
      }
      if (event.key === "Escape") close();
    });

    document.addEventListener("keydown", function (event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        modal.getAttribute("aria-hidden") === "false" ? close() : open();
      } else if (event.key === "/" && modal.getAttribute("aria-hidden") !== "false" &&
                 !/input|textarea|select/i.test(document.activeElement && document.activeElement.tagName || "")) {
        event.preventDefault();
        open();
      } else if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
        close();
      }
    });

    render("");
  }

  function installStatementParallax() {
    if (!HOME || REDUCED || !FINE_POINTER) return;
    var side = document.querySelector(".home-statement-sidebar");
    var section = document.querySelector(".home-statement-section");
    if (!side || !section) return;

    var ticking = false;
    function update() {
      ticking = false;
      var r = section.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      var center = (window.innerHeight / 2 - (r.top + r.height / 2)) / Math.max(1, r.height);
      side.style.transform = "translateY(" + Math.max(-18, Math.min(18, center * 34)) + "px)";
    }
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
  }

  function installCountUp() {
    if (REDUCED || !("IntersectionObserver" in window)) return;
    var targets = Array.prototype.slice.call(document.querySelectorAll(".stat-number, .verification-score strong"));
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var text = (el.textContent || "").trim();
        var match = text.match(/^([\d,]+)(\+|%|.*)$/);
        if (!match) { io.unobserve(el); return; }
        var target = parseInt(match[1].replace(/,/g,""),10);
        if (!isFinite(target) || target > 20000) { io.unobserve(el); return; }
        var suffix = text.slice(match[1].length);
        var start = performance.now();
        var duration = target > 1000 ? 1100 : 850;

        function tick(now) {
          var p = Math.min(1, (now - start) / duration);
          var eased = 1 - Math.pow(1-p,3);
          var val = Math.round(target * eased);
          el.textContent = val.toLocaleString("en-IN") + suffix;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = text;
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: .55 });
    targets.forEach(function (el) { io.observe(el); });
  }

  ready(function () {
    installProgress();
    installReveal();
    installTilts();
    installEvidenceField();
    installCommandPalette();
    installStatementParallax();
    installCountUp();
    document.documentElement.classList.add("pm-ready");
  });
})();
