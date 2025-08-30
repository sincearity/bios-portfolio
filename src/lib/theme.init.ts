// src/lib/theme-init.ts
export const THEME_INIT_SNIPPET = `
(function () {
  const storageKey = 'theme';
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem(storageKey); } catch {}

  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const useDark = saved ? saved === 'dark' : systemPrefersDark;

  root.classList.toggle('dark', useDark);
})();
`
