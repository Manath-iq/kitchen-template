/** Пути с учётом base (GitHub Pages разворачивает сайт в подпапку). */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return `${base}/${path.replace(/^\//, '')}`;
}

export function isHome(pathname: string): boolean {
  return pathname.replace(/\/$/, '') === base;
}

/**
 * Якорь на секцию лендинга. На главной — обычный `#hash` (плавный скролл),
 * на юридических страницах — переход на главную к нужной секции.
 */
export function sectionHref(pathname: string, hash: string): string {
  return isHome(pathname) ? hash : `${base}/${hash}`;
}
