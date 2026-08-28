import type { Lang } from '../data/i18n/navigation';

/**
 * Convert a path to its localized version.
 * e.g. /about → /es/about
 */
export function getLocalizedPath(path: string, lang: Lang): string {
  // Remove leading slash
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return lang === 'en' ? `/${clean}` : `/es/${clean}`;
}

/**
 * Get the opposite language path for a given path.
 * e.g. /es/about → /about
 */
export function getAlternatePath(path: string, currentLang: Lang): string {
  return currentLang === 'en'
    ? getLocalizedPath(path, 'es')
    : getLocalizedPath(path, 'en');
}

/**
 * Get hreflang alternates for a page.
 */
export function getHreflangs(path: string): Array<{ lang: Lang; href: string }> {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return [
    { lang: 'en', href: `/${clean}` },
    { lang: 'es', href: `/es/${clean}` },
  ];
}

/**
 * Parse current language from URL pathname.
 */
export function getLangFromPath(pathname: string): Lang {
  if (pathname.startsWith('/es')) return 'es';
  return 'en';
}