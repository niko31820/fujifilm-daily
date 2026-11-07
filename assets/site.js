'use strict';
(() => {
  const theme = document.getElementById('theme');
  const key = 'fujifilm-daily-theme';
  const modes = ['system', 'light', 'dark'];
  const apply = (mode) => {
    if (mode === 'system') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.dataset.theme = mode;
  };
  let saved = 'system';
  try { saved = localStorage.getItem(key) || 'system'; } catch (_) { /* Private storage: system default. */ }
  if (!modes.includes(saved)) saved = 'system';
  apply(saved);
  if (theme) {
    theme.value = saved;
    theme.closest('label').hidden = false;
    theme.addEventListener('change', () => {
      apply(theme.value);
      try { localStorage.setItem(key, theme.value); } catch (_) { /* Still usable without persistence. */ }
    });
  }
  window.addEventListener('storage', (event) => {
    if (event.key !== key) return;
    const mode = modes.includes(event.newValue) ? event.newValue : 'system';
    apply(mode);
    if (theme) theme.value = mode;
  });
  document.querySelectorAll('[data-print]').forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', () => window.print());
  });
})();
