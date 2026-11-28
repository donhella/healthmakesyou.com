// Free-guide sign-up (Kit). Submits in the background; if that fails, the form posts normally
// and Kit redirects to /free/check-your-inbox/.
document.querySelectorAll('.oi-form').forEach(function (f) {
  f.addEventListener('submit', function (ev) {
    if (f.dataset.fallback) return;
    ev.preventDefault();
    var b = f.querySelector('button');
    b.disabled = true; b.textContent = 'Sending…';
    fetch(f.action, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (res) {
        if (!res.ok || (res.j.status && res.j.status !== 'success')) throw new Error('kit');
        f.hidden = true;
        try { localStorage.setItem('hmy_sub', '1'); } catch (e) {}
        var box = f.closest('.oi-txt');
        box.querySelector('.oi-ok').hidden = false;
        box.querySelector('.oi-fine').hidden = true;
      })
      .catch(function () { f.dataset.fallback = '1'; f.submit(); });
  });
});

// In-article sign-up (2026-11-28): when the reader scrolls it into the middle of the screen, it lifts and the
// article around it fades back; scrolled past, everything returns to normal. Off once the visitor has signed up.
(function () {
  var box = document.querySelector('.midf');
  if (!box) return;
  var subbed = function () { try { return !!localStorage.getItem('hmy_sub'); } catch (e) { return false; } };
  var dim = document.createElement('div');
  dim.className = 'midf-dim';
  document.body.appendChild(dim);
  var on = false, input = box.querySelector('input');
  function set(v) {
    if (v === on) return; on = v;
    box.classList.toggle('lift', v); dim.classList.toggle('on', v);
  }
  function check() {
    if (subbed() && !box.querySelector('.oi-ok:not([hidden])')) return set(false);
    if (document.activeElement === input) return set(true);   // keep the focus while typing (phone keyboards move the page)
    var r = box.getBoundingClientRect(), vh = window.innerHeight, mid = (r.top + r.bottom) / 2;
    set(mid > vh * 0.22 && mid < vh * 0.72);
  }
  window.addEventListener('scroll', check, { passive: true });
  window.addEventListener('resize', check);
  input.addEventListener('blur', function () { setTimeout(check, 50); });
  if (/[?&]mid=1/.test(location.search)) setTimeout(function () { box.scrollIntoView({ block: 'center' }); check(); }, 300);
  check();
})();
