const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function isExternalUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://");
}

export function withBasePath(pathname: string) {
  if (!pathname) return pathname;
  if (!BASE_PATH) return pathname;
  if (isExternalUrl(pathname)) return pathname;
  if (pathname.startsWith(`${BASE_PATH}/`) || pathname === BASE_PATH) return pathname;
  if (pathname.startsWith("/")) return `${BASE_PATH}${pathname}`;
  return `${BASE_PATH}/${pathname}`;
}

export { BASE_PATH };
