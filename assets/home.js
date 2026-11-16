(function () {
  var PER_PAGE = 9;
  var q = document.getElementById('q'), none = document.getElementById('none'), pager = document.getElementById('pager');
  var section = document.getElementById('videos');
  var cards = [].slice.call(document.querySelectorAll('#grid .card'));
  var chips = [].slice.call(document.querySelectorAll('.chip'));
  var topic = 'all', page = 1;

  function matches() {
    var term = (q.value || '').trim().toLowerCase();
    return cards.filter(function (c) {
      return (topic === 'all' || c.getAttribute('data-topics').split(' ').indexOf(topic) > -1) &&
             (!term || c.getAttribute('data-title').indexOf(term) > -1);
    });
  }

  function button(label, target, opts) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    if (opts && opts.on) { b.className = 'on'; b.setAttribute('aria-current', 'page'); }
    if (opts && opts.disabled) b.disabled = true;
    if (opts && opts.aria) b.setAttribute('aria-label', opts.aria);
    b.addEventListener('click', function () {
      page = target; render();
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return b;
  }

  function render() {
    var list = matches(), pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    if (page > pages) page = pages;
    var start = (page - 1) * PER_PAGE, show = list.slice(start, start + PER_PAGE);
    cards.forEach(function (c) { c.hidden = show.indexOf(c) === -1; });
    none.hidden = list.length > 0;
    pager.innerHTML = '';
    if (pages > 1) {
      pager.appendChild(button('‹ Previous', page - 1, { disabled: page === 1, aria: 'Previous page' }));
      for (var i = 1; i <= pages; i++) pager.appendChild(button(String(i), i, { on: i === page, aria: 'Page ' + i }));
      pager.appendChild(button('Next ›', page + 1, { disabled: page === pages, aria: 'Next page' }));
    }
  }

  q.addEventListener('input', function () { page = 1; render(); });
  chips.forEach(function (ch) {
    ch.addEventListener('click', function () {
      chips.forEach(function (x) { x.classList.remove('on'); });
      ch.classList.add('on'); topic = ch.getAttribute('data-topic'); page = 1; render();
    });
  });
  render();
})();
