!(function () {
  for (var e = document.querySelectorAll('a'), t = 0; t < e.length; t++) e[t].host !== location.host && e[t].setAttribute('target', '_blank');
})(),
  (function () {
    function e(e) {
      for (i = 0; i < o.length; i++)
        if (e.matches) {
          var t = document.createElement('div');
          t.classList.add('video-wrap'), o[i].parentNode.insertBefore(t, o[i]), t.appendChild(o[i]);
        } else t.classList.remove('video-wrap');
    }
    var t = matchMedia('(max-width: 1080px)'),
      o = document.querySelectorAll('.post .entry-content iframe[src*="youtube.com/embed"]');
    e(t), t.addListener(e);
  })(),
  (function () {
    for (var e = document.querySelectorAll('.index-post.text'), t = 0; t < e.length; t++)
      if (e[t]) {
        var o = e[t].querySelector('.index-post-content-text-body img');
        if (o) {
          var r = e[t].querySelector('.post-content-anchor'),
            n = o.getAttribute('src');
          r.insertAdjacentHTML('afterbegin', "<div class='post-photo-thumb' style='background-image: url(" + n + "');'></div>"),
            r.classList.remove('post-content-anchor'),
            (e[t].querySelector('.post-content-wrapper').style.display = 'none');
        }
      }
  })();
