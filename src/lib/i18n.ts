export type Lang = 'en' | 'es';
export const SITE_URL = 'https://gochat.ar';
export const SUPPORTED_LANGS: readonly Lang[] = ['en', 'es'];

export function localizedHref(path: string, lang: Lang): string {
  if (lang !== 'es') return path;
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:')) return path;
  if (path.startsWith('#')) return path;
  if (path.startsWith('/es/') || path === '/es') return path;
  if (!path.startsWith('/')) return path;
  return path === '/' ? '/es/' : `/es${path}`;
}

export function switchLangHref(pathname: string, target: Lang): string {
  const stripped = pathname.replace(/^\/es(\/|$)/, '/');
  if (target === 'en') return stripped;
  return stripped === '/' ? '/es/' : `/es${stripped}`;
}

/** Strips the /es prefix and trailing slash to get the canonical EN path. */
export function canonicalEnPath(pathname: string): string {
  const stripped = pathname.replace(/^\/es(\/|$)/, '/');
  if (stripped === '/') return '/';
  return stripped.replace(/\/$/, '');
}

/** Returns the absolute URL for a given path + lang. */
export function absoluteUrl(path: string, lang: Lang): string {
  const enPath = canonicalEnPath(path);
  if (lang === 'en') {
    return enPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${enPath}`;
  }
  return enPath === '/' ? `${SITE_URL}/es/` : `${SITE_URL}/es${enPath}`;
}
