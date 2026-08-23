/* Cekli — progressive enhancement only.
   Every page must remain fully readable and navigable with JS disabled. */
(function () {
  "use strict";

  /* --- Mobile navigation -------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.hidden = false;
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.setAttribute("data-open", String(!open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.setAttribute("data-open", "false");
      }
    });
  }

  /* --- Screenshot lightbox ------------------------------------------------ */
  var shots = document.querySelectorAll(".shot");
  if (!shots.length) return;

  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Screenshot viewer");
  box.innerHTML =
    '<button class="lightbox__close" type="button" aria-label="Close screenshot">&times;</button>' +
    '<img alt="">' +
    '<p class="lightbox__cap"></p>';
  document.body.appendChild(box);

  var boxImg = box.querySelector("img");
  var boxCap = box.querySelector(".lightbox__cap");
  var closeBtn = box.querySelector(".lightbox__close");
  var lastFocus = null;

  function open(btn) {
    var img = btn.querySelector("img");
    var cap = btn.querySelector("figcaption");
    lastFocus = btn;
    boxImg.src = img.currentSrc || img.src;
    boxImg.alt = img.alt;
    boxCap.textContent = cap ? cap.textContent : "";
    box.setAttribute("data-open", "true");
    closeBtn.focus();
  }

  function close() {
    box.setAttribute("data-open", "false");
    boxImg.removeAttribute("src");
    if (lastFocus) lastFocus.focus();
  }

  // Promote each figure to a button only now that the viewer exists — with JS
  // off they stay plain figures rather than controls that do nothing.
  shots.forEach(function (btn) {
    btn.setAttribute("role", "button");
    btn.setAttribute("tabindex", "0");
    var cap = btn.querySelector("figcaption");
    btn.setAttribute("aria-label", "View larger: " + (cap ? cap.textContent.trim() : "screenshot"));
    btn.addEventListener("click", function () { open(btn); });
    btn.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        open(btn);
      }
    });
  });

  closeBtn.addEventListener("click", close);
  box.addEventListener("click", function (e) {
    if (e.target === box) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && box.getAttribute("data-open") === "true") close();
    // Trap focus on the single interactive element while the dialog is open.
    if (e.key === "Tab" && box.getAttribute("data-open") === "true") {
      e.preventDefault();
      closeBtn.focus();
    }
  });
})();
