/* Light/dark switch: follows the device until the user picks one; the choice is kept on this device. */
(function () {
  var KEY = 'kf.theme', root = document.documentElement;
  var dark = function () { try { return matchMedia('(prefers-color-scheme: dark)').matches; } catch (e) { return false; } };
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  var current = function () { return root.getAttribute('data-theme') || (dark() ? 'dark' : 'light'); };
  function label(btn) {
    var d = current() === 'dark';
    btn.setAttribute('aria-label', d ? 'Világos mód bekapcsolása' : 'Sötét mód bekapcsolása');
    btn.title = d ? 'Világos mód' : 'Sötét mód';
    root.classList.toggle('is-dark', d);
  }
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme-btn');
    if (!btn) return;
    label(btn);
    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      label(btn);
    });
    try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { label(btn); }); } catch (e) {}
  });
})();
