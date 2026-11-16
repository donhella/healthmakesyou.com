(function () {
  var q = document.getElementById('q'), none = document.getElementById('none');
  var cards = [].slice.call(document.querySelectorAll('#grid .card'));
  var chips = [].slice.call(document.querySelectorAll('.chip'));
  var topic = 'all';
  function apply() {
    var term = (q.value || '').trim().toLowerCase(), shown = 0;
    cards.forEach(function (c) {
      var ok = (topic === 'all' || c.getAttribute('data-topics').split(' ').indexOf(topic) > -1) &&
               (!term || c.getAttribute('data-title').indexOf(term) > -1);
      c.hidden = !ok; if (ok) shown++;
    });
    none.hidden = shown > 0;
  }
  q.addEventListener('input', apply);
  chips.forEach(function (ch) {
    ch.addEventListener('click', function () {
      chips.forEach(function (x) { x.classList.remove('on'); });
      ch.classList.add('on'); topic = ch.getAttribute('data-topic'); apply();
    });
  });
})();
