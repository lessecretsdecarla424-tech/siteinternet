(function () {
  // En-tête : transparent sur le héros d'accueil, blanc au défilement
  var bar = document.querySelector('.topbar');
  if (bar && !bar.classList.contains('light')) {
    var onScroll = function () { bar.classList.toggle('solid', window.scrollY > 60); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
  // Menu mobile
  var burger = document.querySelector('.burger'), menu = document.querySelector('.menu');
  if (burger && menu) burger.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    bar.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  // Onglets tarifs
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var btns = group.querySelectorAll('[role="tab"]');
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.setAttribute('aria-selected', x === b); });
        document.querySelectorAll('[data-panel="' + group.dataset.tabs + '"]').forEach(function (p) {
          p.hidden = p.dataset.key !== b.dataset.key;
        });
      });
    });
  });
  // Photos : dès qu'un fichier existe dans /photos, il remplace l'emplacement gris
  document.querySelectorAll('.ph[data-src]').forEach(function (el) {
    var img = new Image();
    img.onload = function () { el.style.backgroundImage = 'url("' + el.dataset.src + '")'; el.classList.add('loaded'); };
    img.src = el.dataset.src;
  });
  // Vidéos : même principe avec /videos
  document.querySelectorAll('.ph[data-video]').forEach(function (el) {
    var v = document.createElement('video');
    v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true; v.setAttribute('playsinline', '');
    v.preload = 'auto';
    v.addEventListener('loadeddata', function () { el.appendChild(v); el.classList.add('loaded'); v.play().catch(function () {}); });
    v.src = el.dataset.video;
  });
  // Formulaire contact (Netlify Forms) : message de confirmation
  var f = document.querySelector('form[data-netlify]');
  if (f && location.search.indexOf('envoye') > -1) {
    var ok = document.getElementById('form-ok'); if (ok) ok.hidden = false;
  }
})();
