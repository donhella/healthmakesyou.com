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
        var box = f.closest('.oi-txt');
        box.querySelector('.oi-ok').hidden = false;
        var dl = box.querySelector('.oi-dl'); if (dl) dl.focus();
        box.querySelector('.oi-fine').hidden = true;
      })
      .catch(function () { f.dataset.fallback = '1'; f.submit(); });
  });
});
