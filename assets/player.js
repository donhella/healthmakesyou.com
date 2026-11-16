(function () {
  var box = document.getElementById('player');
  if (!box) return;
  var id = box.getAttribute('data-id');
  function load(start) {
    var src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0' + (start ? '&start=' + start : '');
    box.innerHTML = '<iframe src="' + src + '" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
  }
  box.querySelector('.play').addEventListener('click', function () { load(0); });
  document.querySelectorAll('.ts').forEach(function (b) {
    b.addEventListener('click', function () {
      load(parseInt(b.getAttribute('data-t'), 10));
      box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
})();
