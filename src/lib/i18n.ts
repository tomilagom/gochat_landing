export type Lang = 'en' | 'es';

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
